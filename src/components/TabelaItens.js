"use client";

import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { cn } from "@/lib/utils";
import {
  getProdutos,
  deletarProduto,
  atualizarStatusProduto,
  atualizarProduto,
} from "@/lib/api";
import ModalEditar from "@/components/ModalEditar";

const TabelaItens = forwardRef(({ onAtualizarStats }, ref) => {
  const [itens, setItens] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [itemEditando, setItemEditando] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 7;

  useImperativeHandle(ref, () => ({
    recarregar: carregarProdutos,
  }));

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    try {
      setLoading(true);

      const dados = await getProdutos();

      // ordenar alfabeticamente pelo nome
      const dadosOrdenados = dados.sort((a, b) => a.nome.localeCompare(b.nome));

      setItens(dadosOrdenados);
    } catch (error) {
      setErro("Erro ao carregar produtos!");
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleStatus(item) {
    const novoStatus = item.status === "comprado" ? "ativo" : "comprado";

    try {
      await atualizarStatusProduto(item.id, novoStatus);

      setItens((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, status: novoStatus } : i)),
      );

      // 🔥 atualiza os cards
      onAtualizarStats?.();
    } catch (error) {
      setErro("Erro ao atualizar status!");
    }
  }

  async function handleDeletar(id) {
    try {
      await deletarProduto(id);
      setItens(itens.filter((i) => i.id !== id));
    } catch (error) {
      setErro("Erro ao remover produto!");
    }
  }

  async function handleSalvarEdicao(id, dados) {
    try {
      await atualizarProduto(id, dados);
      setItens(itens.map((i) => (i.id === id ? { ...i, ...dados } : i)));
    } catch (error) {
      setErro("Erro ao atualizar produto!");
    }
  }

  const itensFiltrados = itens.filter((item) =>
    item.nome.toLowerCase().includes(busca.toLowerCase()),
  );
  const totalPaginas = Math.ceil(itensFiltrados.length / itensPorPagina);
  const indiceInicio = (paginaAtual - 1) * itensPorPagina;
  const indiceFim = indiceInicio + itensPorPagina;
  const itensPaginados = itensFiltrados.slice(indiceInicio, indiceFim);

  if (loading) {
    return (
      <div className="bg-[#0d1117] border border-slate-800 rounded-2xl p-10 flex items-center justify-center">
        <div className="text-slate-500 text-sm">⏳ Carregando produtos...</div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#0d1117] border border-slate-800 rounded-2xl overflow-hidden">
        {/* CABEÇALHO */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
          <h2 className="text-sm font-bold text-slate-200">
            🗂 Itens da Lista
          </h2>
          <div className="flex items-center gap-2 bg-[#060b14] border border-slate-800 rounded-xl px-3 py-2">
            <span className="text-slate-600 text-sm">🔍</span>
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar produto..."
              className="bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-700 w-36"
            />
          </div>
        </div>

        {/* ERRO */}
        {erro && (
          <div className="mx-5 mt-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm px-4 py-3 rounded-xl">
            ⚠️ {erro}
          </div>
        )}

        {/* LISTA VAZIA */}
        {itensPaginados.length === 0 && !loading && (
          <div className="p-10 text-center text-slate-600 text-sm">
            Nenhum produto encontrado 🛒
          </div>
        )}

        {/* TABELA DESKTOP */}
        {itensPaginados.length > 0 && (
          <div className="hidden md:block">
            <table className="w-full">
              <thead>
                <tr className="bg-[#060b14]">
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Produto
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Qtd
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Descrição
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Unidade
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {itensPaginados.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-slate-800/50 hover:bg-indigo-500/5 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <span className="font-semibold text-slate-100 text-sm">
                        {item.nome}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/15">
                        {item.quantidade}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-slate-400">
                      {item.descricao}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-slate-800 text-slate-400">
                        {item.unidade}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={cn(
                          "flex items-center gap-1.5 text-xs font-semibold w-fit",
                          item.status === "comprado"
                            ? "text-emerald-400"
                            : "text-yellow-400",
                        )}
                      >
                        <div
                          className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            item.status === "comprado"
                              ? "bg-emerald-400"
                              : "bg-yellow-400",
                          )}
                        />
                        {item.status === "comprado" ? "Comprado" : "Pendente"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setItemEditando(item)}
                          className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all text-xs flex items-center justify-center hover:scale-110"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDeletar(item.id)}
                          className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-all text-xs flex items-center justify-center hover:scale-110"
                        >
                          🗑
                        </button>
                        <button
                          onClick={() => handleToggleStatus(item)}
                          className={cn(
                            "w-7 h-7 rounded-lg text-xs flex items-center justify-center transition-all hover:scale-110",
                            item.status === "comprado"
                              ? "bg-slate-700 text-slate-400"
                              : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20",
                          )}
                        >
                          ✓
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* CARDS MOBILE */}
        {itensFiltrados.length > 0 && (
          <div className="md:hidden divide-y divide-slate-800">
            {itensPaginados.map((item) => (
              <div key={item.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-slate-100 text-sm">
                    {item.nome}
                  </span>
                  <span
                    className={cn(
                      "flex items-center gap-1.5 text-xs font-semibold",
                      item.status === "comprado"
                        ? "text-emerald-400"
                        : "text-yellow-400",
                    )}
                  >
                    <div
                      className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        item.status === "comprado"
                          ? "bg-emerald-400"
                          : "bg-yellow-400",
                      )}
                    />
                    {item.status === "comprado" ? "Comprado" : "Pendente"}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/15">
                    {item.quantidade}
                  </span>
                  <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-slate-800 text-slate-400">
                    {item.unidade}
                  </span>
                  <span className="text-xs text-slate-500">
                    {item.descricao}
                  </span>
                </div>
                <div className="flex gap-2 pt-2 border-t border-slate-800">
                  <button
                    onClick={() => setItemEditando(item)}
                    className="flex-1 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-semibold"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => handleDeletar(item.id)}
                    className="flex-1 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 text-xs font-semibold"
                  >
                    🗑 Excluir
                  </button>
                  <button
                    onClick={() => handleToggleStatus(item)}
                    className={cn(
                      "flex-1 py-1.5 rounded-lg text-xs font-semibold",
                      item.status === "comprado"
                        ? "bg-slate-700 text-slate-400"
                        : "bg-emerald-500/10 text-emerald-400",
                    )}
                  >
                    ✓ OK
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* RODAPÉ */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-800">
          <span className="text-xs text-slate-600">
            Mostrando {itensPaginados.length} de {itensFiltrados.length} itens
          </span>

          {totalPaginas > 1 && (
            <div className="flex gap-1">
              {/* Botão anterior */}
              <button
                onClick={() => setPaginaAtual((p) => Math.max(1, p - 1))}
                disabled={paginaAtual === 1}
                className="w-7 h-7 rounded-lg bg-slate-800 text-slate-500 hover:bg-slate-700 disabled:opacity-30 text-xs font-bold transition-all"
              >
                ←
              </button>

              {/* Números */}
              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(
                (n) => (
                  <button
                    key={n}
                    onClick={() => setPaginaAtual(n)}
                    className={cn(
                      "w-7 h-7 rounded-lg text-xs font-bold transition-all",
                      n === paginaAtual
                        ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white"
                        : "bg-slate-800 text-slate-500 hover:bg-slate-700",
                    )}
                  >
                    {n}
                  </button>
                ),
              )}

              {/* Botão próximo */}
              <button
                onClick={() =>
                  setPaginaAtual((p) => Math.min(totalPaginas, p + 1))
                }
                disabled={paginaAtual === totalPaginas}
                className="w-7 h-7 rounded-lg bg-slate-800 text-slate-500 hover:bg-slate-700 disabled:opacity-30 text-xs font-bold transition-all"
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MODAL EDITAR */}
      <ModalEditar
        item={itemEditando}
        onFechar={() => setItemEditando(null)}
        onSalvar={handleSalvarEdicao}
      />
    </>
  );
});

export default TabelaItens;
