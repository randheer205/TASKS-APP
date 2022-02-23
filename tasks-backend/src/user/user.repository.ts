/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDTO } from "./dto/auth.credentials.dto";
import { UserEntity } from "./user.entity";
import * as crypt from "crypto-js"

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity>
{
    async signup(authdto:AuthCredentialsDTO){
        const user=new UserEntity
        user.username=authdto.username
        user.password=crypt.MD5(authdto.password).toString()
        await user.save()
    }
    async signin(authdto:AuthCredentialsDTO){
        const {username,password}=authdto
        const user=await this.findOne({username})

        if(user && await user.validatePassword(password)){
            return user
        }
        return null
    }
}