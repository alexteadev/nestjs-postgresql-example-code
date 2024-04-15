import { FilmSubgenreModel } from 'src/films/models/films-subgenre.model';
import { GenresModel } from 'src/genres/genres.model';
import { SeriesSubgenreModel } from 'src/series/models/series-subgenre.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity('subgenre')
export class SubgenresModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    originalId: number;

    @Column()
    name: string;

    @ManyToOne(() => GenresModel, (genresModel) => genresModel.subgenres)
    genre: GenresModel;

    @OneToMany(() => FilmSubgenreModel, (filmSubgenreModel) => filmSubgenreModel.subgenre)
    filmSubgenres: FilmSubgenreModel[];

    @OneToMany(() => SeriesSubgenreModel, (seriesSubgenreModel) => seriesSubgenreModel.subgenre)
    seriesSubgenres: SeriesSubgenreModel[];
}
