// pages/Profile.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthController from "../controllers/AuthController";
import defaultProfile from "../assets/profil.jpg";

function Profile() {
  const user = AuthController((state) => state.user);
  const isLoggedIn = AuthController((state) => state.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center relative">
        {/* Tombol Kembali */}
        <button
          onClick={() => navigate("/")}
          className="absolute left-4 top-4 bg-gray-100 text-gray-800 px-3 py-1 rounded-lg shadow hover:bg-gray-200 transition"
        >
          ← Kembali
        </button>

        <img
          src={user?.avatar || defaultProfile}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-gray-300"
        />
        <h2 className="text-2xl font-bold text-gray-800">
          {user?.name || "User"}
        </h2>
        <p className="text-gray-500">{user?.email}</p>

        <div className="mt-6 space-y-3">
          <button className="w-full py-2 px-4 bg-[#B80002] text-white rounded-lg hover:bg-[#a00002] transition">
            Edit Profil
          </button>
          <button className="w-full py-2 px-4 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition">
            Ganti Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
