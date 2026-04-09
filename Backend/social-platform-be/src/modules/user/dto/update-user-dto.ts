import { isDateString, IsDateString, IsEmail, IsEnum, IsOptional, IsString, Length, MinLength } from "class-validator";
import { Gender } from "src/database/entities/user.entity";

export default class UpdateUserDTO {
    @IsString({ message: "First name is string" })
    @Length(2, 50, { message: "First name must be in 2 to 50 characters" })
    firstName: string;

    @IsString({ message: "Last name is string" })
    @Length(2, 50, { message: "Last name must be in 2 to 50 characters" })
    lastName: string;

    @IsOptional()
    @IsDateString()
    dob: string;

    @IsOptional()
    @IsEnum(Gender)
    gender: Gender;

    @IsOptional()
    @IsString({ message: "Phonenumber is string" })
    @Length(10, 20, { message: "Phonenumber must be in 10 to 20 digits" })
    phoneNumber: string;
}