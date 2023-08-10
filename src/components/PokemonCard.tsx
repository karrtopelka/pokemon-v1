import { DetailedPokemon } from '@/types';
import { Card } from './ui/card';
import { cn } from '@/utils';
import Image from 'next/image';
import { Badge } from './ui/badge';

type PokemonCardProps = {
  pokemon: DetailedPokemon;
  selectedPokemon: DetailedPokemon | null;
  onSelect: (pokemon: DetailedPokemon) => void;
};

export const PokemonCard = ({
  pokemon,
  selectedPokemon,
  onSelect,
}: PokemonCardProps): JSX.Element => {
  return (
    <Card
      key={pokemon.name}
      className={cn(
        'px-4 py-4 hover:cursor-pointer',
        selectedPokemon?.name === pokemon.name && 'bg-gray-100 shadow-lg',
      )}
      onClick={() => onSelect(pokemon)}>
      <Image
        className='mx-auto rounded-md'
        src={pokemon.image}
        width={512}
        height={512}
        style={{ objectFit: 'contain' }}
        alt=''
      />
      <h2 className='mt-3 text-2xl font-semibold leading-7 text-center tracking-tight'>
        {pokemon.name}
      </h2>
      <ul role='list' className='mt-6 flex justify-center gap-x-2'>
        {pokemon.types.map((type, index) => (
          <li key={index}>
            <Badge variant='outline'>{type}</Badge>
          </li>
        ))}
      </ul>
    </Card>
  );
};
