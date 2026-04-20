import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-sans dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-8 bg-white dark:bg-gray-800 rounded-3xl shadow-lg space-y-12 sm:items-start sm:text-left">
        <Image className="dark:invert" src="/next.svg" alt="Next.js logo" width={120} height={24} priority />
        <div className="flex flex-col items-center gap-8 text-center sm:items-start sm:text-left">
          <h1 className="text-4xl font-bold leading-tight text-gray-800 dark:text-white sm:max-w-md">Selamat Datang di GlowUp</h1>
          <p className="text-lg leading-7 text-gray-600 dark:text-gray-300 sm:max-w-lg">Temukan produk skincare terbaik untuk kebutuhan kulit Anda. Ayo mulai mencari sekarang!</p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row sm:gap-6">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-indigo-600 text-white px-6 transition-colors hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image className="dark:invert" src="/vercel.svg" alt="Vercel logomark" width={16} height={16} />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-gray-300 px-6 text-gray-800 dark:border-gray-600 dark:text-gray-200 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
