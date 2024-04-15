import { IFilms } from './IFilms';

export interface IDirector {
    id: number;
    biography: string;
    birthday: string;
    deathday: string | null;
    name: string;
    place_of_birth: string;
    photo: string;
    films: IFilms;
}
