/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthCredentialsDTO } from './dto/auth.credentials.dto';
import { GetUser } from './get.user.decorator';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userservice:UserService){}

    @Post('/signup')
    @UsePipes(ValidationPipe)
    signup(@Body() authdto:AuthCredentialsDTO)
    {
        return this.userservice.signup(authdto)
    }

    @Post('/signin')
    @UsePipes(ValidationPipe)
    signin(@Body() authdto:AuthCredentialsDTO)
    {
        return this.userservice.signin(authdto)
    }

    @Get('/profile')
    @UseGuards(AuthGuard())
    getProfile(@GetUser() user:UserEntity)
    {
        return user
    }

}
