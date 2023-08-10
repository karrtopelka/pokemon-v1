export const getAllTypes = async (): Promise<string[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_POKEMON_API}/type`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();

  const formattedData = data.results.map((type: any) => type.name);

  return formattedData;
};
