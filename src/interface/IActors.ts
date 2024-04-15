export interface IActorsList {
    id: number;
    name: string;
    photo: string;
    url: string;
    rating: number;
    count: number;
}

export interface IActors {
    [key: number]: IActorsList;
}
