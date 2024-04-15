import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { FilmsService } from './films.services';
import { Response } from 'express';
import { FilmsInitService } from './films-init.services';
import { GetFilmsDto } from './dto/get-films.dto';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { FavoriteFilmsDto } from './dto/favorite-films.dto';
import { CurrentUser, User } from 'src/users/user.decorator';
import { MyFilmsDto } from './dto/my-films.dto';

@Controller('films')
export class FilmsController {
    constructor(
        private readonly filmsService: FilmsService,
        private readonly filmsInitService: FilmsInitService,
    ) {}


    @Post('getfilms')
    async getFilms(@Body() dto: GetFilmsDto) {
        // ...
    }

    @Get('byid/:id')
    async getFilmById(@Param('id', IdValidationPipe) id: number) {
        // ...
    }

    @UseGuards(JwtAuthGuard)
    @Post('addfavorite')
    async addFavorite(@Body() dto: FavoriteFilmsDto, @CurrentUser() user: User) {
        // ...
    }

    @UseGuards(JwtAuthGuard)
    @Post('removefavorite')
    async removeFavorite(@Body() dto: FavoriteFilmsDto, @CurrentUser() user: User) {
        // ...
    }

    @UseGuards(JwtAuthGuard)
    @Post('checkfavorite')
    async checkFavorite(@Body() dto: FavoriteFilmsDto, @CurrentUser() user: User) {
        // ...
    }

    @UseGuards(JwtAuthGuard)
    @Post('getmyfilms')
    async getMyFilms(@Body() dto: MyFilmsDto, @CurrentUser() user: User) {
        // ...
    }
}
