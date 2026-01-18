import clsx from 'clsx';

const Button = ({ 
  children, 
  variant = 'primary', 
  type = 'button',
  onClick,
  className = '',
  icon,
  ...props 
}) => {
  const baseStyles = 'flex items-center justify-center transition-all duration-300 cursor-pointer';
  
  const variants = {
    primary: 'h-[5vh] px-8 gap-4 font-semibold rounded-3xl bg-[#3d4142] text-white hover:bg-[#4d5152] border border-[#3d4142]',
    google: 'h-[5vh] px-8 gap-4 font-semibold rounded-3xl bg-transparent text-white border border-[#3d4142] hover:bg-[#3d4142]',
    play: 'h-[5vh] px-8 gap-4 font-semibold rounded-3xl bg-[#0F1E93] text-white hover:bg-opacity-80 !px-4 !py-3',
    info: 'h-[5vh] px-8 gap-4 font-semibold rounded-3xl bg-[#22282A] text-white backdrop-blur-sm hover:bg-opacity-60 !px-4 !py-3',
    volume: 'border-2 border-white/70 bg-[#22282A] rounded-full w-11 h-11 p-0 hover:bg-white/20 text-white',
    'icon-play': 'w-9 h-9 rounded-full bg-white text-black hover:bg-gray-200 shadow-lg',
    'icon-outline': 'w-9 h-9 rounded-full border border-gray-500 text-white hover:border-white bg-[#181818]/80'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(baseStyles, variants[variant], className)}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
