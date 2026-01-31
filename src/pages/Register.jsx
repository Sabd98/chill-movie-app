import { useNavigate } from 'react-router';
import { useForm } from '../hooks/useForm';
import { registerSchema } from '../utils/validation';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useRegisterMutation } from '../services/authApi';
import '../styles/auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [registerApi, { isLoading, error: apiError, reset: resetApi }] = useRegisterMutation();
  const authError = apiError?.data || apiError?.message;
  
  const { values, errors, handleChange, validate, reset } = useForm(
    { username: '', password: '', confirmPassword: '' },
    registerSchema,
    { externalError: authError, clearError: resetApi, formId: 'register' }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validate()) {
        await registerApi(values).unwrap();
        reset();
        navigate('/');
    
    }
  };

  return (
    <main className="bg-img-register">
      <section className="content">
        <header>
          <img src="/Logo.png" alt="Logo" className="logo-auth" />
          <h3>Daftar</h3>
          <span>Selamat datang kembali!</span>
        </header>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="username"
            placeholder="Masukkan Username"
            value={values.username}
            onChange={handleChange}
            error={errors.username}
          />
          <Input
            type="password"
            name="password"
            placeholder="Masukkan Kata Sandi"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            className="space"
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Konfirmasi Kata Sandi"
            value={values.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            className="space"
          />
          <div className="auth-links-spacing flex justify-between text-left text-white/60 text-[14px]">
            <div className="text-white/70">
              Sudah Punya Akun?{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="text-white/70 no-underline hover:underline hover:text-white">
                Masuk
              </a>
            </div>
            <a href="#" className="text-white/70 no-underline hover:underline hover:text-white">Lupa Kata Sandi?</a>
          </div>
          <div className="auth-button-container">
            <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
              {isLoading ? 'Mendaftar...' : 'Daftar'}
            </Button>
            <span className="auth-or-text">Atau</span>
            <Button 
              type="button" 
              variant="google" 
              className="w-full"
              icon={<img src="/google.png" alt="Google" className="h-4" />}
            >
              Daftar dengan Google
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Register;
