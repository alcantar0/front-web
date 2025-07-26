"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link"
import Navbar from "@/components/navbar/navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
          <div className="max-w-xl mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Bem-vindo ao seu novo espaço de aprendizado!</h1>
            <p className="text-gray-600 mb-6">
              Descubra uma plataforma projetada para facilitar sua jornada acadêmica. Conecte-se, aprenda e compartilhe com outros alunos.
            </p>
            <div className="flex space-x-4">
              <Link href="/login">
                <Button className="bg-black text-white hover:bg-gray-800">Entrar</Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" className="border-gray-400">Cadastrar</Button>
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/2 h-64 bg-gray-200 rounded-xl flex items-center justify-center">
            <Image src="/images/hero-bg.png" alt="Hero" width={400} height={300} className="object-cover rounded-xl" />
          </div>
        </div>
      </section>
    </div>
  );
}