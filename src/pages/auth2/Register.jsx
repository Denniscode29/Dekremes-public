import { Link } from "react-router-dom";
import educator from "../../assets/undraw_barbecue_k11q.svg";

function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#B3BEF6] to-[#B3BEF6]">
  <div className="bg-white shadow-lg rounded-lg flex overflow-hidden w-[1197px] h-[654px]">
    
    <div className="w-1/2 bg-[#3F51B5] flex items-center justify-center p-8">
      <img
        src={educator}
        alt="Educator"
        className="w-80 h-auto rounded"
      />
    </div>

    <div className="w-1/2 p-8 flex flex-col justify-center">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Daftar
      </h2>

      <form className="space-y-4">
        <div className="max-w-[300px] mx-auto">
          <label className="block text-gray-700 mb-1">Nama</label>
          <input
            type="text"
            placeholder="Nama"
            className="w-full h-[40px] px-3 border border-black rounded-lg text-black focus:outline-none focus:border-black"
          />
        </div>
        <div className="max-w-[300px] mx-auto">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="w-full h-[40px] px-3 border border-black rounded-lg text-black focus:outline-none focus:border-black"
          />
        </div>
        <div className="max-w-[300px] mx-auto">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="w-full h-[40px] px-3 border border-black rounded-lg text-black focus:outline-none focus:border-black"
          />
        </div>
        <div className="max-w-[300px] mx-auto">
          <button
            type="submit"
            className="w-full h-[40px] bg-[#3F51B5] text-white rounded-lg hover:bg-blue-700 transition"
          >
            Daftar
          </button>
        </div>
      </form>

      <div className="my-4 flex items-center">
        <hr className="flex-grow border-gray-300" />
        <span className="px-2 text-gray-500">Atau</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <div className="max-w-[300px] mx-auto">
        <button
          type="button"
          className="w-full h-[40px] border border-gray-300 rounded-md hover:bg-gray-100 transition flex items-center justify-center gap-2"
        >
          Daftar dengan Google
        </button>
      </div>
      <p className="mt-4 text-center text-gray-600">
        Sudah punya akun?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Masuk sekarang
        </Link>
      </p>
    </div>
  </div>
</div>

  );
}
 export default Register