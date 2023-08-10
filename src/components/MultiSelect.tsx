'use client';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Command as CommandPrimitive } from 'cmdk';
import { Command, CommandGroup, CommandItem } from './ui/command';
import { useCallback, useRef, useState, KeyboardEvent } from 'react';

export type MultiSelectProps = {
  options: string[];
  onSelect: (value: string) => void;
  selectedValues: string[];
};

export const MultiSelect = ({ options, onSelect, selectedValues }: MultiSelectProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleUnselect = useCallback(
    (type: string) => {
      onSelect(type);
    },
    [onSelect],
  );

  const selectables = options.filter((type) => !selectedValues.includes(type));

  return (
    <Command className='overflow-visible bg-transparent h-auto'>
      <div className='group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'>
        <div className='flex gap-1 flex-wrap'>
          {selectedValues.map((type) => {
            return (
              <Badge key={type} variant='secondary'>
                {type}
                <button
                  className='ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUnselect(type);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(type)}>
                  <X className='h-3 w-3 text-muted-foreground hover:text-foreground' />
                </button>
              </Badge>
            );
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder='Select types...'
            className='ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1'
          />
        </div>
      </div>
      <div className='relative mt-2'>
        {open && selectables.length > 0 ? (
          <div className='absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in'>
            <CommandGroup className='h-full overflow-auto'>
              {selectables.map((type) => {
                return (
                  <CommandItem
                    key={type}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={(value) => {
                      setInputValue('');
                      onSelect(type);
                    }}
                    className={'cursor-pointer'}>
                    {type}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
};
