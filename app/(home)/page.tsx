"use client"

import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-teal-300 via-sky-200 to-indigo-300 font-sans dark:bg-gradient-to-r dark:from-gray-700 dark:via-gray-800 dark:to-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-8 bg-white dark:bg-gray-800 rounded-3xl shadow-lg space-y-12 sm:items-start sm:text-left">
        {/* Gambar Estetik / Logo */}
        <div className="relative w-full h-40">
          <Image
            src="/path-to-your-image.jpg" // Ganti dengan URL gambar atau logo yang sesuai
            alt="Logo Estetik"
            layout="fill"
            objectFit="cover"
            className="rounded-3xl shadow-lg"
          />
        </div>

        {/* Judul dan Deskripsi */}
        <div className="flex flex-col items-center gap-8 text-center sm:items-start sm:text-left">
          <h1 className="text-4xl font-semibold leading-tight text-gray-800 dark:text-white sm:max-w-md">
            Selamat Datang di GlowUp
          </h1>
          <p className="text-lg leading-7 text-gray-600 dark:text-gray-300 sm:max-w-lg">
            Temukan produk skincare terbaik untuk kebutuhan kulit Anda. Ayo mulai mencari sekarang dan temukan yang terbaik!
          </p>
        </div>
      </main>
    </div>
  );
}