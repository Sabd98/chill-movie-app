import { motion } from 'framer-motion';

const MovieCard = ({ movie, onClick }) => {
  const MotionDiv = motion.div;
  
  return (
    <MotionDiv
      className="relative cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      onClick={() => onClick && onClick(movie)}
    >
      {movie.badge && (
        <div className={`absolute top-2 left-2 px-2! py-1! rounded text-xs font-bold z-5 ${
          movie.badge.type === 'top' 
            ? 'bg-linear-to-r from-[#ff6b6b] to-[#ee5a24] text-white' 
            : 'bg-linear-to-r from-[#4834d4] to-[#686de0] text-white'
        }`}>
          {movie.badge.text}
        </div>
      )}
      <img 
        src={movie.image} 
        alt={movie.title} 
        className="w-full h-100 object-cover rounded-lg"
      />
      <div className="py-2!">
        <h3 className="text-base text-white mb-1! font-semibold truncate">{movie.title}</h3>
        {movie.rating && (
          <div className="text-sm text-[#ffd700] font-medium">★ {movie.rating}</div>
        )}
      </div>
    </MotionDiv>
  );
};

export default MovieCard;
