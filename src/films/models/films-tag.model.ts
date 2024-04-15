import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FilmsModel } from './films.model';
import { TagsModel } from 'src/tags/tags.model';

@Entity('film-tag')
export class FilmTagModel {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => FilmsModel, (film) => film.filmTags)
    film: FilmsModel;

    @ManyToOne(() => TagsModel, (tag) => tag.filmTags)
    tag: TagsModel;
}
