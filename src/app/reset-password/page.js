'use client'

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")

  const [form, setForm] = useState({ novaSenha: "", confirmarSenha: "" })
  const [erro, setErro] = useState("")
  const [loading, setLoading] = useState(false)
  const [sucesso, setSucesso] = useState(false)
  const [mostrarSenha, setMostrarSenha] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErro("")
  }

  async function handleResetar() {
    if (!form.novaSenha || !form.confirmarSenha) {
      setErro("Preencha todos os campos!")
      return
    }

    if (form.novaSenha !== form.confirmarSenha) {
      setErro("As senhas não coincidem!")
      return
    }

    if (form.novaSenha.length < 6) {
      setErro("A senha deve ter no mínimo 6 caracteres!")
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/reset/resetar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, novaSenha: form.novaSenha }),
      })

      const data = await res.json()

      if (res.ok) {
        setSucesso(true)
        setTimeout(() => router.push("/login"), 3000)
      } else {
        setErro(data.mensagem || "Erro ao resetar senha!")
      }
    } catch (error) {
      setErro("Erro ao conectar com o servidor!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-[#060b14] px-4"
      style={{
        background: "radial-gradient(ellipse at 25% 60%, rgba(99,102,241,.18) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(139,92,246,.12) 0%, transparent 50%), #060b14"
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

        {!sucesso ? (
          <>
            <div className="text-center mb-7">
              <h2 className="text-2xl font-bold text-slate-100">Nova senha 🔒</h2>
              <p className="text-slate-500 text-sm mt-2">Digite sua nova senha abaixo</p>
            </div>

            <div className="h-px bg-slate-800 mb-7" />

            {erro && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm px-4 py-3 rounded-xl mb-5">
                ⚠️ {erro}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Nova senha
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600">🔑</span>
                <input
                  name="novaSenha"
                  type={mostrarSenha ? "text" : "password"}
                  value={form.novaSenha}
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

            <div className="mb-6">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Confirmar nova senha
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600">🔒</span>
                <input
                  name="confirmarSenha"
                  type={mostrarSenha ? "text" : "password"}
                  value={form.confirmarSenha}
                  onChange={handleChange}
                  placeholder="Repita a nova senha"
                  className="w-full bg-[#080e1a] border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-slate-200 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>
            </div>

            <button
              onClick={handleResetar}
              disabled={loading}
              className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/30 hover:-translate-y-0.5"
            >
              {loading ? "Salvando..." : "Salvar nova senha →"}
            </button>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-3xl mx-auto mb-5">
              ✅
            </div>
            <h2 className="text-xl font-bold text-slate-100 mb-2">Senha alterada!</h2>
            <p className="text-slate-500 text-sm mb-6">
              Sua senha foi alterada com sucesso! Redirecionando para o login...
            </p>
          </div>
        )}

        <p className="text-center text-sm text-slate-500 mt-6">
          <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
            ← Voltar para o login
          </Link>
        </p>

      </div>
    </main>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  )
}

