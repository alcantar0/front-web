import Image from "next/image"

export default function Footer() {
    return (
        <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            <div className="flex items-center mb-6 md:mb-0">
              <Image src="/images/logo.png" alt="Sistema de Apoio a Calouros" width={32} height={32} className="mr-2" />
              <span className="text-xl font-bold">Apoio Calouros</span>
            </div>
          </div>

          <hr className="border-gray-200 mb-8" />

          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <div className="flex flex-wrap gap-6 mb-4 md:mb-0">
              <a href="#" className="hover:text-gray-900">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-gray-900">
                Termos de Serviço
              </a>
              <a href="#" className="hover:text-gray-900">
                Configurações de Cookies
              </a>
            </div>
            <div>© 2025 Relante. Todos os direitos reservados.</div>
          </div>
        </div>
      </footer>
    );
}