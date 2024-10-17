import { IsEmail, IsNotEmpty, IsEnum, IsString } from "class-validator";


export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(["ADMIN", "USER"], {message: "The valid role are ADMIN AND USER"})
    role: 'ADMIN' | 'USER'
}