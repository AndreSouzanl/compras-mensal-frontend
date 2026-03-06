import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#060b14]">
      <div className="text-center">
        <div className="text-5xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold text-white mb-2">ComprasMensal</h1>
        <p className="text-slate-500 mb-8">
          Gerencie suas compras com facilidade
        </p>
        <Link
          href="/login"
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl transition-all"
        >
          Ir para o Login →
        </Link>
      </div>
    </main>
  );
}
