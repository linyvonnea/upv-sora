import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-black px-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
          Welcome to UPV-SORA
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          Streamlining event and publication requests for student organizations at UPV.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4 pt-4">
          <Link href="/login" className="inline-block">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Enter as Organization
            </button>
          </Link>
          <Link href="/login" className="inline-block">
            <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              Enter as SOA Admin
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}