export type GenresType = {
    [key: string]: {
        id: number;
        subgenres: { [key: string]: number };
    };
};
