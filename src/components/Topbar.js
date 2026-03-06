"use client";

import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";

const pageTitles = {
  "/dashboard": { title: "Dashboard", crumb: "Início" },
  "/dashboard/lista": { title: "Lista de Compras", crumb: "Lista" },
  "/dashboard/produtos": { title: "Produtos", crumb: "Produtos" },
  "/dashboard/historico": { title: "Histórico", crumb: "Histórico" },
  "/dashboard/configuracoes": {
    title: "Configurações",
    crumb: "Configurações",
  },
};

export default function Topbar() {
  const pathname = usePathname();
  const page = pageTitles[pathname] || { title: "Dashboard", crumb: "Início" };
  const { toggleMenu } = useSidebar();
  const mesAtual = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-[#0a0f1a] border-b border-slate-800">
      <div className="flex items-center gap-3">
        {/* BOTÃO HAMBURGUER — só no mobile */}
        <button
          onClick={toggleMenu}
          className="lg:hidden w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-all text-lg"
        >
          ☰
        </button>

        {/* TÍTULO E BREADCRUMB */}
        <div>
          <div className="text-xs text-slate-600 mb-1">
            Início / <span className="text-indigo-400">{page.crumb}</span>
          </div>
          <h1 className="text-base font-bold text-slate-100">{page.title}</h1>
        </div>
      </div>

      {/* DIREITA */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hidden sm:inline-flex capitalize">
          ● {mesAtual}
        </span>
        {/* <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5">
          <span className="hidden sm:inline">＋ Novo Produto</span>
          <span className="sm:hidden">＋</span>
        </button> */}
      </div>
    </header>
  );
}
