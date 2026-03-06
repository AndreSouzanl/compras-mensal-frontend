# 📚 ComprasMensal — Diário de Aprendizado

> Projeto desenvolvido com Next.js + Tailwind CSS  
> Professor: Claude AI | Aluno: Andre (DevSouza)

---

## 🗂 Índice

- [Módulo 1 — Setup](#módulo-1--setup)
- [Módulo 2 — Login](#módulo-2--login)
- [Módulo 3 — Layout Base](#módulo-3--layout-base)
- [Conceitos Aprendidos](#-conceitos-aprendidos)

---

## Módulo 1 — Setup

### Criando o projeto

```bash
npx create-next-app@latest compras-mensal
```

Opções escolhidas:
- TypeScript → **No** (usamos JavaScript)
- ESLint → **Yes**
- Tailwind CSS → **Yes**
- src/ directory → **Yes**
- App Router → **Yes**
- import alias → **No**

### Dependências instaladas

```bash
npm install lucide-react clsx tailwind-merge
```

| Pacote | Por quê |
|---|---|
| `lucide-react` | Ícones modernos e leves |
| `clsx` | Combina classes condicionalmente |
| `tailwind-merge` | Evita conflito de classes Tailwind |

### globals.css — Tailwind v4

No Tailwind v4 (que vem com Next.js mais recente), a sintaxe mudou.

```css
/* ✅ Tailwind v4 — correto */
@import "tailwindcss";

/* ❌ Tailwind v3 — obsoleto */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Utilitário cn()

Arquivo: `src/lib/utils.js`

```js
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
```

**Por que usar cn()?**

```js
// ❌ Sem cn() — confuso e com risco de conflito
className={"btn " + (ativo ? "bg-blue-500" : "bg-gray-500")}

// ✅ Com cn() — limpo e seguro
className={cn("btn", ativo ? "bg-blue-500" : "bg-gray-500")}
```

Resolve conflito de classes automaticamente:
```js
cn("p-4", "p-2")  // → retorna "p-2" ✅
```

### Estrutura de rotas — App Router

No Next.js App Router cada pasta vira uma rota automaticamente:

```
src/app/page.js        →  localhost:3000/
src/app/login/page.js  →  localhost:3000/login
src/app/dashboard/page.js → localhost:3000/dashboard
```

---

## Módulo 2 — Login

Arquivo: `src/app/login/page.js`

### Classes Tailwind usadas

| Classe | O que faz |
|---|---|
| `min-h-screen` | Altura mínima = 100% da tela |
| `flex` | Ativa o flexbox |
| `items-center` | Centraliza verticalmente |
| `justify-center` | Centraliza horizontalmente |
| `bg-[#060b14]` | Cor de fundo customizada (valor livre) |
| `max-w-md` | Largura máxima média (448px) |
| `rounded-2xl` | Bordas bem arredondadas |
| `border border-slate-800` | Borda fina cinza escura |
| `focus:border-indigo-500` | Borda roxa ao focar o input |
| `focus:ring-2` | Anel de foco ao redor do input |
| `transition-all` | Anima todas as mudanças de estilo |
| `hover:-translate-y-0.5` | Sobe levemente no hover |

### Link do Next.js vs tag `<a>`

```js
// ✅ Use Link do Next.js — navegação sem recarregar a página
import Link from "next/link"
<Link href="/login">Ir para o Login</Link>

// ❌ Evite <a> para rotas internas — recarrega a página
<a href="/login">Ir para o Login</a>
```

### Gradiente de fundo

```js
// Gradiente customizado via style inline
style={{
  background: "radial-gradient(ellipse at 25% 60%, rgba(99,102,241,.18) 0%, transparent 55%)"
}}
```

### Gradiente no botão com Tailwind

```js
className="bg-gradient-to-r from-indigo-600 to-purple-600 
           hover:from-indigo-500 hover:to-purple-500"
```

### Posicionamento do ícone no input

```js
// Ícone absoluto dentro de um container relativo
<div className="relative">
  <span className="absolute left-3 top-1/2 -translate-y-1/2">✉️</span>
  <input className="pl-10" />  {/* padding-left para não sobrepor o ícone */}
</div>
```

---

## Módulo 3 — Layout Base

### Estrutura de arquivos

```
src/
  app/
    dashboard/
      page.js     ← conteúdo da página
      layout.js   ← sidebar + topbar envolvendo a página
  components/
    Sidebar.js    ← navegação lateral
    Topbar.js     ← barra superior
```

### Por que usar layout.js?

O `layout.js` envolve todas as páginas dentro da pasta.
Assim a Sidebar e Topbar aparecem em **todas as páginas do dashboard**
sem precisar repetir código.

```
dashboard/layout.js  →  aplica sidebar+topbar em:
  dashboard/page.js
  dashboard/lista/page.js
  dashboard/produtos/page.js
  ... todas as subpáginas
```

### 'use client' — quando usar?

```js
'use client'  // ← adiciona no topo do arquivo
```

Necessário quando o componente usa:
- Hooks do React (`useState`, `useEffect`, `usePathname`...)
- Eventos do navegador (`onClick`, `onChange`...)
- Qualquer interatividade

Por padrão no App Router tudo é **Server Component**.
Só adiciona `use client` quando precisar!

### usePathname() — detectar rota ativa

```js
import { usePathname } from "next/navigation"

const pathname = usePathname()
// retorna a rota atual ex: "/dashboard" ou "/dashboard/lista"
```

Usado para destacar o item ativo no menu da sidebar.

### cn() destacando item ativo do menu

```js
className={cn(
  // Classes que SEMPRE aparecem
  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all",

  // Classes condicionais — muda conforme a rota
  pathname === item.href
    ? "bg-indigo-500/15 text-indigo-400 font-semibold"  // ativo
    : "text-slate-500 hover:bg-slate-800 hover:text-slate-200" // inativo
)}
```

### Responsividade — Sidebar mobile

```js
// A sidebar some no mobile e aparece só no desktop
className="hidden lg:flex"
```

| Classe | Breakpoint | O que faz |
|---|---|---|
| `hidden` | todos | `display: none` |
| `lg:flex` | ≥ 1024px | `display: flex` |

### Breakpoints do Tailwind

| Prefixo | Tamanho | Dispositivo |
|---|---|---|
| *(sem prefixo)* | 0px+ | Mobile primeiro |
| `sm:` | 640px+ | Celular grande |
| `md:` | 768px+ | Tablet |
| `lg:` | 1024px+ | Desktop |
| `xl:` | 1280px+ | Desktop grande |

> 💡 Tailwind é **mobile-first** — as classes sem prefixo valem para mobile,
> e os prefixos sobrescrevem em telas maiores.

---

## 💡 Conceitos Aprendidos

### Paleta de cores do projeto

| Cor | Uso |
|---|---|
| `bg-[#060b14]` | Fundo geral da página |
| `bg-[#0a0f1a]` | Fundo da sidebar e topbar |
| `bg-[#0d1117]` | Fundo dos cards |
| `border-slate-800` | Bordas e divisores |
| `text-slate-100` | Textos principais |
| `text-slate-500` | Textos secundários |
| `indigo-500` / `purple-600` | Cor primária / destaque |

### Opacidade de cores no Tailwind v3+

```js
bg-indigo-500/15   // fundo indigo com 15% de opacidade
text-indigo-400/80 // texto indigo com 80% de opacidade
shadow-indigo-500/30 // sombra indigo com 30% de opacidade
```

### Shadow com cor

```js
className="shadow-lg shadow-indigo-500/30"
// sombra grande + sombra na cor indigo com 30% opacidade
```

---

*Atualizado conforme o projeto avança* 🚀

---

## Topbar — `src/components/Topbar.js`

### Mapeando rotas para títulos

Em vez de vários `if/else`, usamos um objeto como dicionário:

```js
const pageTitles = {
  "/dashboard": { title: "Dashboard", crumb: "Início" },
  "/dashboard/lista": { title: "Lista de Compras", crumb: "Lista" },
  "/dashboard/produtos": { title: "Produtos", crumb: "Produtos" },
}

const page = pageTitles[pathname] || { title: "Dashboard", crumb: "Início" }
//                                 ↑ fallback se a rota não existir
```

### Breadcrumb

Mostra onde o usuário está na navegação:

```js
Início / <span className="text-indigo-400">{page.crumb}</span>
//        ↑ página atual destacada em roxo
```

### Badge com efeito glassmorphism

Técnica de 3 camadas para criar badges elegantes:

```js
className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
```

| Classe | O que faz |
|---|---|
| `bg-emerald-500/10` | Fundo verde com 10% de opacidade |
| `text-emerald-400` | Texto verde |
| `border border-emerald-500/20` | Borda verde com 20% de opacidade |

> 💡 Essa técnica funciona para qualquer cor — troca `emerald` por `indigo`, `rose`, `amber`...

### Conflito hidden + flex — como resolver com cn()

```js
// ❌ Conflito — o editor reclama
className="flex hidden lg:flex"

// ✅ Correto — usa cn() e remove o flex solto
className={cn("flex-col hidden lg:flex")}
// O lg:flex já ativa o display:flex no desktop
// O flex-col define a direção quando ativar
```


---

## Módulo 4 — Dashboard (Cards, Formulário, Tabela)

### Estrutura de componentes

```
src/components/
  StatsCards.js   ← cards de estatísticas
  FormProduto.js  ← formulário de adicionar produto
  TabelaItens.js  ← tabela com busca, status e ações
```

### Por que separar em componentes?

```
❌ Tudo em page.js — difícil de manter, arquivo gigante
✅ Componentes separados — cada um com sua responsabilidade
```

Cada componente faz uma coisa só e pode ser reutilizado em qualquer página.

---

### StatsCards.js

#### Array de objetos para renderizar cards

Em vez de repetir HTML 4 vezes, criamos um array e usamos `.map()`:

```js
const stats = [
  { icon: "🛒", label: "Total na Lista", value: "12", chip: "12 itens", chipColor: "bg-indigo-500/10 text-indigo-400", iconBg: "bg-indigo-500/10" },
  { icon: "✅", label: "Comprados", value: "9", chip: "75%", chipColor: "bg-emerald-500/10 text-emerald-400", iconBg: "bg-emerald-500/10" },
  // ...
]

// Renderizando com map()
{stats.map((stat, index) => (
  <div key={index}>...</div>
))}
```

> 💡 O `key` é obrigatório no `.map()` — o React usa para identificar cada elemento.

#### Grid responsivo dos cards

```js
className="grid grid-cols-2 lg:grid-cols-4 gap-4"
```

| Breakpoint | Colunas |
|---|---|
| Mobile | 2 colunas |
| Desktop (lg) | 4 colunas |

#### Hover na borda do card

```js
className="hover:border-indigo-500/30 transition-all"
// borda fica roxa suave ao passar o mouse
```

---

### FormProduto.js

#### useState para controlar o formulário

```js
const [form, setForm] = useState({
  nome: "",
  quantidade: "",
  descricao: "",
  unidade: "kg",
})
```

#### handleChange — atualiza qualquer campo com uma função só

```js
function handleChange(e) {
  setForm({ ...form, [e.target.name]: e.target.value })
  //        ↑ spread mantém os outros campos
  //                  ↑ [name] atualiza só o campo que mudou
}

// Uso no input — name deve bater com a chave do estado
<input name="nome" value={form.nome} onChange={handleChange} />
<input name="quantidade" value={form.quantidade} onChange={handleChange} />
```

> 💡 Com `[e.target.name]` uma função só serve para todos os campos!

#### Grid responsivo do formulário

```js
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"
```

| Breakpoint | Colunas |
|---|---|
| Mobile | 1 coluna |
| Tablet (md) | 2 colunas |
| Desktop (lg) | 4 colunas |

#### Ocupar mais de uma coluna

```js
className="lg:col-span-2"
// campo ocupa 2 colunas no desktop
```

---

### TabelaItens.js

#### useState para lista de itens

```js
const [itens, setItens] = useState(itensIniciais)
const [busca, setBusca] = useState("")
```

#### Filtrar itens pela busca

```js
const itensFiltrados = itens.filter(item =>
  item.nome.toLowerCase().includes(busca.toLowerCase())
)
// toLowerCase() garante busca sem diferenciar maiúsculas/minúsculas
```

#### Marcar como comprado — imutabilidade

```js
function toggleComprado(id) {
  setItens(itens.map(item =>
    item.id === id
      ? { ...item, comprado: !item.comprado }  // inverte o status
      : item                                    // mantém os outros
  ))
}
```

> 💡 Nunca modifique o estado diretamente! Sempre crie uma nova cópia com `.map()` ou spread `...`

#### Remover item

```js
function removerItem(id) {
  setItens(itens.filter(item => item.id !== id))
  // filter retorna novo array sem o item removido
}
```

#### cn() no status — cores condicionais

```js
className={cn(
  "flex items-center gap-1.5 text-xs font-semibold",
  item.comprado ? "text-emerald-400" : "text-yellow-400"
)}
// verde se comprado, amarelo se pendente
```

#### Tabela desktop vs Cards mobile

```js
{/* Tabela — visível só no desktop */}
<div className="hidden md:block">
  <table>...</table>
</div>

{/* Cards — visível só no mobile */}
<div className="md:hidden">
  {itens.map(...)}
</div>
```

| Classe | Breakpoint | O que faz |
|---|---|---|
| `hidden md:block` | ≥ 768px | Mostra a tabela no desktop |
| `md:hidden` | < 768px | Mostra os cards no mobile |

#### Paginação com cn()

```js
{[1, 2, 3].map((n) => (
  <button className={cn(
    "w-7 h-7 rounded-lg text-xs font-bold transition-all",
    n === 1
      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white" // ativo
      : "bg-slate-800 text-slate-500 hover:bg-slate-700"            // inativo
  )}>
    {n}
  </button>
))}
```

---

## 📐 Padrões de Responsividade do Projeto

| Elemento | Mobile | Tablet (md) | Desktop (lg) |
|---|---|---|---|
| Sidebar | `hidden` | `hidden` | `flex` |
| Bottom Nav | `flex` | `flex` | `hidden` |
| Stats Grid | 2 colunas | 2 colunas | 4 colunas |
| Form Grid | 1 coluna | 2 colunas | 4 colunas |
| Tabela | Cards | Tabela | Tabela |

---

## 🧩 Padrões Reutilizáveis

### Input padrão do projeto

```js
className="w-full bg-[#060b14] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-700"
```

### Botão primário

```js
className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5"
```

### Card padrão

```js
className="bg-[#0d1117] border border-slate-800 rounded-2xl p-5 hover:border-indigo-500/30 transition-all"
```

### Badge de status

```js
// Verde — comprado
className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"

// Amarelo — pendente
className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"

// Roxo — destaque
className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/15"
```

---

*Atualizado em 05/03/2026 🚀*

---

## Módulo 5 — Responsividade Mobile

### O problema — como compartilhar estado entre componentes?

```
Topbar → precisa de toggleMenu()
Sidebar → precisa de isOpen e fecharMenu()

❌ Sem Context — teria que passar props por vários componentes
✅ Com Context API — qualquer componente acessa direto!
```

### Context API — `src/context/SidebarContext.js`

```js
// 1. Cria o contexto
const SidebarContext = createContext()

// 2. Provider — envolve os componentes e compartilha o estado
export function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  // ...
  return (
    <SidebarContext.Provider value={{ isOpen, abrirMenu, fecharMenu, toggleMenu }}>
      {children}
    </SidebarContext.Provider>
  )
}

// 3. Hook personalizado — consome o contexto de forma limpa
export function useSidebar() {
  return useContext(SidebarContext)
}
```

#### Uso nos componentes

```js
// Topbar — pega só o toggleMenu
const { toggleMenu } = useSidebar()

// Sidebar — pega isOpen e fecharMenu
const { isOpen, fecharMenu } = useSidebar()
```

---

### Sidebar Mobile — drawer deslizante

#### Técnica de translate para abrir/fechar

```js
className={cn(
  "fixed top-0 left-0 h-full z-50 w-60 transition-transform duration-300",
  "lg:static lg:translate-x-0",           // desktop — sempre visível
  isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
  //         ↑ aberto            ↑ fechado (fora da tela para esquerda)
)}
```

| Estado | Mobile | Desktop |
|---|---|---|
| Fechado | `-translate-x-full` (fora da tela) | `translate-x-0` (sempre visível) |
| Aberto | `translate-x-0` (visível) | `translate-x-0` (sempre visível) |

#### Overlay — fundo escuro ao abrir

```js
{isOpen && (
  <div
    onClick={fecharMenu}
    className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
  />
)}
```

| Classe | O que faz |
|---|---|
| `fixed inset-0` | Ocupa a tela inteira |
| `bg-black/60` | Preto com 60% de opacidade |
| `z-40` | Fica atrás da sidebar (z-50) |
| `lg:hidden` | Some no desktop |
| `backdrop-blur-sm` | Desfoca o conteúdo atrás |

#### Fechar ao clicar em um link

```js
<Link href={item.href} onClick={fecharMenu}>
  {item.label}
</Link>
// ao navegar, o menu fecha automaticamente
```

---

### Topbar Mobile

#### Botão hamburguer — só no mobile

```js
<button
  onClick={toggleMenu}
  className="lg:hidden ..."  // some no desktop
>
  ☰
</button>
```

#### Texto adaptativo no botão

```js
<button>
  <span className="hidden sm:inline">＋ Novo Produto</span>
  <span className="sm:hidden">＋</span>
</button>
// mobile → só o "+"
// desktop → texto completo
```

#### Badge escondida no mobile

```js
<span className="hidden sm:inline-flex">
  ● Março 2026
</span>
// some no mobile, aparece no tablet+
```

---

### z-index — camadas da interface

| Elemento | z-index | Por quê |
|---|---|---|
| Conteúdo normal | auto | Base |
| Overlay (fundo escuro) | `z-40` | Acima do conteúdo |
| Sidebar mobile | `z-50` | Acima do overlay |

> 💡 Sempre que usar `fixed` ou `absolute`, pense nas camadas com z-index!

---

### Resumo — padrão mobile drawer

```
1. Estado isOpen no Context
2. Botão ☰ no Topbar chama toggleMenu()
3. Sidebar usa translate para deslizar
4. Overlay escurece o fundo e fecha ao clicar
5. Links chamam fecharMenu() ao navegar
```

