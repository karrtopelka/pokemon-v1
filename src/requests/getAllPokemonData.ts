import { PokemonList } from '@/types';
import { getDetailedData } from './getDetailedData';

export const getAllPokemonData = async (url?: string): Promise<PokemonList> => {
  const res = await fetch(url ?? `${process.env.NEXT_PUBLIC_POKEMON_API}/pokemon/?limit=12`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();

  const formattedData = await Promise.all(
    data.results.map(async (pokemon: any) => {
      const detailedData = await getDetailedData(pokemon.url);
      return detailedData;
    }),
  );

  return { ...data, results: formattedData };
};
