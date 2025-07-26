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
              <button 
                onClick={() => voteAnswer(a.id, 1)} 
                className={"flex items-center space-x-1 hover:opacity-80 transition-all"}
              >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="w-6 h-6"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                  </svg>
                <span className="hidden sm:inline">Curtir</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}