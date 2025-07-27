"use client"

import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar/navbar"
import Footer from "@/components/footer/footer";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface Event {
  id: number;
  titulo: string;
  descricao: string;
  palestrante: string;
  data_inicio: string;
  duracao_minutos: number;
  localizacao: string;
  imagem_url: string;
  criado_em: string;
}

export default function EventsPage() {
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredPast, setIsHoveredPast] = useState(false);
  const upcomingRef = useRef<HTMLDivElement>(null);
  const pastRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    document.body.style.overflow = 'hidden';
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    document.body.style.overflow = 'auto';
  };

  const handleMouseEnterPast = () => {
    setIsHoveredPast(true);
    document.body.style.overflow = 'hidden';
  };

  const handleMouseLeavePast = () => {
    setIsHoveredPast(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const upcomingElement = upcomingRef.current;
    const pastElement = pastRef.current;

    const handleWheelUpcoming = (e: WheelEvent) => {
      if (isHovered) {
        e.preventDefault();
        e.stopPropagation();
        upcomingElement!.scrollLeft += e.deltaY;
      }
    };

    const handleWheelPast = (e: WheelEvent) => {
      if (isHoveredPast) {
        e.preventDefault();
        e.stopPropagation();
        pastElement!.scrollLeft += e.deltaY;
      }
    };

    if (upcomingElement) {
      upcomingElement.addEventListener('wheel', handleWheelUpcoming, { passive: false });
    }

    if (pastElement) {
      pastElement.addEventListener('wheel', handleWheelPast, { passive: false });
    }

    return () => {
      document.body.style.overflow = 'auto';
      if (upcomingElement) {
        upcomingElement.removeEventListener('wheel', handleWheelUpcoming);
      }
      if (pastElement) {
        pastElement.removeEventListener('wheel', handleWheelPast);
      }
    };
  }, [isHovered, isHoveredPast]);

  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);

  const fetchNextEvents = async () => {
    const res = await fetch('https://back-web-o13t.onrender.com/api/events');
    const data = await res.json();

    setUpcomingEvents(data);
  };

  const fetchPastEvents = async () => {
    const res = await fetch('https://back-web-o13t.onrender.com/api/past-events');
    const data = await res.json();

    setPastEvents(data);
  };

  useEffect(() => {
    fetchNextEvents();
    fetchPastEvents();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        
        <div className="space-y-8">
          <h1 className="text-3xl font-bold text-left">Eventos</h1>
          <p className="text-gray-600">
            Aqui você pode encontrar informações sobre eventos passados e futuros.
          </p>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Próximos Eventos</h2>
            <div 
              ref={upcomingRef}
              className={`pb-4 transition-all duration-300 custom-scrollbar ${
                isHovered ? 'overflow-x-auto' : 'overflow-x-hidden'
              }`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                scrollbarWidth: 'none',
                scrollbarColor: '#cbd5e1 #f1f5f9'
              }}
            >
              <div className="flex space-x-4 min-w-max">
                {upcomingEvents.length === 0 ? (
                  <div className="text-gray-500">Nenhum evento futuro encontrado.</div>
                ) : (
                  upcomingEvents.map((item) => (
                    <div 
                      key={`upcoming-${item.id}`} 
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow flex-shrink-0 w-80"
                    >
                      <div className="flex flex-col h-full">
                        <div>
                          <h3 className="font-bold">{item.titulo}</h3>
                          <p className="text-gray-600">{new Date(item.data_inicio).toLocaleDateString()} • {new Date(item.data_inicio).toLocaleTimeString()}</p>
                          <p>Palestrante: {item.palestrante}</p>
                          <Image
                            src={item.imagem_url}
                            alt={item.titulo}
                            width={300}
                            height={200}
                            className="mt-2 rounded-lg"
                          />
                          <p className="mt-2">{item.descricao}</p>
                        </div>
                        <div className="mt-auto">
                          <div className="mt-2 text-sm text-gray-500 mb-2">Duração: {item.duracao_minutos} minutos</div>
                          <div className="mt-2 text-sm text-gray-500 mb-2">Local: {item.localizacao}</div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Eventos Passados</h2>
            <div 
              ref={pastRef}
              className={`pb-4 transition-all duration-300 custom-scrollbar ${
                isHoveredPast ? 'overflow-x-auto' : 'overflow-x-hidden'
              }`}
              onMouseEnter={handleMouseEnterPast}
              onMouseLeave={handleMouseLeavePast}
              style={{
                scrollbarWidth: 'none',
                scrollbarColor: '#cbd5e1 #f1f5f9'
              }}
            >
              <div className="flex space-x-4 min-w-max">
                {pastEvents.length === 0 ? (
                  <div className="text-gray-500">Nenhum evento passado encontrado.</div>
                ) : (
                  pastEvents.map((item) => (
                    <div 
                      key={`past-${item.id}`} 
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow flex-shrink-0 w-80"
                    >
                      <div className="flex flex-col h-full">
                        <div>
                          <h3 className="font-bold">{item.titulo}</h3>
                          <p className="text-gray-600">{new Date(item.data_inicio).toLocaleDateString()} • {new Date(item.data_inicio).toLocaleTimeString()}</p>
                          <p>Palestrante: {item.palestrante}</p>
                          <Image
                            src={item.imagem_url}
                            alt={item.titulo}
                            width={300}
                            height={200}
                            className="mt-2 rounded-lg"
                          />
                          <p className="mt-2">{item.descricao}</p>
                        </div>
                        <div className="mt-auto">
                          <div className="mt-2 text-sm text-gray-500 mb-2">Duração: {item.duracao_minutos} minutos</div>
                          <div className="mt-2 text-sm text-gray-500 mb-2">Local: {item.localizacao}</div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
          
        </div>

      </main>

      <Footer />
    </div>
  )
}