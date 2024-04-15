import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany } from 'typeorm';
import { FilmGenreModel } from './films-genre.model';
import { FilmSubgenreModel } from './films-subgenre.model';
import { FilmTagModel } from './films-tag.model';
import { AgeRating } from 'src/enums/AgeRatingEnum';
import { FilmEraModel } from './films-era.model';
import { FilmAwardModel } from './films-award.model';
import { FilmActorModel } from './films-actor.model';
import { FilmDirectorModel } from './films-director.model';
import { FilmCountryModel } from './films-country.model';
import { FilmFavoriteModel } from './films-favorite.model';

@Entity('film')
export class FilmsModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    language: string;

    @Column('text')
    overview: string;

    @Column('float')
    popularity: number;

    @Column({ nullable: true })
    poster: string;

    @Column()
    releaseDate: Date;

    @Column()
    year: number;

    //...

    @Column({
        type: 'enum',
        enum: AgeRating,
        nullable: true,
    })
    ageRating: AgeRating;

    @OneToMany(() => FilmGenreModel, (filmGenreModel) => filmGenreModel.film)
    filmGenres: FilmGenreModel[];

    @OneToMany(() => FilmSubgenreModel, (filmSubgenreModel) => filmSubgenreModel.film)
    filmSubgenres: FilmSubgenreModel[];

    @OneToMany(() => FilmTagModel, (filmTagModel) => filmTagModel.film)
    filmTags: FilmTagModel[];

    @OneToMany(() => FilmEraModel, (filmEraModel) => filmEraModel.film)
    filmEra: FilmEraModel[];

    @OneToMany(() => FilmAwardModel, (filmAwardModel) => filmAwardModel.film)
    filmAwards: FilmAwardModel[];

    @OneToMany(() => FilmActorModel, (filmActorModel) => filmActorModel.film)
    filmActors: FilmActorModel[];

    //...
}
