import { Card, CardContent, CardFooter } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

function SkeletonMovies({ count }: { count: number }) {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4'>
      {[...Array(count)].map((_, idx) => (
        <Card key={idx} className='overflow-hidden shadow-lg'>
          <CardContent className='p-0'>
            <Skeleton className='w-full h-[250px] rounded-lg' />
          </CardContent>
          <CardFooter className='p-3'>
            <Skeleton className='w-3/4 h-5 rounded-md' />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default SkeletonMovies;
