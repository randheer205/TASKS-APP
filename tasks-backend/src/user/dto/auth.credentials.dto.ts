/* eslint-disable prettier/prettier */
import { IsNotEmpty, MaxLength, MinLength } from "class-validator"
export class AuthCredentialsDTO
{
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(10)
    username:string
    
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(16)
    password:string
}