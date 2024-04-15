import { IsNumber, Min, IsArray, IsString, IsEnum } from 'class-validator';

export class GetFilmsDto {
    @IsArray()
    @IsNumber({}, { each: true })
    genre: number[];

    @IsArray()
    @IsNumber({}, { each: true })
    subgenre: number[];

    @IsArray()
    @IsNumber({}, { each: true })
    tags: number[];

    @IsString()
    type: string;

    @IsArray()
    @IsNumber({}, { each: true })
    rating: number[];

    @IsArray()
    @IsNumber({}, { each: true })
    year: number[];

    @IsArray()
    @IsNumber({}, { each: true })
    event_era: number[];

    @IsArray()
    @IsNumber({}, { each: true })
    country: number[];

    @IsArray()
    @IsNumber({}, { each: true })
    age_rating: number[];

    @IsArray()
    @IsNumber({}, { each: true })
    awards: number[];

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
