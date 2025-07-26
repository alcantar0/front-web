"use client"

import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar/navbar"
import Footer from "@/components/footer/footer";
import Image from "next/image";
import { useState, useEffect } from "react";
import image from "../../public/images/hero-bg.png";

export default function SupportMaterialPage() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    document.body.style.overflow = 'hidden';
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Navbar />

      {/* Conteúdo da página */}
      <main className="container mx-auto px-4 py-8">
        
        <div className="space-y-8">
          <h1 className="text-3xl font-bold text-left">Eventos</h1>
          <p className="text-gray-600">
            Aqui você pode encontrar informações sobre eventos passados e futuros.
          </p>
          
          {/* Upcoming Events Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Próximos Eventos</h2>
            <div 
              className={`pb-4 transition-all duration-300 custom-scrollbar ${
                isHovered ? 'overflow-x-auto' : 'overflow-x-hidden'
              }`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onWheel={(e) => {
                if (isHovered) {
                  e.preventDefault();
                  e.stopPropagation();
                  e.currentTarget.scrollLeft += e.deltaY;
                }
              }}
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              <div className="flex space-x-4 min-w-max">
                {/* Example upcoming events - replace with actual data */}
                {[1, 2, 3].map((item) => (
                  <div 
                    key={`upcoming-${item}`} 
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow flex-shrink-0 w-80"
                  >
                    <div className="flex flex-col h-full">
                      <div>
                        <h3 className="font-bold">Workshop de React</h3>
                        <p className="text-gray-600">15 de Dezembro, 2023 • 14:00</p>
                        <Image
                          src={image}
                          alt="Workshop de React"
                          width={300}
                          height={200}
                          className="mt-2 rounded-lg"
                        />
                        <p className="mt-2">Aprenda os fundamentos do React e construa sua primeira aplicação.</p>
                      </div>
                      <div className="mt-auto">
                        <div className="mt-2 text-sm text-gray-500 mb-2">Local: Centro de Convenções</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Past Events Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Eventos Passados</h2>
            <div 
              className={`pb-4 transition-all duration-300 custom-scrollbar ${
                isHovered ? 'overflow-x-auto' : 'overflow-x-hidden'
              }`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onWheel={(e) => {
                if (isHovered) {
                  e.preventDefault();
                  e.stopPropagation();
                  e.currentTarget.scrollLeft += e.deltaY;
                }
              }}
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              <div className="flex space-x-4 min-w-max">
                {/* Example upcoming events - replace with actual data */}
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                  <div 
                    key={`upcoming-${item}`} 
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow flex-shrink-0 w-80"
                  >
                    <div className="flex flex-col h-full">
                      <div>
                        <h3 className="font-bold">Workshop de React</h3>
                        <p className="text-gray-600">15 de Dezembro, 2023 • 14:00</p>
                        <Image
                          src={image}
                          alt="Workshop de React"
                          width={300}
                          height={200}
                          className="mt-2 rounded-lg"
                        />
                        <p className="mt-2">Aprenda os fundamentos do React e construa sua primeira aplicação.</p>
                      </div>
                      <div className="mt-auto">
                        <div className="mt-2 text-sm text-gray-500 mb-2">Local: Centro de Convenções</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          
        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}