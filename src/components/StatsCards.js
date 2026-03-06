'use client'

import { useState, useEffect, useImperativeHandle, forwardRef } from "react"
import { getProdutos } from "@/lib/api"

const StatsCards = forwardRef((props, ref) => {
  const [stats, setStats] = useState({
    total: 0,
    comprados: 0,
    pendentes: 0,
    porcentagem: 0,
  })
  const [loading, setLoading] = useState(true)

  useImperativeHandle(ref, () => ({
    recarregar: carregarStats
  }))

  useEffect(() => {
    carregarStats()
  }, [])

  async function carregarStats() {
    try {
      const produtos = await getProdutos()
      const total = produtos.length
      const comprados = produtos.filter(p => p.status === "comprado").length
      const pendentes = produtos.filter(p => p.status === "ativo").length
      const porcentagem = total > 0 ? Math.round((comprados / total) * 100) : 0
      setStats({ total, comprados, pendentes, porcentagem })
    } catch (error) {
      console.error("Erro ao carregar stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const cards = [
    {
      icon: "🛒",
      label: "Total na Lista",
      value: stats.total,
      chip: `${stats.total} itens`,
      chipColor: "bg-indigo-500/10 text-indigo-400",
      iconBg: "bg-indigo-500/10",
    },
    {
      icon: "✅",
      label: "Comprados",
      value: stats.comprados,
      chip: `${stats.porcentagem}%`,
      chipColor: "bg-emerald-500/10 text-emerald-400",
      iconBg: "bg-emerald-500/10",
    },
    {
      icon: "⏳",
      label: "Pendentes",
      value: stats.pendentes,
      chip: `${100 - stats.porcentagem}%`,
      chipColor: "bg-yellow-500/10 text-yellow-400",
      iconBg: "bg-yellow-500/10",
    },
    {
      icon: "📊",
      label: "Progresso",
      value: `${stats.porcentagem}%`,
      chip: stats.porcentagem === 100 ? "Completo! 🎉" : "Em andamento",
      chipColor: stats.porcentagem === 100
        ? "bg-emerald-500/10 text-emerald-400"
        : "bg-rose-500/10 text-rose-400",
      iconBg: "bg-rose-500/10",
    },
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="bg-[#0d1117] border border-slate-800 rounded-2xl p-5 animate-pulse">
            <div className="w-10 h-10 rounded-xl bg-slate-800 mb-4" />
            <div className="w-16 h-8 rounded-lg bg-slate-800 mb-2" />
            <div className="w-24 h-3 rounded bg-slate-800" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-[#0d1117] border border-slate-800 rounded-2xl p-5 hover:border-indigo-500/30 transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${card.iconBg}`}>
              {card.icon}
            </div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${card.chipColor}`}>
              {card.chip}
            </span>
          </div>
          <div className="text-3xl font-extrabold text-slate-100 leading-none mb-1">
            {card.value}
          </div>
          <div className="text-xs text-slate-500 font-medium">
            {card.label}
          </div>
        </div>
      ))}
    </div>
  )
})
export default StatsCards