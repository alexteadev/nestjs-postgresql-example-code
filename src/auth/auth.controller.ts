import { Body, Controller, Post, Res, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.services';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    }

    @Post('register')
    async register(@Body() dto: RegistrationDto) {
        return this.usersService.create(dto);
    }

    @Post('logout')
    async logout(@Res() res: Response) {
        res.cookie('', '', {
            httpOnly: true,
            expires: new Date(0),
        });

        res.sendStatus(200);
    }
}
