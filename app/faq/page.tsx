export const metadata = {
  title: 'FAQ - Apoio Calouros',
  description: 'Perguntas frequentes sobre o Sistema de Apoio a Calouros',
}

import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Image src="/images/logo.png" alt="Sistema de Apoio a Calouros" width={40} height={40} className="mr-2" />
            <span className="text-xl font-bold">Apoio Calouros</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Início
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              FAQ
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Forum
            </a>
            <div className="relative group">
              <button className="text-gray-600 hover:text-gray-900 flex items-center">
                Mais Opções
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>
          </nav>
          <Button className="bg-black text-white hover:bg-gray-800">Entrar</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gray-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.png"
            alt="Campus universitário"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Perguntas Frequentes</h1>
            <p className="text-lg text-gray-200">
              Encontre respostas rápidas e soluções para suas dúvidas sobre nossos serviços e conteúdos.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">FAQs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Encontre respostas para suas perguntas mais frequentes e tire suas dúvidas rapidamente.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium hover:no-underline">
                  Como me cadastrar?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  Para se cadastrar, clique no botão de registro na página inicial. Preencha os campos obrigatórios com
                  suas informações. Após isso, você receberá um e-mail de confirmação.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium hover:no-underline">
                  Como faço login?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  Para fazer login, acesse a página de login. Insira seu e-mail e senha cadastrados. Clique em 'Entrar'
                  para acessar sua conta.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium hover:no-underline">
                  Como acessar o calendário?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  O calendário acadêmico pode ser acessado na seção 'Calendário' do menu principal. Ele exibe todas as
                  datas importantes e eventos. Mantenha-se sempre atualizado!
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium hover:no-underline">
                  Como funciona o fórum?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  O fórum permite que você publique perguntas e respostas. Os usuários podem votar nas respostas mais
                  úteis. Participe e colabore com a comunidade!
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium hover:no-underline">
                  Onde encontro tutoriais?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  Os tutoriais estão disponíveis na seção 'Base de Conhecimento'. Você pode pesquisar por tópicos
                  específicos. Aproveite para aprender mais sobre nossos serviços!
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ainda tem dúvidas?</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">Entre em contato conosco para mais informações.</p>
          <Button variant="outline" className="px-8 bg-transparent">
            Contact
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            <div className="flex items-center mb-6 md:mb-0">
              <Image src="/images/logo.png" alt="Sistema de Apoio a Calouros" width={32} height={32} className="mr-2" />
              <span className="text-xl font-bold">Apoio Calouros</span>
            </div>
            <nav className="flex flex-wrap gap-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Link Um
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Link Dois
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Link Três
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Link Quatro
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Link Cinco
              </a>
            </nav>
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
    </div>
  )
}
