import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { FilmsModel } from './films.model';
import { EventEraModel } from 'src/eventera/evetera.model';

@Entity('film-era')
export class FilmEraModel {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => FilmsModel, (film) => film.filmEra)
    @JoinColumn({ name: 'filmId' })
    film: FilmsModel;

    @ManyToOne(() => EventEraModel, (epoch) => epoch.filmEpochs)
    @JoinColumn({ name: 'epochId' })
    era: EventEraModel;
}
