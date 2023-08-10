import { getAllPokemonData } from '@/requests';
import { PokemonList } from '@/types';
import { useEffect, useState } from 'react';

export type UsePokemonDataProps = {
  selectedTypes: string[];
};

export const usePokemonData = ({ selectedTypes }: UsePokemonDataProps) => {
  const [pokemonData, setPokemonData] = useState<PokemonList | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (url?: string) => {
      try {
        const data = await getAllPokemonData(url);
        setPokemonData(data);
        setNextPageUrl(data.next);
        setIsLoading(false);
      } catch (error) {
        setError('Failed to fetch data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const loadMore = async () => {
    if (nextPageUrl) {
      try {
        setIsLoading(true);
        const newData = await getAllPokemonData(nextPageUrl);
        setPokemonData((prevData) => ({
          ...newData,
          results: prevData ? [...prevData.results, ...newData.results] : newData.results,
        }));
        setNextPageUrl(newData.next);
      } catch (error) {
        setError('Failed to fetch more data');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const filteredPokemon =
    selectedTypes.length > 0
      ? pokemonData?.results.filter((pokemon) =>
          pokemon.types.some((type) => selectedTypes.includes(type)),
        )
      : pokemonData?.results;

  return {
    pokemonData: {
      ...pokemonData,
      results: filteredPokemon || [],
    },
    isLoading,
    error,
    loadMore,
  };
};
