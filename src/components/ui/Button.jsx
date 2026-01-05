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
  const baseStyles = 'h-[5vh] px-8 flex items-center justify-center gap-4 font-semibold rounded-3xl transition-all duration-300 cursor-pointer';
  
  const variants = {
    primary: 'bg-[#3d4142] text-white hover:bg-[#4d5152] border border-[#3d4142]',
    google: 'bg-transparent text-white border border-[#3d4142] hover:bg-[#3d4142]',
    play: 'bg-[#0F1E93] text-white hover:bg-opacity-80 !px-4 !py-3',
    info: 'bg-[#22282A] text-white backdrop-blur-sm hover:bg-opacity-60 !px-4 !py-3',
    volume: 'bg-transparent text-white border-2 border-white/70 rounded-full w-11 h-11 p-0 hover:bg-white/20'
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
