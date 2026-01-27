import { useEffect } from 'react';
import useMyListStore from '../store/myListStore';
import MovieCard from '../components/home/MovieCard';

const MyList = () => {
  const { myList, loading, error, fetchMyList } = useMyListStore();

  useEffect(() => {
    fetchMyList();
  }, [fetchMyList]);

  if (loading && myList.length === 0) {
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
        
        {myList.length === 0 ? (
          <section className="flex flex-col items-center justify-center py-40 text-gray-500">
            <p className="text-xl font-medium">Belum ada film di daftar kamu.</p>
            <p className="mt-2">Mulai tambahkan film favoritmu!</p>
          </section>
        ) : (
          <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-20">
            {myList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </section>
        )}
      </div>
    </main>
  );
};

export default MyList;
