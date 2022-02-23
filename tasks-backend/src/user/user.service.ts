/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth.credentials.dto';
import { JwtPayload } from './jwt.payload';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userrepo:UserRepository,
        private jwtService:JwtService
    ){}
    async signup(authdto:AuthCredentialsDTO)
    {
        return await this.userrepo.signup(authdto)
    }
    async signin(authdto:AuthCredentialsDTO)
    {
        const result= await this.userrepo.signin(authdto)
        if(!result)
        {
            throw new NotFoundException("USER NOT FOUND HAHAHAHA!!!")
        }

        const payload:JwtPayload={username:authdto.username,id:result.id}
        const token=await this.jwtService.sign(payload)

        //return {username:authdto.username}
        return token
    }
}
