import { isDateString, IsDateString, IsEmail, IsEnum, IsOptional, IsString, Length, MinLength } from "class-validator";
import { Gender } from "src/database";

export default class CreateUserDTO {
    @IsString({ message: "First name is string" })
    @Length(2, 50, { message: "First name must be in 2 to 50 characters" })
    firstName: string;

    @IsString({ message: "Last name is string" })
    @Length(2, 50, { message: "Last name must be in 2 to 50 characters" })
    lastName: string;

    @IsDateString()
    dob: string;

    @IsOptional()
    @IsEnum(Gender)
    gender: Gender;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString({ message: "Phonenumber is string" })
    @Length(10, 20, { message: "Phonenumber must be in 10 to 20 digits" })
    phoneNumber: string;

    @IsString({ message: "Username must be string" })
    @Length(6, 50, { message: "Username must be in 6 to 50 characters" })
    username: string;

    @IsString({ message: "Password must be string" })
    @MinLength(6, { message: "Password must be at least 6 characters" })
    password: string;
}