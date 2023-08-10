export type PokemonList = {
  count: number;
  next: string;
  previous: string;
  results: DetailedPokemon[];
};

export type DetailedPokemon = {
  id: number;
  name: string;
  stats: {
    value: number;
    name: string;
  }[];
  image: string;
  types: string[];
};
