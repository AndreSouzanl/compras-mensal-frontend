"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErro("");
  }

  async function handleRegister() {
    if (!form.nome || !form.email || !form.senha) {
      setErro("Todos os campos são obrigatórios!");
      return;
    }

    if (form.senha !== form.confirmarSenha) {
      setErro("As senhas não coincidem!");
      return;
    }

    if (form.senha.length < 6) {
      setErro("A senha deve ter no mínimo 6 caracteres!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome,
          email: form.email,
          senha: form.senha,
        }),
      });

      const data = await res.json();

      if (res.status === 201) {
        router.push("/login?cadastro=sucesso");
      } else {
        setErro(data.mensagem || "Erro ao criar conta!");
      }
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
            Criar sua conta 🎉
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Preencha os dados para começar
          </p>
        </div>

        <div className="h-px bg-slate-800 mb-7" />

        {/* ERRO */}
        {erro && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm px-4 py-3 rounded-xl mb-5">
            ⚠️ {erro}
          </div>
        )}

        {/* NOME */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Nome completo
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600">
              👤
            </span>
            <input
              name="nome"
              type="text"
              value={form.nome}
              onChange={handleChange}
              placeholder="Seu nome completo"
              className="w-full bg-[#080e1a] border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-slate-200 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>
        </div>

        {/* EMAIL */}
        <div className="mb-4">
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
        <div className="mb-4">
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
              placeholder="Mínimo 6 caracteres"
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

        {/* CONFIRMAR SENHA */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Confirmar senha
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600">
              🔒
            </span>
            <input
              name="confirmarSenha"
              type={mostrarConfirmar ? "text" : "password"}
              value={form.confirmarSenha}
              onChange={handleChange}
              placeholder="Repita a senha"
              className="w-full bg-[#080e1a] border border-slate-800 rounded-xl py-3 pl-10 pr-10 text-slate-200 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
            <button
              type="button"
              onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors"
            >
              {mostrarConfirmar ? "🙈" : "👁️"}
            </button>
          </div>
        </div>
        {/* BOTÃO */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/30 hover:-translate-y-0.5"
        >
          {loading ? "Criando conta..." : "Criar conta →"}
        </button>

        {/* LINK LOGIN */}
        <p className="text-center text-sm text-slate-500 mt-5">
          Já tem uma conta?{" "}
          <Link
            href="/login"
            className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
          >
            Fazer login
          </Link>
        </p>
      </div>
    </main>
  );
}
