import { IsNumber, Min, IsString, IsEnum } from 'class-validator';

export class MyFilmsDto {
    @IsString()
    type: string;

    @Min(1)
    @IsNumber()
    page: number;

    @IsString()
    @IsEnum(['rating', 'year'])
    sortBy: 'rating' | 'year';

    @IsString()
    @IsEnum(['asc', 'desc'])
    direction: 'asc' | 'desc';
}
