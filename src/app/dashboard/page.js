"use client";

import { useRef } from "react";
import StatsCards from "@/components/StatsCards";
import FormProduto from "@/components/FormProduto";
import TabelaItens from "@/components/TabelaItens";

export default function DashboardPage() {
  const tabelaRef = useRef(null);
  const statsRef = useRef(null);

  function handleProdutoAdicionado() {
    if (tabelaRef.current) tabelaRef.current.recarregar();
    if (statsRef.current) statsRef.current.recarregar();
  }

  return (
    <div>
      <StatsCards ref={statsRef} />
      <FormProduto onProdutoAdicionado={handleProdutoAdicionado} />
      <TabelaItens
        ref={tabelaRef}
        onAtualizarStats={() => statsRef.current?.recarregar()}
      />
    </div>
  );
}
