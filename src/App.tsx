/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Palette, 
  Layers, 
  Rocket, 
  ShieldCheck, 
  Zap, 
  Star, 
  ArrowRight,
  Play,
  RotateCcw,
  Volume2
} from "lucide-react";

// --- Types ---
interface SlideContent {
  id: number;
  title: string;
  subtitle: string;
  items?: string[];
  icon: ReactNode;
  bgClass: string;
  accentText: string;
}

// --- Constants ---
const SLIDES: SlideContent[] = [
  {
    id: 1,
    title: "GROWX TECHNOLOGY",
    subtitle: "نصمم المستقبل البصري لعلامتكم التجارية",
    icon: <img src="/growx_logo.png" alt="GrowX Logo" className="w-24 h-24 object-contain" referrerPolicy="no-referrer" />,
    bgClass: "bg-editorial-bg",
    accentText: "text-editorial-accent"
  },
  {
    id: 2,
    title: "خدماتنا المتميزة",
    subtitle: "الجودة والاحترافية في كل تفصيل",
    items: [
      "تصميم اللوجو (الشعارات)",
      "تصميم الهويات البصرية",
      "تصاميم السوشيال ميديا",
      "GrowX Tech الحلول المتكاملة"
    ],
    icon: <Layers className="w-16 h-16 text-editorial-accent" />,
    bgClass: "bg-editorial-surface border-r border-white/5",
    accentText: "text-editorial-accent"
  },
  {
    id: 3,
    title: "لماذا تختار GrowX؟",
    subtitle: "خبرة تقنية وإبداع فني",
    items: [
      "تصاميم حصرية ومبتكرة",
      "سرعة فائقة في التنفيذ",
      "دعم فني مستمر ومتكامل",
      "تطوير مستمر لهوية البراند"
    ],
    icon: <ShieldCheck className="w-16 h-16 text-editorial-accent" />,
    bgClass: "bg-editorial-bg",
    accentText: "text-editorial-accent"
  },
  {
    id: 4,
    title: "الفائدة / WHY GrowX",
    subtitle: "نمو أسرع وحضور أقوى برؤية GrowX",
    items: [
      "جذب العملاء بلمسة احترافية",
      "بناء ثقة فورية بظهور مميز",
      "التميز التقني والفني في مجالك",
      "هوية بصرية تدوم وتتطور"
    ],
    icon: <Rocket className="w-16 h-16 text-editorial-accent" />,
    bgClass: "bg-editorial-surface",
    accentText: "text-editorial-accent"
  },
  {
    id: 5,
    title: "عرض خاص: 3 ريال فقط!",
    subtitle: "لفترة محدودة جداً وحصرياً",
    items: [
      "كل الخدمات بـ 3 ريال سعودي",
      "تصميم لوجو + هوية + ميديا",
      "تواصل معنا الآن عبر واتساب",
      "GrowX: شريك نجاحك الأول"
    ],
    icon: <Zap className="w-16 h-16 text-editorial-accent" />,
    bgClass: "bg-editorial-accent text-black",
    accentText: "text-white"
  }
];

