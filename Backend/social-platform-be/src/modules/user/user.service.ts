import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Not, Repository } from "typeorm";
import CreateUserDTO from "./dto/create-user-dto";
import { InjectRepository } from "@nestjs/typeorm";
import bcrypt from "node_modules/bcryptjs";
import { User } from "src/database/entities/user.entity";
import UpdateUserDTO from "./dto/update-user-dto";
import { IsPhoneNumber } from "class-validator";
import cloudinary from "src/config/cloudinary.config";
import { UploadApiResponse } from "cloudinary";
import { CloudinaryService } from "./cloudinary/cloudinary.service";
import { FriendshipService } from "../friendship/friendship.service";
import { Friendship, FriendshipStatus } from "src/database/entities/friendship.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
        @InjectRepository(Friendship)
        private readonly friendRepo: Repository<Friendship>,
        private readonly cloudService: CloudinaryService
    ) { }

    async getAllUsers(userId: string) {
        const users = await this.repo.find({
            where: { isDeleted: false, id: Not(userId) }
        })
        return users.map((item) => ({
            id: item.id,
            fullName: item.firstName + " " + item.lastName,
            avatar: item.avatarURL
        }))
    }

    async getUserById(userId: string, id: string) {
        const user = await this.repo.findOne({
            where: { id, isDeleted: false }
        })
        if (!user) throw new NotFoundException("User is not exists!");

        const isFriend = await this.friendRepo.findOne({
            where: [
                { requester: { id: userId }, addressee: { id }, status: FriendshipStatus.ACCEPTED },
                { requester: { id }, addressee: { id: userId }, status: FriendshipStatus.ACCEPTED }
            ],
            relations: ['requester', 'addressee']
        });

        const isRequest = await this.friendRepo.findOne({
            where: { requester: { id: userId }, addressee: { id }, status: FriendshipStatus.PENDING }
        });

        const isAddress = await this.friendRepo.findOne({
            where: { requester: { id }, addressee: { id: userId }, status: FriendshipStatus.PENDING }
        });

        return {
            id: user.id,
            avatarURL: user.avatarURL,
            fullName: user.firstName + ' ' + user.lastName,
            dob: user.dob ? new Date(user.dob) : undefined,
            gender: user.gender,
            email: user.email,
            phoneNumber: user.phoneNumber,
            isFriend: !!isFriend,
            isRequest: !!isRequest,
            isAddress: !!isAddress
        };
    }

    async checkEmail(email: string) {
        if (!email) return;
        const existed = await this.repo.findOne({
            where: { email }
        })
        if (existed) throw new ConflictException("Email already exists");
    }

    async checkUsername(username: string) {
        if (!username) return;
        const existed = await this.repo.findOne({
            where: { username }
        })
        if (existed) throw new ConflictException("Username already exists");
    }

    async checkPhone(phoneNumber: string) {
        if (!phoneNumber) return;
        const existed = await this.repo.findOne({
            where: { phoneNumber }
        })
        if (existed) throw new ConflictException("Phone already exists");
    }

    async createUser(user: CreateUserDTO) {

        console.log("USER DATA:", user);
        if (user.email) {
            await this.checkEmail(user.email);
        }
        await this.checkUsername(user.username);

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);

        const newUser = this.repo.create({
            ...user,
            password: hashedPassword,
            dob: user.dob ? new Date(user.dob) : undefined,
        })

        console.log(newUser)

        await this.repo.save(newUser);

        return {
            fullName: newUser.firstName + newUser.lastName,
            username: newUser.username
        }
    }

    async updateUser(id: string, dto: UpdateUserDTO) {
        console.log("Bawt dau");
        const user = await this.repo.findOne({
            where: { id, isDeleted: false }
        })
        if (!user) throw new NotFoundException("User not found!");

        if (user.phoneNumber && dto.phoneNumber !== user.phoneNumber) {
            this.checkPhone(dto.phoneNumber);
        }

        const updateUser = {
            ...user,
            ...dto,
            dob: dto.dob ? new Date(dto.dob) : user.dob
        }



        this.repo.save(updateUser);

        console.log(updateUser);

        return {
            fullName: dto.firstName + " " + dto.lastName,
            dob: dto.dob,
            gender: dto.gender,
            phoneNumber: dto.phoneNumber
        }
    }

    async findActiveUserById(id: string) {
        return this.repo.findOne({
            where: {
                id,
                isDeleted: false
            },
        })
    }

    async findActiveUserForAuth(username: string) {
        return this.repo.findOne({
            where: {
                username,
                isDeleted: false
            },
            select: ["id", "username", "password"]
        })
    }

    async uploadToCloud(file: Express.Multer.File): Promise<UploadApiResponse> {
        return this.cloudService.uploadImage(file);
    }

    async updateAvatar(id: string, file: Express.Multer.File) {
        const user = await this.repo.findOne({
            where: { id, isDeleted: false }
        })
        if (!user) throw new NotFoundException("User not found!");

        const result = await this.uploadToCloud(file);

        console.log(result); // 👈 debug

        user.avatarURL = result.secure_url;

        await this.repo.save(user);

        return {
            avatar: user.avatarURL
        };
    }

    async getSuggestionUser(userId: string, search?: string, page: number = 1, limit: number = 10) {
        const friendships = await this.friendRepo.find({
            where: [
                { requester: { id: userId } },
                { addressee: { id: userId } }
            ],
            relations: ['requester', 'addressee']
        });
        const excludeIds = new Set<string>();
        excludeIds.add(userId);

        friendships.forEach(f => {
            // ✅ CHỈ loại bạn bè (accepted)
            if (f.status === FriendshipStatus.ACCEPTED) {
                if (f.requester.id === userId) {
                    excludeIds.add(f.addressee.id);
                } else {
                    excludeIds.add(f.requester.id);
                }
            }
        });

        const qb = this.repo.createQueryBuilder("user");

        qb.where("user.isDeleted = false")
            .andWhere("user.id NOT IN (:...ids)", {
                ids: Array.from(excludeIds)
            });

        if (search) {
            qb.andWhere(
                `LOWER(CONCAT(user.first_name, ' ', user.last_name)) LIKE LOWER(:search)`,
                { search: `%${search}%` }
            );
        }

        qb.skip((page - 1) * limit)
            .take(limit)
            .orderBy("user.created_at", "DESC");

        const [users, total] = await qb.getManyAndCount();

        return {
            data: users.map(u => {
                const relation = friendships.find(f =>
                    f.requester.id === u.id || f.addressee.id === u.id
                );

                const isRequest =
                    relation?.status === FriendshipStatus.PENDING &&
                    relation?.requester?.id === userId;

                const isAddress =
                    relation?.status === FriendshipStatus.PENDING &&
                    relation?.addressee?.id === userId;

                return {
                    id: u.id,
                    fullName: u.firstName + " " + u.lastName,
                    avatar: u.avatarURL,

                    isRequest,
                    isAddress
                };
            }),
            total,
            page,
            limit
        };
    }
}