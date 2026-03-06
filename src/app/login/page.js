"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, salvarToken, salvarUsuario } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", senha: "" });
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErro("");
  }

  // adiciona essa função
  function salvarTokenCookie(token) {
    document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60}`;
  }

  async function handleLogin() {
    setLoading(true);
    setErro("");

    try {
      const resultado = await login(form.email, form.senha);

      if (!resultado.status) {
        setErro(resultado.mensagem);
        return;
      }

      // salva token e usuário no localStorage
      salvarToken(resultado.token);
      salvarUsuario(resultado.usuario);
      salvarTokenCookie(resultado.token); // ← adiciona essa linha

      // redireciona para o dashboard
      router.push("/dashboard");
    } catch (error) {
      setErro("Erro ao conectar com o servidor!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-[#060b14] px-4"
      style={{
        background:
          "radial-gradient(ellipse at 25% 60%, rgba(99,102,241,.18) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(139,92,246,.12) 0%, transparent 50%), #060b14",
      }}
    >
      <div className="w-full max-w-md bg-[#0d1117] border border-slate-800 rounded-2xl p-10">
        {/* LOGO */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl mb-3 shadow-lg shadow-indigo-500/30">
            🛒
          </div>
          <h1 className="text-xl font-extrabold text-slate-100">
            Compras<span className="text-indigo-400">Mensal</span>
          </h1>
        </div>

        {/* HEADING */}
        <div className="text-center mb-7">
          <h2 className="text-2xl font-bold text-slate-100">
            Bem-vindo de volta 👋
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Entre na sua conta para continuar
          </p>
        </div>

        <div className="h-px bg-slate-800 mb-7" />

        {/* ERRO */}
        {erro && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm px-4 py-3 rounded-xl mb-5">
            ⚠️ {erro}
          </div>
        )}

        {/* EMAIL */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            E-mail
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600">
              ✉️
            </span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              className="w-full bg-[#080e1a] border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-slate-200 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>
        </div>

        {/* SENHA */}
        {/* SENHA */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Senha
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600">
              🔑
            </span>
            <input
              name="senha"
              type={mostrarSenha ? "text" : "password"}
              value={form.senha}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-[#080e1a] border border-slate-800 rounded-xl py-3 pl-10 pr-10 text-slate-200 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors"
            >
              {mostrarSenha ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* BOTÃO */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5"
        >
          {loading ? "Entrando..." : "Entrar na plataforma →"}
        </button>

        {/* LINKS */}
        <div className="flex justify-between mt-5">
          <a
            href="/register"
            className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Criar conta
          </a>
          <a
            href="/forgot-password"
            className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Esqueceu a senha?
          </a>
        </div>
      </div>
    </main>
  );
}
