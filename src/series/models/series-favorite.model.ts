import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserModel } from 'src/users/users.model';
import { SeriesModel } from './series.model';

@Entity('series-favorite')
export class SeriesFavoriteModel {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserModel, (user) => user.seriesFavorite)
    user: UserModel;

    @ManyToOne(() => SeriesModel, (series) => series.seriesFavorite)
    series: SeriesModel;
}
