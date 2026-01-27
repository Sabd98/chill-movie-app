import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

const Input = ({ 
  type = 'text', 
  name, 
  placeholder, 
  value, 
  onChange, 
  onBlur,
  error,
  className = '',
  containerClassName = '',
  showPasswordToggle = true,
  showErrorMessage = true,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className={`field relative w-full mb-4 ${containerClassName}`}>
      <input
        type={inputType}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full h-[50px] px-4 py-3 bg-[#333] border-2 rounded-full text-white text-base outline-none transition-colors duration-300 ${error ? '!border-[#ff4444] error' : 'border-[#444]'} ${className}`}
        {...props}
      />
      {isPassword && showPasswordToggle && (
        <span 
          className="absolute top-[48px] -translate-y-1/2 right-4 cursor-pointer text-[#ccc] transition-colors duration-300 hover:text-white"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </span>
      )}
      {error && showErrorMessage && (
        <div className="text-[#ff4444] text-sm !mt-1.5 !ml-4 text-left font-medium animate-pulse">
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;
