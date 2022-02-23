/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator"
export class taskDTO{
    @IsNotEmpty()
    title:string
    @IsNotEmpty()
    description:string
}