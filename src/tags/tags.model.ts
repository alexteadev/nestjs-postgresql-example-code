import { FilmTagModel } from 'src/films/models/films-tag.model';
import { SeriesTagModel } from 'src/series/models/series-tag.model';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('tag')
export class TagsModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    originalId: number;

    @Column()
    name: string;

    @OneToMany(() => FilmTagModel, (filmTagModel) => filmTagModel.tag)
    filmTags: FilmTagModel[];

    @OneToMany(() => SeriesTagModel, (seriesTagModel) => seriesTagModel.tag)
    seriesTags: SeriesTagModel[];
}
