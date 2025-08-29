
function kontak(){
    return (
        <>
    <div className="bg-[#FFF5CC] py-12 px-6 min-h-screen">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
            
            {/* Kiri */}
            <div className="flex flex-col space-y-6">
              <h2 className="text-4xl font-extrabold text-red-600 text-left">
                CONTACT US
              </h2>
              <p className="text-gray-700 text-left max-w-md">
                If you have any questions, please feel free to get in touch with us via
                phone, text, email, the form below, or even on social media
              </p>

              {/* Kotak Contact Info */}
              <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-red-600 border-b border-gray-300 pb-2 mb-4">
                  CONTACT INFORMATION
                </h3>
                <div className="space-y-4 text-gray-700 text-sm">
                  <div className="flex items-center gap-2">
                    📞 <span>0909878765</span>
                  </div>
                  <div className="flex items-center gap-2">
                    📍 <span>Jl. Bayangkhara no.1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    📧 <span>DeKremes@enak.com</span>
                  </div>
                </div>
              </div>
            </div>

           {/* Kanan */}
<div className="bg-white border border-gray-200 rounded-lg shadow-md 
      w-[704px] h-[771px] flex flex-col p-8">

  {/* Judul di kiri atas */}
  <h2 className="text-2xl font-bold text-red-600 mb-6 text-left">
    GET IN TOUCH
  </h2>

  {/* Form + Button (dorong ke bawah) */}
  <div className="flex flex-col justify-between flex-1">
    <form className="space-y-6">
      {/* Name + Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            className="w-full border border-gray-400 rounded-md p-3 text-gray-800 focus:ring-2 focus:ring-red-400"
            placeholder="enter your name"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="text"
            className="w-full border border-gray-400 rounded-md p-3 text-gray-800 focus:ring-2 focus:ring-red-400"
            placeholder="enter your number"
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          className="w-full border border-gray-400 rounded-md p-3 text-gray-800 focus:ring-2 focus:ring-red-400"
          placeholder="enter your email"
        />
      </div>

      {/* Message */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-2">
          Your Message
        </label>
        <textarea
          rows="5"
          className="w-full border border-gray-400 rounded-md p-3 text-gray-800 focus:ring-2 focus:ring-red-400"
          placeholder="Write your message"
        ></textarea>
      </div>
    </form>

    {/* Button pas nempel bawah */}
    <div className="mt-6">
      <button
        type="submit"
        className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 transition"
      >
        SEND MESSAGE
      </button>
    </div>
  </div>
</div>


              </div>
              </div>
              <div className="w-full h-screen">
            <iframe
              title="Lokasi Kami"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15857.839399509035!2d106.92497252525178!3d-6.911330876774717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e684831d4ab49b7%3A0x13d7ec548f6271b4!2sJl.%20Pemuda%2C%20Citamiang%2C%20Kec.%20Citamiang%2C%20Kota%20Sukabumi%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1721369999999!5m2!1sid!2sid"
            ></iframe>
          </div>
          
        </>
    );
}
 export default kontak