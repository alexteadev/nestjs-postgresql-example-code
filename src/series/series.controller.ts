import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { SeriesInitService } from './series-init.services';
import { SeriesService } from './series.services';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { GetSeriesDto } from './dto/get-series.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { FavoriteSeriesDto } from './dto/favorite-series.dto';
import { CurrentUser, User } from 'src/users/user.decorator';
import { MySeriesDto } from './dto/my-series.dto';

@Controller('series')
export class SeriesController {
    constructor(private readonly seriesService: SeriesService, private readonly seriesInitService: SeriesInitService) {}

    @Post('getseries')
    async getSeries(@Body() dto: GetSeriesDto) {
        return this.seriesService.getSeries(dto);
    }

    // ...

    @UseGuards(JwtAuthGuard)
    @Post('getmyseries')
    async getMySeries(@Body() dto: MySeriesDto, @CurrentUser() user: User) {
        return this.seriesService.getMySeries(dto, user);
    }
}
