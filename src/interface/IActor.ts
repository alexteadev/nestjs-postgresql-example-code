import { IFilms } from './IFilms';

export interface IActor {
    id: number;
    biography: string;
    birthday: string;
    deathday: string | null;
    name: string;
    place_of_birth: string;
    photo: string;
    films: IFilms;
}
