'use client';

import Link from 'next/link';
import { Smartphone, MessageCircle, BarChart3, Check, ArrowRight, Rocket, Globe, ExternalLink, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const brandGradient = "bg-gradient-to-r from-[#E11D84] via-[#9333EA] to-[#4C1D95] bg-clip-text text-transparent";

  // Track analytics cuando hacen click
  const trackFormClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click_crear_catalogo', {
        event_category: 'conversion',
        event_label: 'Google Forms',
        value: 1,
      });
    }
  };

  const trackWhatsAppClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click_whatsapp_ayuda', {
        event_category: 'engagement',
        event_label: 'WhatsApp Support',
        value: 1,
      });
    }
  };

  const trackTelegramClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click_telegram_ayuda', {
        event_category: 'engagement',
        event_label: 'Telegram Support',
        value: 1,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-fuchsia-500/30 overflow-x-hidden font-sans">
      
      {/* 🌌 Luces Atmosféricas */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[80%] md:w-[60%] h-[40%] bg-[#E11D84]/10 blur-[100px] md:blur-[140px] rounded-full opacity-40" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[80%] md:w-[50%] h-[40%] bg-[#9333EA]/10 blur-[100px] md:blur-[140px] rounded-full opacity-40" />
      </div>

      {/* 🧭 Navegación Responsive */}
      <nav className="relative z-50 flex justify-between items-center px-6 py-6 md:py-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-[#E11D84] to-[#9333EA] rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shadow-fuchsia-500/20">
              <Rocket size={18} className="text-white md:hidden" />
              <Rocket size={22} className="text-white hidden md:block" />
           </div>
           <span className="text-xl md:text-2xl font-black tracking-tighter italic text-white">
            Vende<span className={`${brandGradient} pr-2`}>Alta</span>
           </span>
        </div>
        <Link href="/juan-perez" className="bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 transition-all text-[10px] md:text-xs font-bold uppercase tracking-widest">
          Demo Live
        </Link>
      </nav>

      {/* ⚡ Hero Section Responsive */}
      <section className="relative z-10 container mx-auto px-4 pt-10 pb-12 md:pt-32 md:pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-fuchsia-500/10 border border-fuchsia-500/20 px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-6 md:mb-10 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-[#E11D84] animate-ping" />
            <span className="text-fuchsia-300 text-[9px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.3em]">
              Digitaliza tu negocio hoy mismo
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-[100px] font-black mb-6 md:mb-8 tracking-[-0.05em] leading-[1.1] md:leading-[0.9]">
            Vende más con tu <br />
            <span className={`${brandGradient} italic pr-4`}>Catálogo Digital</span>
          </h1>
          
          <p className="text-base md:text-2xl text-gray-400 mb-10 md:mb-14 max-w-2xl mx-auto font-light leading-relaxed px-4">
            La experiencia <span className="text-white font-semibold italic">Premium</span> que tus productos merecen. 
            <span className="block mt-2 text-sm md:text-lg text-gray-500">🌎 Disponible en toda Latinoamérica</span>
          </p>

          {/* ✅ BOTONES ACTUALIZADOS */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center px-4">
            
            {/* 🌎 BOTÓN PRINCIPAL → GOOGLE FORMS */}
            <a 
              href="https://forms.gle/DenBvpPWF7m3KLNC9"
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackFormClick}
              className="w-full sm:w-auto bg-[#E11D84] hover:bg-fuchsia-700 text-white px-8 py-5 md:px-10 md:py-6 rounded-2xl md:rounded-[2rem] font-black text-base md:text-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-[0_15px_40px_rgba(225,29,132,0.3)]"
            >
              <Globe size={20} />
              CREAR MI CATÁLOGO
              <ExternalLink size={18} className="opacity-70" />
            </a>
            
            {/* 💬 BOTÓN SECUNDARIO → WHATSAPP AYUDA */}
            <a 
              href="https://wa.me/59178636400?text=Hola%2C%20necesito%20ayuda%20para%20crear%20mi%20cat%C3%A1logo%20VendeAlta"
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackWhatsAppClick}
              className="w-full sm:w-auto px-8 py-5 md:px-10 md:py-6 rounded-2xl md:rounded-[2rem] font-black text-base md:text-lg border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all flex items-center justify-center gap-3 group"
            >
              <MessageCircle size={20} className="text-green-400 group-hover:text-green-300" />
              AYUDA POR WHATSAPP
            </a>
          </div>

          {/* 📱 BOTÓN TELEGRAM */}
          <div className="mt-4 flex justify-center">
            <a 
              href="https://t.me/59160605127"
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackTelegramClick}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all text-sm md:text-base font-semibold group"
            >
              <Send size={16} className="text-blue-400 group-hover:text-blue-300" />
              <span className="text-gray-300">También en Telegram</span>
            </a>
          </div>

          {/* 📝 Texto informativo - MODIFICADO */}
          <p className="text-xs md:text-sm text-gray-600 mt-6 md:mt-8 leading-relaxed">
            ✨ Cuando veamos tu mensaje tu catálogo estará listo al instante
          </p>
        </motion.div>
      </section>

      {/* 🧩 Features Grid - ESPACIADO REDUCIDO */}
      <section id="funciona" className="relative z-10 container mx-auto px-4 py-8 md:py-16 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto">
          <FeatureCard 
            icon={<Smartphone className="text-fuchsia-400" size={28} />}
            title="Escaneo QR"
            desc="Tus clientes ven tu stock al instante sin instalar nada."
            step="01"
            accent="#E11D84"
          />
          <FeatureCard 
            icon={<MessageCircle className="text-green-400" size={28} />}
            title="WhatsApp"
            desc="Recibe pedidos detallados listos para cerrar la venta."
            step="02"
            accent="#22C55E"
          />
          <FeatureCard 
            icon={<BarChart3 className="text-purple-400" size={28} />}
            title="Gestión Fácil"
            desc="Cambia precios y fotos desde tu celular en segundos."
            step="03"
            accent="#9333EA"
          />
        </div>
      </section>

      {/* 💎 Benefits & Mockup - ESPACIADO REDUCIDO */}
      <section id="beneficios" className="relative z-10 py-8 md:py-24 bg-gradient-to-b from-transparent via-fuchsia-900/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <h2 className="text-3xl md:text-6xl font-black mb-8 md:mb-10 leading-none italic">
                ¿POR QUÉ <span className={`${brandGradient} pr-4`}>VendeAlta?</span>
              </h2>
              <div className="space-y-4 md:space-y-8 text-left">
                <BenefitItem title="Imagen de Prestigio" desc="Diseño que genera confianza inmediata." accent="#E11D84" />
                <BenefitItem title="Impulso en TikTok" desc="Vincula tus lives directo con tus productos." accent="#9333EA" />
                <BenefitItem title="Soporte SIA" desc="Tecnología Inteligente que trabaja para ti." accent="#E11D84" />
              </div>
            </div>
            
            <div className="order-1 lg:order-2 relative px-4 md:px-0">
              <div className="absolute inset-0 bg-fuchsia-500/20 blur-[80px] rounded-full opacity-50" />
              <div className="relative bg-[#111] border border-white/10 p-3 md:p-4 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl max-w-[320px] md:max-w-none mx-auto">
                <div className="bg-[#050505] rounded-[2rem] md:rounded-[3rem] aspect-[9/18] overflow-hidden border border-white/5 relative flex flex-col items-center justify-center p-6 md:p-10 text-center">
                   
                   <img 
                    src="https://i.ibb.co/nsXsd7md/logo-vendealta-ofi.png" 
                    className="w-56 md:w-80 h-auto mb-6 md:mb-10 animate-float object-contain"
                    alt="Logo VendeAlta Oficial"
                   />

                   <div className="h-1 w-16 md:w-24 bg-fuchsia-500 rounded-full mb-4 md:mb-6" />
                   <h4 className="text-lg md:text-2xl font-black mb-2 uppercase italic tracking-tighter">Tu Tienda Digital</h4>
                   <p className="text-gray-500 text-[10px] md:text-sm mb-6 md:mb-10 leading-relaxed px-4">Elegancia y rapidez en cada clic.</p>
                   <Link href="/juan-perez" className="w-full bg-white text-black py-3 md:py-5 rounded-xl md:rounded-2xl font-black text-[10px] md:text-sm shadow-xl hover:bg-fuchsia-50 transition-all">
                     PROBAR DEMO
                   </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🎯 Sección "Cómo funciona" - ESPACIADO REDUCIDO + TEXTO MODIFICADO */}
      <section className="relative z-10 py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl md:text-6xl font-black mb-4 md:mb-6 leading-none italic">
              <span className={`${brandGradient} pr-4`}>3 PASOS</span> SIMPLES
            </h2>
            <p className="text-gray-400 text-xs md:text-lg leading-relaxed">
              Desde el registro hasta tu primer cliente apenas recibamos y veamos tu mensaje
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            <StepCard 
              number="1"
              title="Regístrate"
              desc="Llena el formulario con tus datos básicos. Solo toma 1 minuto."
              icon="📝"
            />
            <StepCard 
              number="2"
              title="Recibe tu QR"
              desc="Te enviamos tu catálogo personalizado con tu código QR único."
              icon="📱"
            />
            <StepCard 
              number="3"
              title="Agrega productos"
              desc="Actualiza tu catálogo cuando quieras desde tu celular."
              icon="🚀"
            />
          </div>
        </div>
      </section>

      {/* 🏁 Footer Responsive - ESPACIADO REDUCIDO */}
      <footer className="relative z-10 pt-8 md:pt-16 pb-10 border-t border-white/5 bg-black px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-7xl font-black mb-8 md:mb-12 tracking-tight italic leading-tight">
            EL FUTURO ES <br /> <span className={`${brandGradient} pr-4`}>DIGITAL.</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 md:mb-16">
            <a 
              href="https://wa.me/59178636400"
              onClick={trackWhatsAppClick}
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 md:px-12 md:py-6 rounded-full font-black text-base md:text-xl hover:scale-105 transition-all shadow-xl"
            >
              ASESORÍA GRATIS <MessageCircle fill="black" size={20} />
            </a>

            <a 
              href="https://t.me/59160605127"
              onClick={trackTelegramClick}
              className="inline-flex items-center gap-3 border border-white/10 bg-white/5 text-white px-8 py-4 md:px-12 md:py-6 rounded-full font-black text-base md:text-xl hover:scale-105 hover:bg-white/10 transition-all"
            >
              TELEGRAM <Send size={20} />
            </a>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-2">
               <span className="font-black text-xl md:text-2xl tracking-tighter italic text-white">
                Vende<span className={`${brandGradient} pr-2`}>Alta</span>
               </span>
            </div>
            
            <p className="text-gray-600 text-[8px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] uppercase font-bold">
              © 2026 Latinoamérica • Impulsando el Comercio Local
            </p>

            <div className="flex flex-col items-center gap-4 bg-white/[0.02] border border-white/5 px-6 py-6 md:px-8 md:py-6 rounded-2xl md:rounded-3xl w-full max-w-sm md:max-w-none">
              <span className="text-[8px] md:text-[9px] font-bold text-gray-500 uppercase tracking-widest">Desarrollado por</span>
              <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
                <span className="text-xs md:text-sm font-black tracking-tighter text-gray-300 italic">SIA • SOLUCIONES CON IA</span>
                <div className="h-px w-10 md:h-4 md:w-[1px] bg-white/10" />
                <div className="flex flex-col sm:flex-row gap-2 items-center">
                  <a href="https://wa.me/59178636400" className="text-fuchsia-400 text-xs md:text-sm font-bold flex items-center gap-2 hover:text-white transition-all">
                    <MessageCircle size={14} /> 78636400
                  </a>
                  <span className="text-gray-600">•</span>
                  <a href="https://t.me/59160605127" className="text-blue-400 text-xs md:text-sm font-bold flex items-center gap-2 hover:text-white transition-all">
                    <Send size={14} /> Telegram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* 🛰️ Floating Badge - NÚMEROS ACTUALIZADOS */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[100]">
        <div className="flex flex-col gap-2">
          <a 
            href="https://wa.me/59178636400" 
            onClick={trackWhatsAppClick}
            className="bg-black/80 backdrop-blur-xl border border-white/10 p-3 md:p-4 rounded-xl md:rounded-2xl shadow-2xl flex items-center gap-3 hover:scale-105 transition-all"
          >
            <MessageCircle className="text-green-500" size={20} />
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-gray-500 uppercase tracking-tighter leading-none mb-1">WhatsApp</span>
              <span className="text-[10px] md:text-xs font-bold text-white">¿Ayuda?</span>
            </div>
          </a>

          <a 
            href="https://t.me/59160605127" 
            onClick={trackTelegramClick}
            className="bg-black/80 backdrop-blur-xl border border-white/10 p-3 md:p-4 rounded-xl md:rounded-2xl shadow-2xl flex items-center gap-3 hover:scale-105 transition-all"
          >
            <Send className="text-blue-400" size={20} />
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-gray-500 uppercase tracking-tighter leading-none mb-1">Telegram</span>
              <span className="text-[10px] md:text-xs font-bold text-white">Chat</span>
            </div>
          </a>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

