import { FilmDirectorModel } from 'src/films/models/films-director.model';
import { SeriesDirectorModel } from 'src/series/models/series-director.model';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('director')
export class DirectorsModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    imdbID: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    photo: string;

    @Column({ nullable: true })
    birthday: Date;

    @Column({ nullable: true })
    deathday: Date;

    @Column({ nullable: true })
    gender: number;

    @Column({ nullable: true })
    placeOfBirth: string;

    @Column('text')
    biography: string;

    @Column()
    filmCount: number;

    @Column('float')
    totalRatings: number;

    @OneToMany(() => FilmDirectorModel, (filmDirectorModel) => filmDirectorModel.director)
    filmDirectors: FilmDirectorModel[];

    @OneToMany(() => SeriesDirectorModel, (seriesDirectorModel) => seriesDirectorModel.director)
    seriesDirectors: SeriesDirectorModel[];
}
