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
          title: '<div class="flex flex-col items-center">' +
                 '<div class="w-16 h-16 mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">' +
                 '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
                 '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>' +
                 '</svg>' +
                 '</div>' +
                 '<h3 class="text-xl font-bold text-gray-800 mb-2">Login Google Gagal</h3>' +
                 '</div>',
          html: '<div class="text-center">' +
                '<p class="text-gray-600">' + (message || 'Terjadi kesalahan saat login dengan Google. Silakan coba lagi.') + '</p>' +
                '</div>',
          confirmButtonText: "Coba Lagi",
          confirmButtonColor: "#ef4444",
          background: "#fff",
          color: "#1f2937",
          customClass: {
            popup: 'rounded-2xl shadow-2xl border border-gray-200',
            confirmButton: 'py-3 px-6 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200'
          },
          showCloseButton: true
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
            await Swal.fire({
              title: '<div class="flex flex-col items-center">' +
                     '<div class="w-16 h-16 mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">' +
                     '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
                     '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>' +
                     '</svg>' +
                     '</div>' +
                     '<h3 class="text-xl font-bold text-gray-800 mb-2">Login Berhasil!</h3>' +
                     '</div>',
              html: '<div class="text-center">' +
                    '<p class="text-gray-600">Anda berhasil login dengan Google!</p>' +
                    '</div>',
              confirmButtonText: "Lanjutkan",
              confirmButtonColor: "#10b981",
              background: "#fff",
              color: "#1f2937",
              customClass: {
                popup: 'rounded-2xl shadow-2xl border border-gray-200',
                confirmButton: 'py-3 px-6 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200'
              },
              timer: 2000,
              timerProgressBar: true,
              showCloseButton: true
            });
            navigate('/', { replace: true });
          }
        } catch (err) {
          console.error('Error processing Google callback:', err);
          Swal.fire({
            title: '<div class="flex flex-col items-center">' +
                   '<div class="w-16 h-16 mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">' +
                   '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
                   '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>' +
                   '</svg>' +
                   '</div>' +
                   '<h3 class="text-xl font-bold text-gray-800 mb-2">Error</h3>' +
                   '</div>',
            html: '<div class="text-center">' +
                  '<p class="text-gray-600">Terjadi kesalahan saat memproses data login.</p>' +
                  '</div>',
            confirmButtonText: "Coba Lagi",
            confirmButtonColor: "#ef4444",
            background: "#fff",
            color: "#1f2937",
            customClass: {
              popup: 'rounded-2xl shadow-2xl border border-gray-200',
              confirmButton: 'py-3 px-6 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200'
            },
            showCloseButton: true
          }).then(() => {
            navigate('/login', { replace: true });
          });
        }
      } else {
        // Jika tidak ada parameter yang diharapkan
        Swal.fire({
          title: '<div class="flex flex-col items-center">' +
                 '<div class="w-16 h-16 mb-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">' +
                 '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
                 '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>' +
                 '</svg>' +
                 '</div>' +
                 '<h3 class="text-xl font-bold text-gray-800 mb-2">Error</h3>' +
                 '</div>',
          html: '<div class="text-center">' +
                '<p class="text-gray-600">Data login tidak lengkap. Silakan coba lagi.</p>' +
                '</div>',
          confirmButtonText: "Coba Lagi",
          confirmButtonColor: "#ef4444",
          background: "#fff",
          color: "#1f2937",
          customClass: {
            popup: 'rounded-2xl shadow-2xl border border-gray-200',
            confirmButton: 'py-3 px-6 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200'
          },
          showCloseButton: true
        }).then(() => {
          navigate('/login', { replace: true });
        });
      }
    };

    processGoogleCallback();
  }, [searchParams, navigate, handleGoogleCallback]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-amber-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Memproses login Google...</p>
      </div>
    </div>
  );
}