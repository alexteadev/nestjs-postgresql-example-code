import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { SeriesModel } from './series.model';
import { EventEraModel } from 'src/eventera/evetera.model';

@Entity('series-era')
export class SeriesEraModel {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => SeriesModel, (series) => series.seriesEra)
    @JoinColumn({ name: 'seriesId' })
    series: SeriesModel;

    @ManyToOne(() => EventEraModel, (epoch) => epoch.seriesEpochs)
    @JoinColumn({ name: 'epochId' })
    era: EventEraModel;
}
