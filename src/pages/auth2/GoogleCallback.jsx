// src/pages/auth2/GoogleCallback.jsx
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthController from '../../controllers/AuthController';
import Swal from 'sweetalert2';

export default function GoogleCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { handleGoogleCallback } = AuthController();

  useEffect(() => {
    const token = searchParams.get('token');
    const userParam = searchParams.get('user');
    const error = searchParams.get('error');

    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Google Gagal',
        text: 'Terjadi kesalahan saat login dengan Google. Silakan coba lagi.',
      }).then(() => {
        navigate('/login', { replace: true });
      });
      return;
    }

    if (token && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));
        handleGoogleCallback(token, user);
        
        Swal.fire({
          icon: 'success',
          title: 'Login Berhasil',
          text: 'Anda berhasil login dengan Google!',
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          navigate('/', { replace: true });
        });
      } catch (err) {
        console.error('Error parsing user data:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Terjadi kesalahan saat memproses data login.',
        }).then(() => {
          navigate('/login', { replace: true });
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Data login tidak lengkap.',
      }).then(() => {
        navigate('/login', { replace: true });
      });
    }
  }, [searchParams, navigate, handleGoogleCallback]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Memproses login Google...</p>
      </div>
    </div>
  );
}