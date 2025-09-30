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
    const processGoogleCallback = async () => {
      const token = searchParams.get('token');
      const userParam = searchParams.get('user');
      const error = searchParams.get('error');
      const message = searchParams.get('message');

      if (error) {
        console.error('Google OAuth error:', message);
        Swal.fire({
          icon: 'error',
          title: 'Login Google Gagal',
          text: message || 'Terjadi kesalahan saat login dengan Google. Silakan coba lagi.',
        }).then(() => {
          navigate('/login', { replace: true });
        });
        return;
      }

      if (token && userParam) {
        try {
          const user = JSON.parse(decodeURIComponent(userParam));
          const result = handleGoogleCallback(token, user);
          
          if (result.success) {
            Swal.fire({
              icon: 'success',
              title: 'Login Berhasil',
              text: 'Anda berhasil login dengan Google!',
              timer: 2000,
              showConfirmButton: false,
            }).then(() => {
              navigate('/', { replace: true });
            });
          }
        } catch (err) {
          console.error('Error processing Google callback:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Terjadi kesalahan saat memproses data login.',
          }).then(() => {
            navigate('/login', { replace: true });
          });
        }
      } else {
        // Jika tidak ada parameter yang diharapkan
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Data login tidak lengkap. Silakan coba lagi.',
        }).then(() => {
          navigate('/login', { replace: true });
        });
      }
    };

    processGoogleCallback();
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