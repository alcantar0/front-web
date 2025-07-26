'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface Answer {
  id: number
  body: string
  votes: number
  created_at: string
}

interface Question {
  id: number
  title: string
  body: string
  created_at: string
}

export default function QuestionPage() {
    const router = useRouter()

  const params = useParams()
  const id = params.id as string

  const [question, setQuestion] = useState<Question | null>(null)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [newAnswer, setNewAnswer] = useState('')
  const [error, setError] = useState('')

  const fetchQuestion = async () => {
    const res = await fetch(`https://back-web-o13t.onrender.com/api/questions`)
    const data: Question[] = await res.json()
    const selected = data.find((q) => q.id === parseInt(id))
    setQuestion(selected || null)
  }

  const fetchAnswers = async () => {
    const res = await fetch(`https://back-web-o13t.onrender.com/api/questions/${id}/answers`)
    const data = await res.json()
    setAnswers(data)
  }

  const submitAnswer = async () => {
    setError('')
    const token = localStorage.getItem('token')
    if (!token) {
      setError('Você precisa estar logado para responder.')
      return
    }

    const res = await fetch(`https://back-web-o13t.onrender.com/api/questions/${id}/answers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ body: newAnswer }),
    })

    if (!res.ok) {
      const errorData = await res.json()
      setError(errorData.error || 'Erro ao enviar resposta')
      return
    }

    setNewAnswer('')
    fetchAnswers()
  }

const voteAnswer = async (answerId: number, vote: number) => {
  const token = localStorage.getItem('token')
  if (!token) {
    setError('Você precisa estar logado para votar.')
    return
  }

  const res = await fetch(`https://back-web-o13t.onrender.com/api/answers/${answerId}/vote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ vote }),
  })

  if (res.ok) {
    fetchAnswers()
  } else {
    const errData = await res.json()
    setError(errData.error || 'Erro ao votar')
  }
}

  useEffect(() => {
    fetchQuestion()
    fetchAnswers()
  }, [id])

  if (!question) return <p className="p-4">Carregando pergunta...</p>

  return (
        <div className="container mx-auto px-4 py-8">
    <Button
    variant="outline"
    className="mb-4"
    onClick={() => router.push('/forum')}
    >
    ← Voltar
    </Button>
      <h1 className="text-2xl font-bold mb-2">{question.title}</h1>
      <p className="text-gray-700 mb-6">{question.body}</p>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Responder</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <textarea
          placeholder="Digite sua resposta"
          className="border w-full p-2 mb-2"
          rows={4}
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
        />
        <Button onClick={submitAnswer} className="bg-black text-white">Enviar</Button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Respostas ({answers.length})</h2>
        {answers.map((a) => (
          <div key={a.id} className="border rounded p-4 mb-4">
            <p className="text-gray-800">{a.body}</p>
            <div className="flex items-center mt-2 text-sm text-gray-600 space-x-4">
              <span>{a.votes} votos</span>
              <button onClick={() => voteAnswer(a.id, 1)} className="hover:underline text-green-700">
                Upvote
              </button>
              {/* <button onClick={() => voteAnswer(a.id, -1)} className="hover:underline text-red-700">
                Downvote
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
