export interface Pokemon {
    name: string;
    url: string;
}
export interface PokeData {
    count: number;
    next: string;
    previous: string;
    results: Pokemon[];
}
  