import { usePokemonData, useTypesData } from '@/hooks';
import { DetailedPokemon } from '@/types';
import { useState } from 'react';
import { DetailedPokemonCard, MultiSelect, PokemonCard } from '.';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

export const Layout = (): JSX.Element => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const {
    pokemonData,
    isLoading: isPokemonDataLoading,
    error: isPokemonDataError,
    loadMore,
  } = usePokemonData({
    selectedTypes,
  });
  const { typesData } = useTypesData();

  const [selectedPokemon, setSelectedPokemon] = useState<null | DetailedPokemon>(null);

  const getPokemonDetails = (pokemon: DetailedPokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleCloseDetails = () => {
    setSelectedPokemon(null);
  };

  const handleTypeSelect = (type: string) => {
    setSelectedTypes((prevTypes) => {
      if (prevTypes.includes(type)) {
        return prevTypes.filter((t) => t !== type);
      } else {
        return [...prevTypes, type];
      }
    });
  };

  if (isPokemonDataError) {
    return (
      <div>
        <h1 className='text-2xl text-center'>Something went wrong</h1>
      </div>
    );
  }

  return (
    <div className='flex justify-center'>
      <section className='flex flex-col w-1/2 h-full'>
        <div className='flex justify-center mt-4 sticky top-0 items-center bg-white h-16'>
          <MultiSelect
            options={typesData}
            onSelect={handleTypeSelect}
            selectedValues={selectedTypes}
          />
        </div>
        <ul
          role='list'
          className='mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8'>
          {pokemonData?.results.map((pokemon) => (
            <PokemonCard
              key={pokemon.name}
              pokemon={pokemon}
              selectedPokemon={selectedPokemon}
              onSelect={() => getPokemonDetails(pokemon)}
            />
          ))}
        </ul>
        {pokemonData?.next && (
          <Button className='mt-6' onClick={loadMore} disabled={isPokemonDataLoading}>
            {isPokemonDataLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Load more
          </Button>
        )}
      </section>
      <section className='flex w-1/2 h-full mt-2 justify-center sticky top-32'>
        {selectedPokemon && (
          <DetailedPokemonCard selectedPokemon={selectedPokemon} onClose={handleCloseDetails} />
        )}
      </section>
    </div>
  );
};
