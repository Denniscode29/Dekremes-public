import { useEffect, useState } from "react";
import logo from "../assets/logoayam.png"; // ganti sesuai path logo kamu

function LoadingScreen({ onLoadingComplete }) {
  const [dots, setDots] = useState("");
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  // Animasi titik-titik
  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(dotsInterval);
  }, []);

  // Progress bar animation
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(progressInterval);
  }, []);

  // Exit animation setelah progress selesai
  useEffect(() => {
    if (progress === 100) {
      // Mulai animasi keluar
      setIsExiting(true);
      
      // Setelah animasi selesai, sembunyikan komponen
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onLoadingComplete) onLoadingComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [progress, onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className={`
      fixed inset-0 flex flex-col items-center justify-center z-50 
      transition-all duration-1000 ease-in-out
      ${isExiting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}
    `}
    style={{
      background: "linear-gradient(135deg, #FFF5CC 0%, #FFFFFF 100%)",
    }}>
      {/* Logo Container */}
      <div className="relative mb-8">
        <img
          src={logo}
          alt="Logo"
          className="w-32 h-32 mx-auto animate-pulse-glow"
          style={{
            filter: "drop-shadow(0 0 20px rgba(255,180,0,0.8))",
          }}
        />

        {/* Lingkaran spin dengan gradien */}
        <div 
          className="absolute -inset-6 rounded-full animate-spin-slow"
          style={{
            background: "conic-gradient(from 0deg, #FFD700, #FF8C00, #FF4500, #FF8C00, #FFD700)",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 4px), white calc(100% - 4px))",
            WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 4px), white calc(100% - 4px))"
          }}
        />
        
        {/* Efek cahaya tambahan */}
        <div className="absolute -inset-10 opacity-20 bg-yellow-300 rounded-full blur-xl animate-ping-slow"></div>
      </div>

      {/* Text Loading */}
      <p className={`
        text-amber-900 mt-6 text-lg tracking-widest font-semibold
        transition-all duration-800
        ${isExiting ? 'opacity-0 translate-y-4' : 'opacity-100'}
      `}>
        Loading{dots}
      </p>

      {/* Progress bar dengan gradien */}
      <div className="w-64 h-2 bg-amber-200 rounded-full mt-4 overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-300 ease-out"
          style={{ 
            width: `${progress}%`,
            background: "linear-gradient(90deg, #FFD700 0%, #FF8C00 50%, #FF4500 100%)",
          }}
        />
      </div>

      {/* Persentase loading */}
      <p className="text-amber-800 mt-2 text-sm font-medium">
        {progress}%
      </p>

      {/* CSS untuk animasi */}
      <style>{`
        .animate-pulse-glow {
          animation: pulseGlow 2s infinite ease-in-out;
        }
        
        .animate-spin-slow {
          animation: spin 1.8s linear infinite;
        }
        
        .animate-ping-slow {
          animation: ping 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        @keyframes pulseGlow {
          0% {
            transform: scale(1);
            filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.6));
          }
          50% {
            transform: scale(1.05);
            filter: drop-shadow(0 0 20px rgba(255, 140, 0, 0.8));
          }
          100% {
            transform: scale(1);
            filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.6));
          }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes ping {
          0% {
            transform: scale(0.8);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.1;
          }
          100% {
            transform: scale(0.8);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}

export default LoadingScreen;