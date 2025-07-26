"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar/navbar";
export default function SupportMaterialsPage() {
  const router = useRouter();

  const hasRun = useRef(false); // ⚠️ evitar múltiplas execuções

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const token = localStorage.getItem("token");

    if (!token) {
      alert("É preciso estar logado antes");
      router.push("/login");
    }
  }, []);
  type Material = {
    title: string;
    url: string;
    // add other properties if needed
  };

  const [materials, setMaterials] = useState<Material[]>([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      const res = await fetch(
        "https://back-web-o13t.onrender.com/api/materials"
      );
      const data = await res.json();
      setMaterials(data);
    };

    const token = localStorage.getItem("token");
    if (!token) {
      alert("É preciso estar logado antes");
      router.push("/login");
    } else {
      fetchMaterials();
    }
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <Navbar />

      {/* Hero */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Materiais de Apoio
            </h1>
            <div className="max-w-xl text-gray-600">
              <p className="mb-4">
                Aqui, você pode compartilhar e acessar materiais de apoio que
                enriquecem sua jornada acadêmica. Juntos, vamos construir uma
                comunidade colaborativa de aprendizado.
              </p>
              <div className="flex space-x-2">
                <Link href="/materiais/enviar">
                  <Button className="bg-black text-white hover:bg-gray-800 transition-colors mt-8">
                    Enviar
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lista de Materiais */}
      <section className="bg-white py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Materiais Disponíveis
          </h2>
          <ul className="space-y-4">
            {materials.map((item, index) => (
              <li
                key={index}
                className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 transition"
              >
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 no-underline text-lg font-medium hover:text-gray-900 transition-colors"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
