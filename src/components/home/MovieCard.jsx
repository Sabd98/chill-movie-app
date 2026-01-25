import { motion, AnimatePresence } from 'framer-motion';
import { Play, ThumbsUp, ChevronDown, HeartPlus, HeartMinus } from 'lucide-react';
import { useState } from 'react';
import useMyListStore from '../../store/myListStore';
import Button from '../ui/Button';

const MovieCard = ({ movie, orientation = 'vertical' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Motion = motion.div;
  const movieId = movie.id || movie.title;

  const inList = useMyListStore(state => state.myList.some(m => m.id === movieId));
  const { addMovie, removeMovie } = useMyListStore();

  const displayInfo = {
    match: movie.match || `${90 + (String(movieId).length % 10)}% Match`,
    ageRating: movie.ageRating || (String(movieId).length % 2 === 0 ? '18+' : '13+'),
    episodes: movie.episodes || `${10 + (String(movieId).length % 15)} Eps`,
    genres: movie.genres || (orientation === 'vertical' ? ['Aksi', 'Drama'] : ['Aksi'])
  };

  const handleToggleList = (e) => {
    e.stopPropagation();
    if (inList) {
      removeMovie(movieId);
    } else {
      addMovie({ ...movie, id: movieId });
    }
  };

  return (
    <div 
      className={`relative z-10 ${orientation === 'vertical' ? 'p-2!' : 'p-1!'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Motion
        className={`relative cursor-pointer bg-[#181818] rounded-lg overflow-hidden shadow-lg ${isHovered ? 'z-50 shadow-2xl ' : 'z-10'}`}
        initial={{ scale: 1 }}
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
      >
        <div className={`relative transition-all duration-300 ${isHovered ? 'aspect-video' : (orientation === 'vertical' ? 'aspect-[2/3]' : 'aspect-video')}`}>
          {movie.badge && (
            <div className={`absolute top-2! left-2! px-2! py-1! rounded text-[10px] font-bold z-10 ${
              movie.badge.type === 'top' 
                ? 'bg-[#E11D48] text-white' 
                : 'bg-[#1E40AF] text-white'
            }`}>
              {movie.badge.text}
            </div>
          )}
          <img 
            src={movie.image} 
            alt={movie.title} 
            className="w-full h-full object-cover"
          />
        </div>

        <AnimatePresence>
          {isHovered && (
            <Motion
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#181818] p-4! border-t border-gray-800"
            >
              <div className="flex items-center gap-2 mb-4!">
                <Button variant="icon-play" className="scale-90">
                  <Play size={18} fill="black" />
                </Button>
                <Button 
                  variant="icon-outline"
                  onClick={handleToggleList}
                  className="scale-90"
                >
                  {inList ? <HeartMinus size={18} /> : <HeartPlus size={18} />}
                </Button>
                <Button variant="icon-outline" className="scale-90">
                  <ThumbsUp size={16} />
                </Button>
                <Button variant="icon-outline" className="ml-auto scale-90">
                  <ChevronDown size={16} />
                </Button>
              </div>

              <div className="text-white">
                <div className="flex items-center gap-2 text-[10px] font-bold mb-1!">
                  <span className="text-green-500">{displayInfo.match}</span>
                  <span className="border border-gray-500 px-1">{displayInfo.ageRating}</span>
                  <span>{displayInfo.episodes}</span>
                  <span className="border border-gray-500 px-1 text-[8px]">HD</span>
                </div>
                <div className="flex flex-wrap gap-2 text-[10px] text-gray-400">
                  {displayInfo.genres.map((genre, idx) => (
                    <span key={idx} className="relative [&:not(:last-child)]:after:content-['•'] [&:not(:last-child)]:after:ml-2 [&:not(:last-child)]:after:text-gray-600">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </Motion>
          )}
        </AnimatePresence>
      </Motion>
    </div>
  );
};

export default MovieCard;
