function Menu() {
  return (
    <>
    <div className="min-h-screen flex flex-col md:flex-row items-center md:items-stretch justify-between px-8 md:px-16 py-12"
      style={{ backgroundColor: '#FFF5CC' }}>
            <div className="md:w-1/2 mb-8 md:mb-0 flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-4">About <span className="text-[#4DA8DA]">TO-DO-U</span>      </h2>
              <p className="text-gray-800 text-lg leading-relaxed">
                TODOU is a todo list application designed to help you record, organize and complete daily tasks easily.
                We believe that a tidy life starts with one small step: writing down what's important.
                TODOU is here as your productive friend, anytime and anywhere.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img src="/src/assets/produk.jpg"alt="Todo Illustration"className="w-[35rem] object-contain"/>
            </div>
            </div>
              <div className="min-h-screen flex items-center justify-center px-4"
              style={{ backgroundColor: '#B80000' }}>
              
                <div className="md:w-1/2 mb-6 md:mb-0 flex justify-center">
                  <img src="/src/assets/ygg.png" className="w-80 h-auto rounded" />
                </div>
                <div className="md:w-1/2 md:pl-10 text-white">
                  <h3 className="text-3xl font-bold mb-10">Todou website mission/goals</h3>
                  <p className="text-lg leading-relaxed">
                    TODOU's goal is to help anyone become more organized,
                    focused, and productive in everyday life.
                    We want to make daily activities feel lighter by simply recording, <br /><br />
                    organizing and completing tasks. <br />
                    TODOU is designed to be easy for anyone to use—students, workers, or
                    anyone who wants to achieve more in a more focused way.
                  </p>
                </div>
              </div>
            <div className="bg-white py-12 px-6 text-center"> <h2 className="text-5xl font-bold text-blue-600 mb-6">Team</h2>
              <div className="flex flex-wrap justify-center gap-8 p-8 bg-white">
                  <div className="flex flex-col items-center text-center bg-gray-50 p-6 rounded-xl shadow-md w-64">
                    <img src="/src/assets/profile.png" alt="Foto Profil" className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 mb-4"/>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Denzz Biasalah</h3>
                    <p className="text-sm text-gray-700">A web developer who enjoys creating useful applications. UI/UX field</p>
                  </div>
                  <div className="flex flex-col items-center text-center bg-gray-50 p-6 rounded-xl shadow-md w-64">
                    <img src="/src/assets/profile.png"alt="Foto Profil"className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 mb-4"/>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Denzz Biasalah</h3>
                    <p className="text-sm text-gray-700">
                      web developer who enjoys creating useful applications. front end area</p>
                  </div>
                  <div className="flex flex-col items-center text-center bg-gray-50 p-6 rounded-xl shadow-md w-64">
                    <img src="/src/assets/profile.png" alt="Foto Profil"className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Denzz Biasalah</h3>
                      <p className="text-sm text-gray-700">
                        web developer who enjoys creating useful applications. backend area
                      </p>
                </div>
              </div>
            </div>
    </>
  );
}   

export default Menu;