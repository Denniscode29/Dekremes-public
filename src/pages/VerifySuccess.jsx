import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifySuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("auth_token", token);
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-xl font-bold">✅ Verifikasi berhasil! Anda sedang login...</h1>
    </div>
  );
}
