"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function EnviarMaterialPage() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [mensagem, setMensagem] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar logado.");
      router.push("/login");
      return;
    }

    try {
      const response = await fetch("https://back-web-o13t.onrender.com/api/materials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, url }),
      });

      if (response.ok) {
        setMensagem("Material enviado com sucesso!");
        setTitle("");
        setUrl("");
      } else {
        const res = await response.json();
        setMensagem(res.error || "Erro ao enviar material");
      }
    } catch (err) {
      setMensagem("Erro de rede");
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Enviar Material de Apoio</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-2 rounded mt-1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">URL do material</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full border p-2 rounded mt-1"
              required
            />
          </div>
            <div className="flex gap-4">
            <Button 
              type="button" 
              onClick={() => router.back()} 
              className="bg-gray-500 text-white hover:bg-gray-600"
            >
              Voltar
            </Button>
            <Button type="submit" className="bg-black text-white hover:bg-gray-800">
              Enviar
            </Button>
            </div>
        </form>

        {mensagem && <p className="mt-4 text-green-600">{mensagem}</p>}
      </div>
    </div>
  );
}
