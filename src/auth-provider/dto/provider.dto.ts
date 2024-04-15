import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserModel } from 'src/users/users.model';

export class ProviderDto {
    @IsNotEmpty()
    readonly user: UserModel;

    @IsNotEmpty()
    readonly authProvider: string;

    @IsString()
    readonly clientId: string;

    @IsEmail()
    readonly email: string;
}
