import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SeriesModel } from './series.model';
import { TagsModel } from 'src/tags/tags.model';

@Entity('series-tag')
export class SeriesTagModel {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => SeriesModel, (series) => series.seriesTags)
    series: SeriesModel;

    @ManyToOne(() => TagsModel, (tag) => tag.seriesTags)
    tag: TagsModel;
}