function FeatureCard({ icon, title, desc, step, accent }: any) {
  return (
    <div className="relative group bg-white/[0.02] border border-white/5 p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] overflow-hidden hover:border-white/10 transition-all">
      <div className="absolute top-4 right-6 text-3xl md:text-5xl font-black text-white/5 uppercase italic">{step}</div>
      <div className="mb-6 p-4 rounded-2xl w-fit shadow-inner" style={{ backgroundColor: `${accent}15` }}>
        {icon}
      </div>
      <h3 className="text-xl md:text-2xl font-black mb-2 uppercase italic tracking-tight">{title}</h3>
      <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function BenefitItem({ title, desc, accent }: { title: string, desc: string, accent: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 border p-1.5 rounded-lg shrink-0" style={{ borderColor: `${accent}30`, backgroundColor: `${accent}10` }}>
        <Check size={14} style={{ color: accent }} />
      </div>
      <div>
        <h4 className="text-base md:text-xl font-bold text-white mb-0.5 tracking-tight">{title}</h4>
        <p className="text-gray-500 text-[10px] md:text-sm leading-snug">{desc}</p>
      </div>
    </div>
  );
}

function StepCard({ number, title, desc, icon }: { number: string, title: string, desc: string, icon: string }) {
  return (
    <div className="relative bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-3xl text-center hover:border-fuchsia-500/30 transition-all group">
      <div className="text-5xl md:text-6xl mb-4">{icon}</div>
      <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/30 flex items-center justify-center font-black text-lg text-fuchsia-400">
        {number}
      </div>
      <h3 className="text-xl md:text-2xl font-black mb-3 uppercase italic">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}