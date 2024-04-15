import { IsNumber, Min } from 'class-validator';

export class FavoriteFilmsDto {
    @Min(1)
    @IsNumber()
    id: number;
}
