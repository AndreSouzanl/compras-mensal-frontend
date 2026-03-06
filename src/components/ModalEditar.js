'use client'

import { useState, useEffect } from "react"

export default function ModalEditar({ item, onFechar, onSalvar }) {
  const [form, setForm] = useState({
    nome: "",
    quantidade: "",
    descricao: "",
    unidade: "kg",
  })
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState("")

  useEffect(() => {
    if (item) {
      setForm({
        nome: item.nome,
        quantidade: item.quantidade,
        descricao: item.descricao || "",
        unidade: item.unidade,
      })
    }
  }, [item])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErro("")
  }

  async function handleSalvar() {
    if (!form.nome || !form.quantidade) {
      setErro("Nome e quantidade são obrigatórios!")
      return
    }
    setLoading(true)
    try {
      await onSalvar(item.id, {
        nome: form.nome,
        descricao: form.descricao,
        quantidade: Number(form.quantidade),
        unidade: form.unidade,
      })
      onFechar()
    } catch (error) {
      setErro("Erro ao salvar produto!")
    } finally {
      setLoading(false)
    }
  }

  if (!item) return null

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={onFechar}
        className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm"
      />

      {/* MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#0d1117] border border-slate-800 rounded-2xl p-6 shadow-2xl">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-bold text-slate-100">✏️ Editar Produto</h2>
            <button
              onClick={onFechar}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 flex items-center justify-center transition-all"
            >
              ✕
            </button>
          </div>

          {/* ERRO */}
          {erro && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs px-4 py-2.5 rounded-xl mb-4">
              ⚠️ {erro}
            </div>
          )}

          {/* CAMPOS */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Nome do Produto
              </label>
              <input
                name="nome"
                value={form.nome}
                onChange={handleChange}
                className="w-full bg-[#060b14] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Quantidade
                </label>
                <input
                  name="quantidade"
                  type="number"
                  value={form.quantidade}
                  onChange={handleChange}
                  className="w-full bg-[#060b14] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Unidade
                </label>
                <select
                  name="unidade"
                  value={form.unidade}
                  onChange={handleChange}
                  className="w-full bg-[#060b14] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                >
                  <option value="kg">kg</option>
                  <option value="un">un</option>
                  <option value="L">L</option>
                  <option value="g">g</option>
                  <option value="cx">cx</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Descrição / Marca
              </label>
              <input
                name="descricao"
                value={form.descricao}
                onChange={handleChange}
                placeholder="Ex: Tio João, Tipo 1"
                className="w-full bg-[#060b14] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>
          </div>

          {/* BOTÕES */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={onFechar}
              className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-all"
            >
              Cancelar
            </button>
            <button
              onClick={handleSalvar}
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white text-sm font-bold transition-all"
            >
              {loading ? "Salvando..." : "💾 Salvar"}
            </button>
          </div>

        </div>
      </div>
    </>
  )
}