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
  const [isDelayedContentVisible, setIsDelayedContentVisible] = useState(false);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Vturb Script Integration - More robust loading
    const scriptId = "vturb-script-694460cd39b76fcf0294a0f5";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://scripts.converteai.net/1b23d824-f7d5-46ac-8edc-700038ffb33d/players/694460cd39b76fcf0294a0f5/v4/player.js";
      script.async = true;
      // Adding crossOrigin to help with "Script error" debugging
      script.crossOrigin = "anonymous"; 
      document.head.appendChild(script);
    }

    // Hotmart Sales Funnel Integration
    const hotmartScriptId = "hotmart-sales-funnel-script";
    if (!document.getElementById(hotmartScriptId)) {
      const script = document.createElement("script");
      script.id = hotmartScriptId;
      script.src = "https://checkout.hotmart.com/lib/hotmart-checkout-elements.js";
      script.async = true;
      script.onload = () => {
        // @ts-ignore
        if (window.checkoutElements) {
          // @ts-ignore
          window.checkoutElements.init('salesFunnel').mount('#hotmart-sales-funnel');
        }
      };
      document.head.appendChild(script);
    } else {
      // @ts-ignore
      if (window.checkoutElements) {
        try {
          // @ts-ignore
          window.checkoutElements.init('salesFunnel').mount('#hotmart-sales-funnel');
        } catch (e) {
          // Ignore if already mounted
        }
      }
    }

    // Manual injection of the player to avoid React reconciliation issues with circular structures
    if (playerContainerRef.current && !playerContainerRef.current.querySelector('vturb-smartplayer')) {
      const player = document.createElement('vturb-smartplayer');
      player.id = 'vid-694460cd39b76fcf0294a0f5';
      player.setAttribute('style', 'display: block; margin: 0 auto; width: 100%;');
      playerContainerRef.current.appendChild(player);
    }

    // Delay Logic Integration
    const SECONDS_TO_DISPLAY = 80;
    let released = false;

    const waitForPlayer = () => {
      // @ts-ignore
      if (typeof window.smartplayer === "undefined" || !window.smartplayer.instances || !window.smartplayer.instances.length) {
        return setTimeout(waitForPlayer, 1000);
      }

      // @ts-ignore
      const player = window.smartplayer.instances[0];

      player.on("timeupdate", () => {
        if (released) return;
        if (player.video.currentTime >= SECONDS_TO_DISPLAY) {
          released = true;
          setIsDelayedContentVisible(true);
        }
      });
    };

    waitForPlayer();

    return () => {
      clearInterval(timer);
    };
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/50 orange-glow group min-h-[200px] flex items-center justify-center"
          >
            {/* Vturb Smart Player Container */}
            <div className="w-full" ref={playerContainerRef} />
            
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
          {isDelayedContentVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-16 md:space-y-24"
            >
              {/* Upsell Hook */}
              <section className="text-center space-y-12">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl md:text-3xl font-light">¿Quieres ir más allá del sonido en vivo?</h3>
                </motion.div>

                {/* Product Showcase */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                  <div className="relative bg-[#0a0a0a] rounded-3xl border border-white/5 overflow-hidden">
                    <div className="grid md:grid-cols-2 items-center">
                      <div className="p-6 md:p-12 space-y-6 text-left">
                        <div className="flex items-center gap-2 text-orange-500">
                          <Music className="w-5 h-5" />
                          <span className="text-xs font-bold uppercase tracking-[0.2em]">Audio Evolution</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                          Producción Simple <br />
                          <span className="text-zinc-500">Sin Complicaciones</span>
                        </h2>
                        <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                          Domina el arte de crear bases musicales profesionales directamente desde tu celular. Sin necesidad de equipos costosos ni años de estudio.
                        </p>
                        <ul className="space-y-3">
                          {["Bases profesionales en minutos", "Exportación de alta fidelidad", "Flujo de trabajo optimizado"].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                              <CheckCircle className="w-4 h-4 text-orange-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="relative h-full min-h-[250px] md:min-h-[400px]">
                        <img 
                          src="https://i.ibb.co/CsWs4dYt/Chat-GPT-Image-23-de-mar-de-2026-23-10-47.png" 
                          alt="Audio Evolution Interface" 
                          className="absolute inset-0 w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:bg-gradient-to-l" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Pricing & Scarcity */}
              <section className="text-center space-y-8 md:space-y-12 py-8 md:py-12">
                <div className="space-y-4">
                  <h4 className="text-lg md:text-xl text-zinc-400">Inversión única y exclusiva:</h4>
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-zinc-600 line-through text-xl md:text-2xl">$97.00</span>
                    <div className="text-5xl md:text-8xl font-black tracking-tighter">
                      $13<span className="text-orange-500">.99</span>
                    </div>
                    <p className="text-orange-500 font-bold uppercase tracking-widest text-xs md:text-sm">¡Solo por hoy!</p>
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
              <section className="max-w-3xl mx-auto">
                <div id="<!-- HOTMART - Sales Funnel Widget -->
<!--- sales funnel container --->
<div id="hotmart-sales-funnel"></div>

<!--- script load and setup --->
<script src="https://checkout.hotmart.com/lib/hotmart-checkout-elements.js"></script>
<script>
checkoutElements.init('salesFunnel').mount('#hotmart-sales-funnel')
</script>
<!-- HOTMART - Sales Funnel Widget -->" className="min-h-[200px] w-full"></div>
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
                    Prueba el entrenamiento durante 30 días y si por alguna razón sientes que no es para ti, te devolveremos el 100% de lo que invertiste. Sin preguntas, sin complicaciones.
                  </p>
                  <div className="flex flex-col md:flex-row items-center gap-4 pt-4">
                    <div className="flex -space-x-3">
                      {[1,2,3,4].map(i => (
                        <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-10 h-10 rounded-full border-2 border-[#050505]" alt="User" />
                      ))}
                    </div>
                    <p className="text-sm text-zinc-500">
                      <span className="text-white font-bold">+1,200 alumnos</span> ya están produciendo.
                    </p>
                  </div>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Footer */}
      <AnimatePresence>
        {isDelayedContentVisible && (
          <motion.footer 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border-t border-white/5 py-12 px-6"
          >
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-zinc-600 text-sm">
              <p>© 2026 Eliab Campos Teclas. Todos los derechos reservados.</p>
            </div>
          </motion.footer>
        )}
      </AnimatePresence>
    </div>
  );
}