const AUTO_PLAY_INTERVAL = 4000;

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    setProgress(0);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            nextSlide();
            return 0;
          }
          return prev + (100 / (AUTO_PLAY_INTERVAL / 100));
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const reset = () => {
    setCurrentSlide(0);
    setProgress(0);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-editorial-bg text-white font-sans selection:bg-white/20" dir="rtl">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-editorial-accent/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto min-h-screen flex flex-col md:flex-row items-center justify-center p-6 gap-12">
        
        <div className="flex-1 space-y-6 hidden lg:block">
           <img src="/growx_logo.png" alt="GrowX Logo" className="w-20 h-20 object-contain mb-4" />
           <h2 className="text-7xl font-black leading-[0.9] tracking-tighter">
             نصمم<br/>
             <span className="text-editorial-accent underline decoration-4 underline-offset-8">المستقبل</span><br/>
             البصري.
           </h2>
           <p className="text-xl opacity-60 max-w-md leading-relaxed font-light">
             GrowX تحول الشركات الناشئة إلى براندات عالمية من خلال هويات بصرية مبتكرة وشعارات احترافية تترك أثراً لا ينسى.
           </p>
        </div>

        {/* TikTok Style Frame */}
        <div className="w-[400px] aspect-[9/16] bg-black rounded-[3rem] border-8 border-neutral-900 shadow-2xl overflow-hidden relative isolate group shrink-0">
          
          {/* Top Indicators */}
          <div className="absolute top-8 inset-x-8 flex gap-1.5 z-50">
            {SLIDES.map((_, idx) => (
              <div key={idx} className="h-0.5 flex-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: idx < currentSlide ? "100%" : idx === currentSlide ? `${progress}%` : "0%"
                  }}
                  className="h-full bg-white"
                />
              </div>
            ))}
          </div>

          {/* Main Content Area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
              className={`absolute inset-0 flex flex-col items-center justify-center p-12 text-center ${SLIDES[currentSlide].bgClass}`}
            >
              <div className="space-y-6 flex flex-col items-center w-full">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-2"
                >
                  {SLIDES[currentSlide].id === 5 ? (
                    <div className="text-xs uppercase tracking-[0.2em] font-black bg-black text-white px-3 py-1">Limited Offer</div>
                  ) : (
                    SLIDES[currentSlide].icon
                  )}
                </motion.div>

                <div className="space-y-4 w-full">
                  <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className={`text-4xl md:text-5xl font-black tracking-tight leading-[1] ${SLIDES[currentSlide].id === 5 ? 'text-black' : 'text-white'}`}
                  >
                    {SLIDES[currentSlide].title}
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className={`text-sm tracking-widest uppercase opacity-60 font-bold ${SLIDES[currentSlide].id === 5 ? 'text-black' : 'text-neutral-400'}`}
                  >
                    {SLIDES[currentSlide].subtitle}
                  </motion.p>
                </div>

                {SLIDES[currentSlide].items && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-0 w-full mt-4"
                  >
                    {SLIDES[currentSlide].items?.map((item, i) => (
                      <motion.div 
                        key={i}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 + (i * 0.05) }}
                        className={`flex items-start gap-4 py-4 border-t border-white/10 text-right ${SLIDES[currentSlide].id === 5 ? 'border-black/10' : ''}`}
                      >
                        <span className="font-serif italic text-xs opacity-50 shrink-0">0{i+1}</span>
                        <span className={`text-base font-bold ${SLIDES[currentSlide].id === 5 ? 'text-black' : 'text-white'}`}>{item}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {currentSlide === SLIDES.length - 1 && (
                  <motion.a
                    initial={{ rotate: 0, scale: 0.8 }}
                    animate={{ rotate: -3, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={`https://wa.me/966566964857?text=${encodeURIComponent("مرحباً GrowX، أود الاستفسار عن عرض الـ 3 ريال لتصميم الهوية البصرية من تيك توك")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 bg-black text-white px-8 py-3 font-black shadow-[10px_10px_0px_rgba(255,255,255,0.1)] cursor-pointer hover:bg-neutral-800 transition-colors relative z-50 inline-block decoration-none"
                  >
                    احجز الآن
                  </motion.a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Overlay (Invisible targets) */}
          <div className="absolute inset-0 z-30 flex">
            <div className="w-1/2 h-full cursor-w-resize" onClick={prevSlide} />
            <div className="w-1/2 h-full cursor-e-resize" onClick={nextSlide} />
          </div>

          {/* Editorial Social sidebar */}
          <div className="absolute right-4 bottom-32 z-40 flex flex-col gap-6 items-center">
            <div className="w-10 h-10 border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-md overflow-hidden">
                <img src="/growx_logo.png" alt="X" className="w-full h-full object-contain p-1" />
            </div>
            <div className="w-10 h-10 border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-md">
                <Star className="w-5 h-5 text-editorial-accent" />
            </div>
            <div className="w-10 h-10 border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-md">
                <Volume2 className="w-5 h-5" />
            </div>
          </div>

          {/* Bottom Bar Styling */}
          <div className="absolute bottom-10 left-10 right-10 z-40">
            <div className="flex items-center gap-3">
              <span className="text-sm font-black text-editorial-accent">@GROWX.TECH</span>
              <div className="h-[1px] flex-1 bg-editorial-accent opacity-30 px-2" />
            </div>
            <p className="text-[10px] mt-2 font-serif italic text-white/50">
              GrowX Technology / Brand Identity / STARTUPS 
            </p>
          </div>
        </div>

        {/* Global Controls Viewports */}
        <div className="flex flex-col gap-8 items-center lg:items-start shrink-0">
          <div className="flex items-center gap-4">
             <button 
                onClick={reset}
                className="w-14 h-14 flex items-center justify-center border border-white/10 hover:bg-white/5 transition-colors"
                title="إعادة التشغيل"
             >
               <RotateCcw className="w-5 h-5" />
             </button>
             
             <button 
                onClick={togglePlay}
                className={`flex items-center gap-4 px-12 py-4 font-black tracking-widest uppercase transition-all ${
                  isPlaying 
                    ? 'bg-editorial-accent text-black border-editorial-accent' 
                    : 'bg-white text-black border-white'
                } border shadow-[8px_8px_0px_rgba(255,77,0,0.15)]`}
             >
                {isPlaying ? "PAUSE" : "PLAY VIDEO"}
             </button>
          </div>
          
          <div className="p-8 border border-white/5 bg-editorial-surface/50 backdrop-blur-sm space-y-4 max-w-xs">
             <div className="text-editorial-accent font-serif italic text-sm">Editorial Theme Active</div>
             <p className="text-xs opacity-40 leading-relaxed uppercase tracking-wider">
               Extracted styling and layout patterns from editorial design. Preserving core TikTok generator functionality.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
