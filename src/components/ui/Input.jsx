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
  className = ''
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className="field">
      <input
        type={inputType}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full h-[50px] px-4 py-3 bg-[#333] border-2 border-[#444] rounded-full text-white text-base outline-none transition-colors duration-300 focus:border-[#0F1E93] ${error ? 'border-[#ff4444]' : ''} ${className}`}
      />
      {isPassword && (
        <span 
          className="show" 
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </span>
      )}
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default Input;
