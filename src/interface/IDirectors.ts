export interface IDirectorsList {
    id: number;
    name: string;
    photo: string;
    url: string;
    rating: number;
    count: number;
}

export interface IDirectors {
    [key: number]: IDirectorsList;
}
