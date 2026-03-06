"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/context/SidebarContext";
import { removerToken, pegarUsuario } from "@/lib/api";
import { useState, useEffect } from "react";

const menuItems = [
  { icon: "📊", label: "Dashboard", href: "/dashboard" },
  // { icon: "🛍️", label: "Lista de Compras", href: "/dashboard/lista" },
  // { icon: "📦", label: "Produtos", href: "/dashboard/produtos" },
  // { icon: "📈", label: "Histórico", href: "/dashboard/historico" },
  // { icon: "⚙️", label: "Configurações", href: "/dashboard/configuracoes" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen, fecharMenu } = useSidebar();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const u = pegarUsuario();
    if (u) setUsuario(u);
  }, []);

  function handleLogout() {
    removerToken();
    // remove o cookie também
    document.cookie = "token=; path=/; max-age=0";
    router.push("/login");
  }

  return (
    <>
      {/* OVERLAY */}
      {isOpen && (
        <div
          onClick={fecharMenu}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 h-full z-50 w-60 bg-[#0a0f1a] border-r border-slate-800 flex flex-col py-5 transition-transform duration-300",
          "lg:static lg:translate-x-0 lg:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* LOGO */}
        <div className="flex items-center justify-between px-5 pb-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-lg shadow-lg shadow-indigo-500/30">
              🛒
            </div>
            <div>
              <div className="text-sm font-extrabold text-slate-100">
                Compras<span className="text-indigo-400">Mensal</span>
              </div>
              <div className="text-xs text-slate-600">v2.0 · DevSouza</div>
            </div>
          </div>
          <button
            onClick={fecharMenu}
            className="lg:hidden w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 flex items-center justify-center transition-all"
          >
            ✕
          </button>
        </div>

        {/* MENU */}
        <nav className="flex-1 px-3 mt-4">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-widest px-2 mb-2">
            Principal
          </div>
          {menuItems.slice(0, 3).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={fecharMenu}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-1",
                pathname === item.href
                  ? "bg-indigo-500/15 text-indigo-400 font-semibold"
                  : "text-slate-500 hover:bg-slate-800 hover:text-slate-200",
              )}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
              {pathname === item.href && (
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 ml-auto" />
              )}
            </Link>
          ))}

          {/* <div className="text-xs font-bold text-slate-700 uppercase tracking-widest px-2 mb-2 mt-5">
            Relatórios
          </div> */}
          {menuItems.slice(3).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={fecharMenu}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-1",
                pathname === item.href
                  ? "bg-indigo-500/15 text-indigo-400 font-semibold"
                  : "text-slate-500 hover:bg-slate-800 hover:text-slate-200",
              )}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* USUÁRIO + LOGOUT */}
        {/* USUÁRIO + LOGOUT */}
        <div className="px-3 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-800/50 mb-2">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white shrink-0">
              {usuario?.nome?.charAt(0).toUpperCase() || "?"}
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-200">
                {usuario?.nome || "Usuário"}
              </div>
              <div className="text-xs text-slate-600">Administrador</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-all"
          >
            <span>🚪</span>
            Sair da conta
          </button>
        </div>
      </aside>
    </>
  );
}
