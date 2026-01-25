import { useNavigate } from 'react-router';
import { useForm } from '../hooks/useForm';
import { loginSchema } from '../utils/validation';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import useAuthStore from '../store/authStore';
import '../styles/auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error, clearError } = useAuthStore();
  
  const { values, errors, handleChange, validate, reset } = useForm(
    { username: '', password: '' },
    loginSchema,
    { externalError: error, clearError: clearError, formId: 'login' }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validate()) {
      const result = await login(values.username, values.password);
      if (result.success) {
        reset();
        navigate('/home');
      }
    }
  };

  return (
    <main className="bg-img">
      <section className="content">
        <header className="flex flex-col text-center">
          <img src="/Logo.png" alt="Logo" className="logo-auth" />
          <h3>Masuk</h3>
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
          <div className="auth-links-spacing flex justify-between text-left text-white/60 text-[14px]">
            <div className="text-white/70">
              Belum punya akun?{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/register'); }} className="text-white/70 no-underline hover:underline hover:text-white">
                Daftar
              </a>
            </div>
            <a href="#" className="text-white/70 no-underline hover:underline hover:text-white">Lupa Kata Sandi?</a>
          </div>
          <div className="auth-button-container">
            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? 'Masuk...' : 'Masuk'}
            </Button>
            <span className="auth-or-text text-white/70 text-[15px] block text-center">Atau</span>
            <Button 
              type="button" 
              variant="google" 
              className="w-full"
              icon={<img src="/google.png" alt="Google" className="h-4" />}
            >
              Masuk dengan Google
            </Button>
          </div>
          {error && <div className="auth-error-message-bottom">{error}</div>}
        </form>
      </section>
    </main>
  );
};

export default Login;
