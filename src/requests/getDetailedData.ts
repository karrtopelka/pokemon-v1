import { DetailedPokemon } from '@/types';

export const getDetailedData = async (url: string): Promise<DetailedPokemon> => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();

  const { id, name, stats, sprites, types } = data;
  const formattedStats = stats.map((statItem: any) => {
    return {
      name: statItem.stat.name,
      value: statItem.base_stat,
    };
  });

  const formattedTypes = types.map((typeItem: any) => typeItem.type.name);

  return {
    id,
    name,
    stats: formattedStats,
    types: formattedTypes,
    image: sprites.front_default,
  };
};
