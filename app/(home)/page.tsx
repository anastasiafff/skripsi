"use client";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-teal-300 via-pink-400 to-indigo-600 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-8 bg-white dark:bg-gray-800 rounded-3xl shadow-lg space-y-12 sm:items-start sm:text-left">
        
        {/* Heading and Subheading with soft pink background */}
        <div className="flex flex-col items-center gap-8 text-center sm:items-start sm:text-left bg-pink-100 p-8 rounded-xl shadow-md">
          {/* Main Heading with a bold and large font */}
          <h1 className="text-5xl font-extrabold leading-tight text-gray-800 dark:text-white sm:max-w-md hover:text-indigo-600 transition-colors duration-300">
            𝐒𝖾ᥣαꭑα𝗍 𝐃α𝗍α𐓣𝗀 ᑯ𝗂 𝐆ᥣⱺω𝐔ρ  𝜗𝜚 ࣪˖ ִ𐙚 
          </h1>

          {/* Subheading with a lighter font and italic style */}
          <p className="text-xl italic font-light leading-8 text-gray-600 dark:text-gray-300 sm:max-w-lg hover:text-indigo-500 transition-colors duration-300">
            Selamat mencari produk skincare sesuai kulit anda. Temukan pilihan terbaik yang cocok untuk kebutuhan kulit Anda.
          </p>

          {/* Additional smaller text with normal weight */}
          <p className="text-md font-normal text-gray-500 dark:text-gray-400 sm:max-w-lg mt-4">
            Kami menyediakan berbagai produk untuk berbagai jenis kulit, dengan kualitas terbaik yang akan membuat kulit Anda semakin bersinar.
          </p>
        </div>
      </main>
    </div>
  );
}