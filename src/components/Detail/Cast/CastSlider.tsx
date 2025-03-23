'use client';

import EmptyComponent from '@/components/Empty/EmptyComponent';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { formatImg } from '@/lib/format';
import Image from 'next/image';

interface CastMember {
  id: number;
  name?: string;
  character?: string;
  profile_path?: string;
}

interface CastSliderProps {
  cast: CastMember[];
}

export default function CastSlider({ cast }: CastSliderProps) {
  const isEmpty = !cast || cast.length === 0;

  if (isEmpty) {
    return <EmptyComponent />;
  }

  return (
    <Carousel opts={{ align: 'start' }} className='w-full'>
      <CarouselContent>
        {cast.map((actor) => (
          <CarouselItem key={actor.id} className='basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-[20%]'>
            <CastCard actor={actor} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

function CastCard({ actor }: { actor: CastMember }) {
  return (
    <Card className='bg-gray-900 text-white shadow-md h-full'>
      <CardContent className='p-0 flex flex-col h-full rounded-md overflow-hidden'>
        <ImageContainer profilePath={actor.profile_path} name={actor.name} />
        <ActorInfo name={actor.name} character={actor.character} />
      </CardContent>
    </Card>
  );
}

function ImageContainer({ profilePath, name }: { profilePath?: string; name?: string }) {
  if (!profilePath) {
    return (
      <div className='relative w-full h-[250px]'>
        <div className='flex items-center justify-center h-full bg-gray-800 text-gray-500 text-sm '>No Image</div>
      </div>
    );
  }

  return (
    <div className='relative w-full h-[250px]'>
      <Image src={formatImg(profilePath)} alt={name || 'Unknown'} fill className='object-cover object-top' />
    </div>
  );
}

function ActorInfo({ name, character }: { name?: string; character?: string }) {
  return (
    <div className='flex-grow flex flex-col px-2 py-2'>
      <h3 className='text-sm font-semibold'>{name || 'Unknown Actor'}</h3>
      <p className='text-xs text-gray-400'>{character || 'Unknown Character'}</p>
    </div>
  );
}
