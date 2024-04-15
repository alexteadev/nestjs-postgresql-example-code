import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { FilmsModel } from './films.model';
import { UserModel } from 'src/users/users.model';

@Entity('film-favorite')
export class FilmFavoriteModel {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserModel, (user) => user.filmFavorite)
    user: UserModel;

    @ManyToOne(() => FilmsModel, (film) => film.filmFavorite)
    film: FilmsModel;
}
