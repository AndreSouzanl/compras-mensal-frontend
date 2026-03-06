"use client";

import { useState } from "react";
import { cadastrarProduto } from "@/lib/api";

export default function FormProduto({ onProdutoAdicionado }) {
  const [form, setForm] = useState({
    nome: "",
    quantidade: "",
    descricao: "",
    unidade: "kg",
  });
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErro("");
    setSucesso("");
  }

  async function handleSubmit() {
    if (!form.nome || !form.quantidade) {
      setErro("Nome e quantidade são obrigatórios!");
      return;
    }

    setLoading(true);
    setErro("");
    setSucesso("");

    try {
      const resultado = await cadastrarProduto({
        nome: form.nome,
        descricao: form.descricao,
        quantidade: Number(form.quantidade),
        unidade: form.unidade,
      });

      if (
        resultado.mensagem?.includes("sucesso") ||
        resultado.mensagem?.includes("reativado")
      ) {
        setSucesso("Produto adicionado com sucesso! ✅");
        setForm({ nome: "", quantidade: "", descricao: "", unidade: "kg" });
        if (onProdutoAdicionado) onProdutoAdicionado();
      } else {
        setErro(resultado.mensagem || "Erro ao adicionar produto!");
      }
    } catch (error) {
      setErro("Erro ao conectar com o servidor!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#0d1117] border border-slate-800 rounded-2xl p-5 mb-6">
      <h2 className="text-sm font-bold text-slate-200 mb-4">
        ➕ Adicionar Produto
      </h2>

      {/* ERRO */}
      {erro && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs px-4 py-2.5 rounded-xl mb-4">
          ⚠️ {erro}
        </div>
      )}

      {/* SUCESSO */}
      {sucesso && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-4 py-2.5 rounded-xl mb-4">
          {sucesso}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <div className="lg:col-span-2">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Nome do Produto
          </label>
          <input
            name="nome"
            value={form.nome}
            onChange={handleChange}
            placeholder="Ex: Arroz Tio João"
            className="w-full bg-[#060b14] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-700"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Quantidade
          </label>
          <input
            name="quantidade"
            value={form.quantidade}
            onChange={handleChange}
            type="number"
            placeholder="0"
            className="w-full bg-[#060b14] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-700"
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

        <div className="lg:col-span-3">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Descrição / Marca
          </label>
          <input
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            placeholder="Ex: Tipo 1, 5kg"
            className="w-full bg-[#060b14] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-700"
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5"
          >
            {loading ? "Adicionando..." : "＋ Adicionar"}
          </button>
        </div>
      </div>
    </div>
  );
}
