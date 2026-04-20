"use client"

import Image from "next/image";

export default function Home() {
  return (
    <div 
      className="flex min-h-screen items-center justify-center bg-cover bg-center font-sans dark:bg-gradient-to-r dark:from-gray-700 dark:via-gray-800 dark:to-black"
      style={{ backgroundImage: 'url("/mnt/data/image(777).png")' }} // Ganti dengan path yang sesuai
    >
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-8 bg-white dark:bg-gray-800 rounded-3xl shadow-lg space-y-12 sm:items-start sm:text-left bg-opacity-80">
        
        {/* Gambar Estetik / Logo */}
        <div className="relative w-full h-40 overflow-hidden rounded-xl shadow-xl">
          <Image
            src="public/pict1.jpg" // Ganti dengan path yang sesuai jika gambar lainnya digunakan
            alt="Logo Estetik"
            width={150} // Tentukan ukuran gambar sesuai kebutuhan
            height={150}
            className="rounded-xl object-center opacity-80 hover:opacity-100 transition-all duration-500"
          />
        </div>

        {/* Judul dan Deskripsi */}
        <div className="flex flex-col items-center gap-8 text-center sm:items-start sm:text-left">
          <h1 className="text-4xl font-semibold leading-tight text-gray-800 dark:text-white sm:max-w-md hover:text-indigo-600 transition-colors duration-300">
            Selamat Datang di GlowUp
          </h1>
          <p className="text-lg leading-7 text-gray-600 dark:text-gray-300 sm:max-w-lg hover:text-indigo-500 transition-colors duration-300">
            Temukan produk skincare terbaik untuk kebutuhan kulit Anda. Ayo mulai mencari sekarang dan temukan yang terbaik!
          </p>
        </div>

      </main>
    </div>
  );
}