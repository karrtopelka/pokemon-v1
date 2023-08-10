'use client';

import { Layout } from '@/components';

const Home = () => {
  return (
    <main className='flex min-h-screen flex-col p-24'>
      <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center'>
        Pokedex
      </h1>
      <Layout />
    </main>
  );
};

export default Home;
