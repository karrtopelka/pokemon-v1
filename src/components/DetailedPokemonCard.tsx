import { DetailedPokemon } from '@/types';
import { Card } from './ui/card';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Table, TableBody, TableCell, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

export type DetailedPokemonCardProps = {
  selectedPokemon: DetailedPokemon;
  onClose: () => void;
};

export const DetailedPokemonCard = ({
  selectedPokemon,
  onClose,
}: DetailedPokemonCardProps): JSX.Element => {
  return (
    <Card className='px-2 py-2 w-3/5 h-3/4'>
      <Image
        className='mx-auto'
        src={selectedPokemon.image}
        width={256}
        height={256}
        style={{ objectFit: 'contain' }}
        alt=''
      />
      <h2 className='mt-6 mb-6 text-3xl font-semibold leading-7 text-center tracking-tight'>
        {selectedPokemon.name.toUpperCase()}
      </h2>
      <ul role='list' className='mt-6 flex justify-center gap-x-6'>
        {selectedPokemon.types.map((type, index) => (
          <li key={index}>
            <Badge variant='outline' className='py-1 px-4 text-sm'>
              {type}
            </Badge>
          </li>
        ))}
      </ul>

      <ScrollArea className='h-72'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Stat
              </TableCell>
              <TableCell className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Value
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedPokemon.stats.map((stat, index) => (
              <TableRow key={index}>
                <TableCell className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                  {stat.name}
                </TableCell>
                <TableCell className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {stat.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>

      <Separator className='mt-6' />

      <Button className='mt-6 mb-4 flex align-self-center' variant='outline' onClick={onClose}>
        Close
      </Button>
    </Card>
  );
};
