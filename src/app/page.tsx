'use client';

import Link from 'next/link';
import { Smartphone, MessageCircle, BarChart3, Zap, Check, ArrowRight, Star, ShieldCheck, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* Decoración de fondo (Glows) */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-4 pt-12 pb-16 md:pt-32 md:pb-40">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-5xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-indigo-300 text-xs md:text-sm font-medium tracking-wider uppercase">
              La evolución del comercio en Bolivia
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none">
            Vende<span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Alta</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Transforma tu negocio con un <span className="text-white font-medium">catálogo digital premium</span>. 
            Tus clientes están a un escaneo de distancia.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <a 
              href="https://wa.me/59178787878?text=Hola%2C%20quiero%20crear%20mi%20cat%C3%A1logo%20digital"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white text-black px-8 py-5 rounded-2xl font-bold text-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-xl"
            >
              {/* Icono Estilo WhatsApp - Forzado Verde */}
              <div className="flex items-center justify-center bg-green-500 rounded-lg p-1.5 shadow-sm">
                <MessageCircle size={20} className="text-white fill-current" />
              </div>
              
              <span className="text-black">Empezar Ahora — Es Gratis</span>
            </a>
            
            <Link 
              href="/juan-perez"
              className="px-10 py-5 rounded-2xl font-bold text-lg border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all flex items-center gap-3 group"
            >
              Ver Demo 
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>


      {/* Features Grid */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-32">
        <div className="text-center mb-10 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Todo lo que necesitas para vender</h2>
          <p className="text-gray-500">Diseñado para ser potente, construido para ser simple.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto">
          <FeatureCard 
            icon={<Smartphone className="text-indigo-400" size={32} />}
            title="Simple y Rapido"
            desc="El cliente apunta su camara, Escanea tu QR y ve tu catálogo completo al instante"
            color="indigo"
          />
          <FeatureCard 
            icon={<Zap className="text-yellow-400" size={32} />}
            title="Contacto Directo y Veloz"
            desc="Optimizado para redes móviles lentas. Conecta con clientes vía WhatsApp con un solo click."
            color="yellow"
          />
          <FeatureCard 
            icon={<BarChart3 className="text-purple-400" size={32} />}
            title="Actualiza Facil tu Catalogo"
            desc="Cambia precios y stock desde tu celular cuando quieras. Tu catálogo se actualiza solo."
            color="purple"
          />
        </div>
      </div>

      {/* Benefits - High Impact */}
      <div className="relative z-10 bg-indigo-600/10 py-16 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 leading-tight">
                ¿Por qué los mejores <br />
                <span className="text-indigo-400">vendedores nos eligen?</span>
              </h2>
              <div className="space-y-6">
                <BenefitItem text="Ahorro total en catálogos impresos" />
                <BenefitItem text="Imagen profesional que genera confianza" />
                <BenefitItem text="Pedidos ordenados directo a tu WhatsApp" />
                <BenefitItem text="Enlace directo a tu TIK TOK para que muestres tus productos y tus lives" />
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500/20 blur-[80px] rounded-full" />
              <div className="relative bg-white/5 border border-white/10 p-4 rounded-[2.5rem] backdrop-blur-xl shadow-2xl">
                <div className="bg-[#0a0a0a] rounded-[2rem] overflow-hidden aspect-[9/16] relative group">
                   {/* Simulación de App */}
                   <div className="p-6">
                      <div className="flex justify-between items-center mb-8">
                        <div className="h-4 w-20 bg-white/10 rounded-full" />
                        <div className="h-8 w-8 bg-indigo-500/20 rounded-full flex items-center justify-center">
                           <Star size={14} className="text-indigo-400" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="h-48 w-full bg-white/5 rounded-2xl animate-pulse" />
                        <div className="h-6 w-3/4 bg-white/10 rounded-full" />
                        <div className="h-4 w-1/2 bg-white/5 rounded-full" />
                        <div className="grid grid-cols-2 gap-4 pt-4">
                           <div className="h-20 bg-white/5 rounded-xl" />
                           <div className="h-20 bg-white/5 rounded-xl" />
                        </div>
                      </div>
                   </div>
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end justify-center pb-12">
                      <Link href="/juan-perez" className="bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-500/40">
                        Probar Experiencia <Rocket size={18} />
                      </Link>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-32 text-center">
        <div className="max-w-4xl mx-auto bg-gradient-to-b from-white/10 to-transparent border border-white/10 p-8 md:p-24 rounded-[3rem] backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
          <h2 className="text-4xl md:text-6xl font-bold mb-8">¿Listo para subir de nivel?</h2>
          <p className="text-xl text-gray-400 mb-12">
            Únete a la comunidad de vendedores digitales más grande. <br />
            Tu primer mes es totalmente GRATIS.
          </p>
          <a 
            href="https://wa.me/59178787878"
            className="bg-indigo-500 hover:bg-indigo-400 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all shadow-xl shadow-indigo-500/20 inline-flex items-center gap-3"
          >
            Configurar mi QR ahora
            <ArrowRight size={24} />
          </a>
        </div>
      </div>

      {/* Footer Principal */}
      <footer className="relative z-10 border-t border-white/5 py-12 bg-black">
        <div className="container mx-auto px-4 text-center">
          <div className="font-black text-2xl mb-2 tracking-tighter italic bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            VendeAlta
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-gray-500 text-sm">
              © 2026 VendeAlta — El estándar digital para el comercio moderno.
            </p>
            
            {/* Línea decorativa */}
            <div className="mt-4 p-[0.5px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent w-full max-w-xs mx-auto" />
            
            {/* Créditos SIA en el Footer */}
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-gray-500">
              <span>Powered by</span>
              <span className="text-white font-black bg-indigo-600/20 px-2 py-1 rounded border border-indigo-500/20">
                SIA (Soluciones con IA)
              </span>
              <span className="hidden sm:inline text-gray-700">|</span>
              <a 
                href="https://wa.me/59160605127" 
                className="text-indigo-400 hover:text-indigo-300 transition-all font-bold flex items-center gap-1.5"
              >
                <MessageCircle size={12} />
                WhatsApp: 60605127
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Sello SIA - Optimizado para Móvil y PC */}
      <div className="fixed bottom-4 right-4 z-[100]">
        <a 
          href="https://wa.me/59160605127"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black/40 backdrop-blur-md border border-white/10 px-3 py-2 rounded-full text-[9px] md:text-[10px] text-gray-300 hover:text-white transition-all flex items-center gap-2 group shadow-lg"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          <span className="tracking-widest uppercase font-medium">Desarrollado por SIA</span>
        </a>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc, color }: any) {
  return (
    <div className="bg-white/[0.03] border border-white/5 p-10 rounded-[2rem] hover:bg-white/[0.06] transition-all group">
      <div className={`mb-8 p-4 bg-${color}-500/10 rounded-2xl w-fit group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="bg-indigo-500/20 p-1 rounded-full group-hover:bg-indigo-500/40 transition-colors">
        <Check size={20} className="text-indigo-400" />
      </div>
      <span className="text-lg text-gray-300">{text}</span>
    </div>
  );
}