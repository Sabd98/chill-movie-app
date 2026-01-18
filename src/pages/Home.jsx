import { useFetch } from "../hooks/useFetch";
import { getMovies } from "../api/movies";
import Hero from "../components/home/Hero";
import MovieSection from "../components/home/MovieSection";
import MovieRow from "../components/home/MovieRow";
import "../styles/content.css";

const Home = () => {
  const { fetchedData, loading } = useFetch(getMovies, {
    continuing: [],
    topRating: [],
    trending: [],
    newRelease: [],
  });

  const handleMovieClick = (movie) => {
    alert(`Membuka detail untuk: ${movie.title}`);
  };

  return (
    <main className="main-content bg-[#181a1c]">
      <Hero />
      <div className="relative! z-10! -mt-20!">
        {loading ? (
          <div
            className="container"
            style={{ padding: "40px", textAlign: "center" }}
          >
            Loading movies...
          </div>
        ) : (
          <section className="content-sections">
            <div className="container mx-auto px-4!">
              <MovieSection
                title="Melanjutkan Tonton Film"
                id="continuing-section"
              >
                <MovieRow
                  movies={fetchedData.continuing}
                  onMovieClick={handleMovieClick}
                  orientation="horizontal"
                />
              </MovieSection>

              <MovieSection title="Top Rating Film dan Series Hari ini">
                <MovieRow
                  movies={fetchedData.topRating}
                  onMovieClick={handleMovieClick}
                  orientation="vertical"
                />
              </MovieSection>

              <MovieSection title="Film Trending">
                <MovieRow
                  movies={fetchedData.trending}
                  onMovieClick={handleMovieClick}
                  orientation="vertical"
                />
              </MovieSection>

              <MovieSection title="Rilis Baru">
                <MovieRow
                  movies={fetchedData.newRelease}
                  onMovieClick={handleMovieClick}
                  orientation="vertical"
                />
              </MovieSection>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default Home;
