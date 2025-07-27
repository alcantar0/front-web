'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronDown } from "lucide-react";
import Image from "next/image";


import { useRouter } from 'next/navigation'
import Navbar from '@/components/navbar/navbar';

interface Question {
  id: number
  title: string
  body: string
  created_at: string
}

export default function ForumPage() {
  const router = useRouter()

  const hasRun = useRef(false) 

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true

    const token = localStorage.getItem('token')

    if (!token) {
      alert('É preciso estar logado antes')
      router.push('/login')
    }
  }, [])

  const [questions, setQuestions] = useState<Question[]>([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [error, setError] = useState('')

  const fetchQuestions = async () => {
    const res = await fetch('https://back-web-o13t.onrender.com/api/questions')
    const data = await res.json()
    setQuestions(data)
  }

  const createQuestion = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('https://back-web-o13t.onrender.com/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, body }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        setError(errorData.error || 'Erro ao criar pergunta')
        return
      }

      setTitle('')
      setBody('')
      fetchQuestions()
    } catch {
      setError('Erro ao conectar com a API')
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  return (

    <div className="min-h-screen bg-white">
    {/* Header */}
    <Navbar />

    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Fórum de Perguntas</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Nova Pergunta</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Título"
          className="border p-2 w-full mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Descreva sua pergunta"
          className="border p-2 w-full mb-2"
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <Button onClick={createQuestion} className="bg-black text-white">
          Publicar
        </Button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Perguntas Recentes</h2>
        {questions.map((q) => (
          <div key={q.id} className="border p-4 rounded mb-4">
            <Link href={`/forum/${q.id}`}>
              <h3 className="text-lg font-bold text-blue-600 hover:underline">
                {q.title}
              </h3>
            </Link>
            <p className="text-gray-700">{q.body}</p>
            <p className="text-sm text-gray-500">{new Date(q.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}
