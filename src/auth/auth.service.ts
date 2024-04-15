import { Injectable, UnauthorizedException, forwardRef, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.services';
import { UserModel } from 'src/users/users.model';

interface JWTPayload {
    email: string;
    sub: string;
    createdAt: string;
}

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<{ user: UserModel; jwt: string }> {
        const user = await this.usersService.findByEmail(email);
        if (user && bcrypt.compareSync(password, user.password)) {
            return {
                user,
                jwt: await this.getJwt(user),
            };
        }
        throw new UnauthorizedException('Invalid email or password');
    }

    async login(user: UserModel) {
        return {
            access_token: this.getJwt(user),
        };
    }

    async verifyToken(token: string): Promise<JWTPayload | null> {
        try {
            return this.jwtService.verify<JWTPayload>(token);
        } catch (e) {
            return null;
        }
    }

    async getJwt(user: UserModel) {
        const payload: JWTPayload = {
            email: user.email,
            sub: user.id.toString(),
            createdAt: user.createdAt.toString(),
        };
        return this.jwtService.sign(payload);
    }

    // async refreshJwt(email: string, userId: string, createdAt: Date): Promise<string> {
    //     const payload: JWTPayload = {
    //         email: email,
    //         sub: userId,
    //         createdAt: createdAt.toDateString(),
    //     };
    //     return this.jwtService.sign(payload);
    // }
}
