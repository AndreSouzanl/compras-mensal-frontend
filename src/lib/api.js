const BASE_URL = process.env.NEXT_PUBLIC_API_URL

// ===== TOKEN =====
export function salvarToken(token) {
  localStorage.setItem("token", token)
}

export function pegarToken() {
  return localStorage.getItem("token")
}

export function removerToken() {
  localStorage.removeItem("token")
  localStorage.removeItem("usuario")
}

export function salvarUsuario(usuario) {
  localStorage.setItem("usuario", JSON.stringify(usuario))
}

export function pegarUsuario() {
  if (typeof window === "undefined") return null
  const usuario = localStorage.getItem("usuario")
  return usuario ? JSON.parse(usuario) : null
}

// ===== AUTH =====
export async function login(email, senha) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  })
  return res.json()
}

// ===== PRODUTOS =====
export async function getProdutos() {
  const token = pegarToken()
  const res = await fetch(`${BASE_URL}/produtos`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.json()
}

export async function cadastrarProduto(dados) {
  const token = pegarToken()
  const res = await fetch(`${BASE_URL}/produtos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dados),
  })
  return res.json()
}

export async function atualizarStatusProduto(id, status) {
  const token = pegarToken()
  const res = await fetch(`${BASE_URL}/produtos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  })
  return res.json()
}

export async function deletarProduto(id) {
  const token = pegarToken()
  const res = await fetch(`${BASE_URL}/produtos/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.json()
}

export async function atualizarProduto(id, dados) {
  const token = pegarToken()
  const res = await fetch(`${BASE_URL}/produtos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dados),
  })
  return res.json()
}