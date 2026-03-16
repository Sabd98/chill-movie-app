import Hero from "../components/home/Hero";
import MovieSection from "../components/home/MovieSection";
import MovieRow from "../components/home/MovieRow";
import MovieModal from "../components/ui/Modal";
import { useDispatch } from "react-redux";
import { openModal } from "../store/modalSlice";
import { useGetMoviesQuery } from "../api/moviesApi";
import "../styles/content.css";

const Home = () => {
  const dispatch = useDispatch();
  const { data: movies, isLoading: loading } = useGetMoviesQuery();

  const fetchedData = movies || {
    continuing: [],
    topRating: [],
    trending: [],
    newRelease: [],
  };

  const handleMovieClick = (movie, orientation) => {
    const type = orientation === 'horizontal' ? 'series' : 'movie';
    dispatch(openModal({ content: movie, type }));
  };

  return (
    <main className="main-content bg-[#181a1c]">
      <Hero />
      <MovieModal />
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
                  onMovieClick={(movie) => handleMovieClick(movie, 'horizontal')}
                  orientation="horizontal"
                />
              </MovieSection>

              <MovieSection title="Top Rating Film dan Series Hari ini">
                <MovieRow
                  movies={fetchedData.topRating}
                  onMovieClick={(movie) => handleMovieClick(movie, 'vertical')}
                  orientation="vertical"
                />
              </MovieSection>

              <MovieSection title="Film Trending">
                <MovieRow
                  movies={fetchedData.trending}
                  onMovieClick={(movie) => handleMovieClick(movie, 'vertical')}
                  orientation="vertical"
                />
              </MovieSection>

              <MovieSection title="Rilis Baru">
                <MovieRow
                  movies={fetchedData.newRelease}
                  onMovieClick={(movie) => handleMovieClick(movie, 'vertical')}
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
