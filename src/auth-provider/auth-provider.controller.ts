import { Body, Controller, Post } from '@nestjs/common';
import { AuthProviderService } from './auth-provider.services';
import { GoogleDto } from './dto/google.dto';
import { FacebookDto } from './dto/facebook.dto';
import { AuthProviderModel } from './auth-provider.model';

@Controller('auth-provider')
export class AuthProviderController {
    constructor(private readonly usersService: AuthProviderService) {}

    @Post('/google')
    google(@Body() dto: GoogleDto): Promise<AuthProviderModel> {
    }

    @Post('/facebook')
    facebook(@Body() dto: FacebookDto): Promise<AuthProviderModel> {
    }
}
