import { IsNumber, Min, IsArray, IsString, IsEnum } from 'class-validator';

export class GetActorsDto {
    @IsArray()
    @IsNumber({}, { each: true })
    count: number[];

    @IsArray()
    @IsNumber({}, { each: true })
    rating: number[];

    @IsString()
    @IsEnum(['rating', 'count'])
    sortBy: 'rating' | 'count';

    @IsString()
    @IsEnum(['asc', 'desc'])
    direction: 'asc' | 'desc';

    @Min(1)
    @IsNumber()
    page: number;
}
