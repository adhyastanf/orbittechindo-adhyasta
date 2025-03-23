'use client';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { formatImg } from '../../lib/format';

type Movie = {
  id: string;
  name?: string;
  title?: string;
  backdrop_path: string;
  overview: string;
};

function MovieCarousel({ data }: { data: Movie[] }) {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
      className='w-full mx-auto'
      opts={{ loop: true }}
    >
      <CarouselContent className='m-0'>
        {data?.map((movie) => (
          <CarouselItem key={movie.id} className='p-2'>
            <div className='relative w-full aspect-video'>
              <Image src={formatImg(movie.backdrop_path)} alt={movie.name || movie.title || 'Untitled'} layout='fill' objectFit='cover' className='rounded-lg inset-0' />
              <div className='z-50 text-white absolute bottom-1/2 left-[200px]'>
                <h1 className='text-6xl font-bold'>{movie.name || movie.title}</h1>
                <h3 className='mt-2 font-semibold max-w-[518px]'>{movie.overview}</h3>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='absolute left-10 top-1/2 transform -translate-y-1/2' />
      <CarouselNext className='absolute right-10 top-1/2 transform -translate-y-1/2' />
    </Carousel>
  );
}

export default MovieCarousel;
