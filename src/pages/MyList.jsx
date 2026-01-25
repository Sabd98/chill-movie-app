import { useEffect } from 'react';
import { getMyList } from '../api/movies';
import { useFetch } from '../hooks/useFetch';
import MovieCard from '../components/home/MovieCard';

const MyList = () => {
  const { fetchedData, loading, error, fetchData: refreshList } = useFetch(getMyList);

  useEffect(() => {
    window.addEventListener('myListUpdated', refreshList);
    return () => window.removeEventListener('myListUpdated', refreshList);
  }, [refreshList]);

  if (loading && fetchedData.length === 0) {
    return (
      <main className="pt-[100px]! min-h-screen bg-[#181a1c]">
        <div className="container mx-auto px-4! md:px-10! text-center py-40">
          <p className="text-white text-xl">Memuat daftar...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="pt-[100px]! min-h-screen bg-[#181a1c]">
        <div className="container mx-auto px-4! md:px-10! text-center py-40">
          <p className="text-red-500 text-xl">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-[100px]! min-h-screen bg-[#181a1c]">
      <div className="container mx-auto px-4! md:px-10!">
        <h1 className="text-3xl font-bold text-white mb-10!">Daftar Saya</h1>
        
        {fetchedData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 text-gray-500">
            <p className="text-xl font-medium">Belum ada film di daftar kamu.</p>
            <p className="mt-2">Mulai tambahkan film favoritmu!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-20">
            {fetchedData.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyList;
