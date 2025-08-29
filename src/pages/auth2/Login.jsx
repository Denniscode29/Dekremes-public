import { Link } from "react-router-dom";



export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#B3BEF6] to-[#B3BEF6]">
  <div className="bg-white shadow-lg rounded-lg flex overflow-hidden w-[1197px] h-[654px]">
    <div className="w-1/2 bg-[#3F51B5] flex items-center justify-center p-8">
      <img
        src=""
        alt="Gambar Tengah"
        className="w-80 h-auto rounded"
         />
    </div>
    <div className="w-1/2 p-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Masuk
      </h2>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
           />
        </div>
        <button
          type="masuk"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          login
        </button>
      </form>
      <div className="my-4 flex items-center">
        <hr className="flex-grow border-gray-300" />
        <span className="px-2 text-gray-500">Atau</span>
        <hr className="flex-grow border-gray-300" />
      </div>
      <p className="mt-4 text-center text-gray-600">
        belom punya akun?{" "}
        <Link to="/register" className="text-blue-500 hover:underline">
          Daftar
        </Link>
      </p>
    </div>
  </div>
</div>
  );
}