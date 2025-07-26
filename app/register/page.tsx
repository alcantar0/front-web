"use client"

import type React from "react"
import Image from "next/image"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CadastroPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    dataNascimento: "",
    email: "",
    senha: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)

  try {
    const response = await fetch("https://back-web-o13t.onrender.com/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        nome_completo: formData.nomeCompleto,
        password: formData.senha,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      alert(data.error || "Erro no cadastro")
      return
    }

    alert("Cadastro realizado com sucesso!")
    router.push("/login")
  } catch (error) {
    console.error("Erro ao cadastrar:", error)
    alert("Erro na conexão com a API")
  } finally {
    setIsLoading(false)
  }
}

  return (
    <div className="min-h-screen flex">
      {/* Lado esquerdo - Formulário */}
      <div className="flex-1 flex flex-col p-8 bg-white">
        {/* Logo no topo */}
        <div className="flex items-center mb-8">
          <Image src="/images/logo.png" alt="Logo" width={40} height={40} className="mr-2" />
          <Link href="/" className="text-xl font-bold">
            <span className="text-xl font-bold">ApoiaUFC</span>
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-xl">
            <h1 className="text-4xl font-bold text-black mb-6">Cadastrar</h1>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Descubra uma plataforma projetada para facilitar sua jornada acadêmica.
              <br />
              Conecte-se, aprenda e compartilhe com outros alunos.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nomeCompleto" className="block text-black font-medium mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="nomeCompleto"
                  name="nomeCompleto"
                  value={formData.nomeCompleto}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="dataNascimento" className="block text-black font-medium mb-2">
                  Data de Nascimento
                </label>
                <input
                  type="date"
                  id="dataNascimento"
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-black font-medium mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="senha" className="block text-black font-medium mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  value={formData.senha}
                  onChange={handleInputChange}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:border-gray-600 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Cadastrando..." : "Cadastrar"}
              </button>
            </form>

            <p className="text-center mt-6 text-gray-600">
              Já tem uma conta, clique em{" "}
              <Link href="/login" className="text-blue-500 hover:text-blue-600 transition-colors">
                Entrar
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Lado direito - Imagem */}
      <div className="flex-1 bg-gray-300 flex items-center justify-center">
        <img
          src="images/hero-bg.png"
          alt="Imagem Hero"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}
