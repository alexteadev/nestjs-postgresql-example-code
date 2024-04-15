import { Global, Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { getJWTConfig } from 'src/config/jwt.config';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';

@Global()
@Module({
    imports: [
        forwardRef(() => UsersModule),
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: getJWTConfig,
            inject: [ConfigService],
        }),
    ],
    providers: [AuthService, JwtAuthGuard],
    controllers: [AuthController],
    exports: [JwtAuthGuard, AuthService],
})
export class AuthModule {}
