/* eslint-disable prettier/prettier */
import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import {Strategy,ExtractJwt} from 'passport-jwt'
import { JwtPayload } from "./jwt.payload";
import { UserRepository } from "./user.repository";
export class JwtStrategy extends PassportStrategy(Strategy)
{
    constructor(@InjectRepository(UserRepository)
     private userrepo:UserRepository)
     {
         super({
             jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
             secretOrKey:'secret'
         })
     }
     async validate(payload:JwtPayload)
     {
         const user=this.userrepo.findOne({id:payload.id})

         if(!user)
         {
             throw new UnauthorizedException()
         }
         return user
     }
}