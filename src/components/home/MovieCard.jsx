import { motion, AnimatePresence } from 'framer-motion';
import { Play, ThumbsUp, ChevronDown, HeartPlus, HeartMinus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { addToMyList, removeFromMyList, isInMyList } from '../../api/myList';
import Button from '../ui/Button';

const MovieCard = ({ movie, orientation = 'vertical' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [inList, setInList] = useState(false);
  const Motion = motion.div;
  const movieId = movie.id || movie.title;

  const displayInfo = {
    match: movie.match || `${90 + (String(movieId).length % 10)}% Match`,
    ageRating: movie.ageRating || (String(movieId).length % 2 === 0 ? '18+' : '13+'),
    episodes: movie.episodes || `${10 + (String(movieId).length % 15)} Eps`,
    genres: movie.genres || (orientation === 'vertical' ? ['Aksi', 'Drama'] : ['Aksi'])
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInList(isInMyList(movieId));
    
    const handleUpdate = () => {
      setInList(isInMyList(movieId));
    };
    
    window.addEventListener('myListUpdated', handleUpdate);
    return () => window.removeEventListener('myListUpdated', handleUpdate);
  }, [movieId]);

  const handleToggleList = (e) => {
    e.stopPropagation();
    if (inList) {
      removeFromMyList(movieId);
    } else {
      addToMyList({ ...movie, id: movieId });
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

              <div className="flex items-center gap-2 mb-3!">
                <span className="text-[#46d369] font-bold text-[14px]">{displayInfo.match}</span>
                <span className="border border-gray-500 px-1.5! py-0.5! rounded text-[10px] text-gray-200 font-medium">
                  {displayInfo.ageRating}
                </span>
                <span className="text-gray-200 font-medium text-[12px]">{displayInfo.episodes}</span>
                <span className="border border-gray-500 px-1! py-0.5! rounded text-[8px] text-gray-200 font-bold">HD</span>
              </div>

              <div className="text-[13px] text-white font-medium">
                {displayInfo.genres.join(' • ')}
              </div>
            </Motion>
          )}
        </AnimatePresence>
        
        {!isHovered && (
          <div className="p-2! truncate text-white text-[11px] font-medium">
            {movie.title}
          </div>
        )}
      </Motion>
    </div>
  );
};

export default MovieCard;
