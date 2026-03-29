/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  AlertCircle, 
  CheckCircle, 
  ShieldCheck, 
  Volume2, 
  ArrowRight, 
  Timer, 
  Zap,
  Play,
  Music
} from "lucide-react";

export default function App() {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes
  const [progress, setProgress] = useState(83);
  const [showContent, setShowContent] = useState(false);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const hotmartWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Vturb Script Integration - More robust loading
    const loadVturb = () => {
      if (playerContainerRef.current) {
        // Clear and set up player element
        playerContainerRef.current.innerHTML = '<vturb-smartplayer id="vid-69c86de05610b6167ac4ff63" style="display: block; margin: 0 auto; width: 100%;"></vturb-smartplayer>';

        // Load script
        const scriptId = "vturb-script-69c86de05610b6167ac4ff63";
        const existingScript = document.getElementById(scriptId);
        if (existingScript) {
          existingScript.remove();
        }
        
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://scripts.converteai.net/1b23d824-f7d5-46ac-8edc-700038ffb33d/players/69c86de05610b6167ac4ff63/v4/player.js";
        script.async = true;
        document.head.appendChild(script);
      }
    };

    // Use a small delay to ensure the DOM element is rendered by React
    const vturbTimeout = setTimeout(loadVturb, 300);

    return () => {
      clearInterval(timer);
      clearTimeout(vturbTimeout);
    };
  }, []);

  useEffect(() => {
    // Use a small timeout to ensure the DOM element is rendered by React
    const timeoutId = setTimeout(() => {
      if (hotmartWrapperRef.current && !document.getElementById('hotmart-script-loaded')) {
        const scriptLoad = document.createElement('script');
        scriptLoad.id = 'hotmart-script-loaded';
        scriptLoad.src = "https://checkout.hotmart.com/lib/hotmart-checkout-elements.js";
        scriptLoad.async = true;
        
        scriptLoad.onload = () => {
          const scriptSetup = document.createElement('script');
          scriptSetup.innerHTML = "if(window.checkoutElements) { try { checkoutElements.init('salesFunnel').mount('#hotmart-sales-funnel'); } catch(e) { console.error(e); } }";
          document.body.appendChild(scriptSetup);
        };
        
        document.body.appendChild(scriptLoad);
      }
    }, 200);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setShowContent(true);
    }, 120000); // 120 seconds

    return () => clearTimeout(delayTimer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-orange-500/30 overflow-x-hidden">
      {/* Top Warning Banner */}
      <div className="bg-red-600/90 backdrop-blur-md text-white py-3 px-4 text-center sticky top-0 z-50 border-b border-red-500/20">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 text-sm md:text-base font-medium">
          <AlertCircle className="w-5 h-5 animate-pulse" />
          <p>
            PASO FINAL: <span className="font-bold">NO CIERRES NI ACTUALICES ESTA PÁGINA</span>. TU PEDIDO ESTÁ SIENDO PROCESADO.
          </p>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 md:px-6 pt-8 md:pt-12 pb-16 md:pb-24 space-y-16 md:space-y-24">
        
        {/* Hero Section */}
        <section className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h2 className="text-orange-500 font-bold tracking-widest uppercase text-sm">Acceso Confirmado</h2>
            <h1 className="text-3xl md:text-6xl font-serif italic leading-tight">
              ¡Felicidades! Bienvenido al <br />
              <span className="font-sans font-bold not-italic text-white">PACK DE SONIDOS</span>
            </h1>
            <p className="text-zinc-400 max-w-2xl mx-auto text-base md:text-lg">
              Mira el video de bienvenida a continuación para conocer tus próximos pasos...
            </p>
          </motion.div>

          <motion.div 
            key="vturb-player-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/50 orange-glow group flex items-center justify-center min-h-[300px] md:min-h-[480px]"
          >
            {/* Vturb Smart Player Container */}
            <div 
              className="w-full" 
              ref={playerContainerRef}
            />
            
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-full border border-white/10 z-10 pointer-events-none">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-bold tracking-tighter uppercase">REC</span>
            </div>
          </motion.div>

          <div className="flex items-center justify-center gap-2 text-zinc-500 text-sm italic">
            <Volume2 className="w-4 h-4" />
            <p>Por favor, verifica que tu sonido esté activado para no perderte nada.</p>
          </div>
        </section>

        <AnimatePresence>
          {showContent && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-16 md:space-y-24"
            >
              {/* Pricing & Scarcity */}
              <section className="text-center space-y-8 md:space-y-12 py-8 md:py-12">
                <div className="space-y-4">
                  <h4 className="text-lg md:text-xl text-zinc-400">Inversión única y exclusiva:</h4>
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-zinc-600 line-through text-xl md:text-2xl">$97.00</span>
                    <div className="text-5xl md:text-8xl font-black tracking-tighter">
                      $24<span className="text-orange-500">.00</span>
                    </div>
                    <p className="text-orange-500 font-bold uppercase tracking-widest text-xs md:text-sm">¡Oferta de Lanzamiento!</p>
                  </div>
                </div>

                <div className="max-w-md mx-auto space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-zinc-500">
                      <span>Últimos cupos disponibles</span>
                      <span className="text-orange-500">{progress}% Completado</span>
                    </div>
                    <div className="h-3 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-gradient-to-r from-orange-600 to-orange-400"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-6 text-zinc-400">
                    <div className="flex flex-col items-center">
                      <Timer className="w-6 h-6 mb-1 text-orange-500" />
                      <span className="text-2xl font-mono font-bold text-white">{formatTime(timeLeft)}</span>
                      <span className="text-[10px] uppercase tracking-widest">Tiempo restante</span>
                    </div>
                    <div className="w-px h-12 bg-white/10" />
                    <div className="flex flex-col items-center">
                      <Zap className="w-6 h-6 mb-1 text-orange-500" />
                      <span className="text-2xl font-bold text-white">2</span>
                      <span className="text-[10px] uppercase tracking-widest">Cupos libres</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* HOTMART - Sales Funnel Widget */}
              <section className="max-w-3xl mx-auto" id="hotmart-sales-funnel-wrapper" ref={hotmartWrapperRef}>
                {/* <!-- HOTMART - Sales Funnel Widget --> */}
                {/* <!--- sales funnel container ---> */}
                <div id="hotmart-sales-funnel"></div>
                {/* <!-- HOTMART - Sales Funnel Widget --> */}
              </section>

              {/* Upsell Hook & Product Showcase */}
              <section className="text-center space-y-12">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl md:text-3xl font-light">¿Quieres el sonido más deseado del mundo en tus manos?</h3>
                </motion.div>

                {/* Product Showcase */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                  <div className="relative bg-[#0a0a0a] rounded-3xl border border-white/5 overflow-hidden">
                    <div className="grid md:grid-cols-2 items-center">
                      <div className="p-6 md:p-12 space-y-6 text-left">
                        <div className="flex items-center gap-2 text-orange-500">
                          <Music className="w-5 h-5" />
                          <span className="text-xs font-bold uppercase tracking-[0.2em]">Nord Stage 4 Collection</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                          Pack de Pianos <br />
                          <span className="text-zinc-500">Nord Stage 4</span>
                        </h2>
                        <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                          Lleva el realismo y la potencia del Nord Stage 4 a tu setup. Timbres de piano Hammer Action 80 muestreados con la máxima fidelidad para tus presentaciones en vivo y grabaciones.
                        </p>
                        <ul className="space-y-3">
                          {["Pianos Hammer Action 80", "Capas y Texturas Cinematográficas", "Optimizado para latencia cero"].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                              <CheckCircle className="w-4 h-4 text-orange-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="relative h-full min-h-[250px] md:min-h-[400px]">
                        <img 
                          src="https://eliabcamposteclas.com/wp-content/uploads/2026/03/ChatGPT-Image-28-de-mar.-de-2026-20_10_14.jpg" 
                          alt="Nord Stage 4 Piano Sound" 
                          className="absolute inset-0 w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:bg-gradient-to-l" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Guarantee Section */}
              <section className="grid md:grid-cols-2 gap-16 md:gap-12 items-center pt-8 md:pt-12">
                <div className="relative group px-4 md:px-0">
                  <img 
                    src="https://i.ibb.co/kgGkcHHy/Chat-GPT-Image-23-de-mar-de-2026-23-27-43.png" 
                    alt="Mobile Interface" 
                    className="rounded-3xl border border-white/10 shadow-2xl group-hover:scale-[1.02] transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-4 -right-2 md:-bottom-6 md:-right-6 bg-orange-500 p-4 md:p-6 rounded-2xl shadow-2xl shadow-orange-500/40">
                    <ShieldCheck className="w-8 h-8 md:w-12 md:h-12 text-white" />
                  </div>
                </div>
                <div className="space-y-6 text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-serif italic">Garantía 100% <br /> <span className="not-italic font-sans font-bold">Libre de Riesgo</span></h2>
                  <p className="text-zinc-400 leading-relaxed text-base md:text-lg">
                    Prueba el Pack de Timbres durante 30 días y si por alguna razón sientes que no es para ti, te devolveremos el 100% de lo que invertiste. Sin preguntas, sin complicaciones.
                  </p>
                  <div className="flex flex-col md:flex-row items-center gap-4 pt-4">
                    <div className="flex -space-x-3">
                      {[1,2,3,4].map(i => (
                        <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-10 h-10 rounded-full border-2 border-[#050505]" alt="User" />
                      ))}
                    </div>
                    <p className="text-sm text-zinc-500">
                      <span className="text-white font-bold">+1,200 músicos</span> ya están usando estos sonidos.
                    </p>
                  </div>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>


      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-zinc-600 text-sm">
          <p>© 2026 Eliab Campos Teclas. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
