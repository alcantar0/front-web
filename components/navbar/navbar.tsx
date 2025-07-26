"use client"
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"

export default function Navbar() {
    const router = useRouter()
    const [name, setName] = useState("Visitante");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedName = localStorage.getItem("name");
            setName(storedName || "Visitante");
        }
    }, []);

    return (
        <header className="bg-white border-b">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center">
                    <Image src="/images/logo.png" alt="Logo" width={40} height={40} className="mr-2" />
                    <Link href="/" className="text-xl font-bold">
                        ApoiaUFC
                    </Link>
                </div>
                <nav className="hidden md:flex items-center space-x-8">
                    <Link href="/" className="text-gray-600 hover:text-gray-900">Início</Link>
                    <Link href="/faq" className="text-gray-600 hover:text-gray-900">FAQ</Link>
                    <Link href="/forum" className="text-gray-600 hover:text-gray-900">Fórum</Link>
                    <div className="relative group">
                        <button 
                            className="text-gray-600 hover:text-gray-900 flex items-center"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            Mais Opções
                            <ChevronDown className="ml-1 h-4 w-4" />
                        </button>
                        
                        {isDropdownOpen && (
                            <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                <Link 
                                    href="/support-material" 
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    Materiais de Apoio
                                </Link>
                                <Link 
                                    href="/events" 
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    Eventos
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>
                {name === "Visitante" ? (
                    <Link href="/login">
                        <Button className="bg-black text-white hover:bg-gray-800">Entrar</Button>
                    </Link>
                ) : (
                    <div className="flex items-center">
                        <Button 
                            className="bg-white-600 text-black hover:bg-gray-100 transition-colors border border-gray-300"
                            onClick={() => router.push("/dashboard")}
                        >
                            Olá, {name}!
                        </Button>
                    </div>
                )}
            </div>
        </header>
    );
}