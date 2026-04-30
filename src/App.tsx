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

// --- Components ---
const GrowXLogo = ({ className = "w-24 h-24", color = "currentColor", stacked = false, showText = true }) => {
  if (stacked) {
    return (
      <svg viewBox="0 0 240 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 120L120 20L180 120" stroke={color} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M85 120L145 20L205 120" stroke={color} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
        {showText && (
          <>
            <text x="120" y="175" fill={color} textAnchor="middle" style={{ font: 'black 48px Inter, sans-serif' }}>GROW X</text>
            <text x="120" y="210" fill={color} textAnchor="middle" style={{ font: 'bold 14px Inter, sans-serif', letterSpacing: '6px' }}>TECHNOLOGY</text>
          </>
        )}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 400 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 160L100 40L160 160" stroke={color} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M100 160L160 40L220 160" stroke={color} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
      {showText && (
        <>
          <text x="240" y="115" fill={color} style={{ font: 'bold 60px Inter, sans-serif' }}>GROW X</text>
          <text x="240" y="150" fill={color} style={{ font: '18px Inter, sans-serif', letterSpacing: '8px' }}>TECHNOLOGY</text>
        </>
      )}
    </svg>
  );
};

// --- Constants ---
const SLIDES: SlideContent[] = [
  {
    id: 1,
    title: "GROWX TECHNOLOGY",
    subtitle: "نصمم المستقبل البصري لعلامتكم التجارية",
    icon: <GrowXLogo className="w-48 h-48" color="#FF4D00" stacked />,
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
      "حلول براندينج متكاملة"
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
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

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
    <div className="min-h-screen bg-editorial-bg text-white font-sans selection:bg-white/20 overflow-x-hidden" dir="rtl">
      {/* Splash Screen */}
      <AnimatePresence>
        {showSplash && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[100] bg-editorial-bg flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <GrowXLogo className="w-48 h-48" color="#FF4D00" stacked />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Atmosphere */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-editorial-accent/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-editorial-accent/10 rounded-full blur-[150px]" />
      </div>

      {/* Section 1: Hero / TikTok Loop */}
      <section className="relative z-10 max-w-7xl mx-auto min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          
          <div className="flex-1 space-y-6 hidden lg:block text-right">
             <GrowXLogo className="w-24 h-12 mb-4" color="#FF4D00" />
             <h2 className="text-7xl font-black leading-[0.9] tracking-tighter">
               نصمم<br/>
               <span className="text-editorial-accent underline decoration-4 underline-offset-8">المستقبل</span><br/>
               البصري.
             </h2>
             <p className="text-xl opacity-60 max-w-md leading-relaxed font-light">
               GrowX تحول الشركات الناشئة إلى براندات عالمية من خلال هويات بصرية مبتكرة وشعارات احترافية تترك أثراً لا ينسى.
             </p>
             <div className="pt-8">
               <div className="flex items-center gap-4 text-editorial-accent animate-bounce">
                 <span className="text-sm font-bold tracking-widest uppercase">تصفح بورتفوليو الـ 3 ريال 2026</span>
                 <div className="w-10 h-[1px] bg-editorial-accent" />
               </div>
             </div>
          </div>

          {/* TikTok Style Frame */}
          <div className="w-full max-w-[400px] aspect-[9/16] bg-black rounded-[3rem] border-8 border-neutral-900 shadow-2xl overflow-hidden relative isolate group shrink-0">
            
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
                className={`absolute inset-0 flex flex-col items-center justify-center p-10 text-center ${SLIDES[currentSlide].bgClass}`}
              >
                <div className={`flex flex-col items-center w-full ${currentSlide === 0 ? 'justify-center h-full' : 'space-y-6'}`}>
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className={currentSlide === 0 ? "mb-8" : "mb-2"}
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
                      className={`${currentSlide === 0 ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl'} font-black tracking-tight leading-[1] ${SLIDES[currentSlide].id === 5 ? 'text-black' : 'text-white'}`}
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
                  <GrowXLogo className="w-8 h-4" color="#FF4D00" />
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
            
            <div className="p-8 border border-white/5 bg-editorial-surface/50 backdrop-blur-sm space-y-4 max-w-xs hidden md:block">
               <div className="text-editorial-accent font-serif italic text-sm">Portfolio Preview Scroll Down</div>
               <p className="text-xs opacity-40 leading-relaxed uppercase tracking-wider">
                 مرر للأسفل لمشاهدة جودة أعمالنا التي ستحصل عليها بسعر رمزي ولفترة محدودة جداً وبجودة 2026.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Portfolio Grid */}
      <section className="relative z-10 max-w-7xl mx-auto py-32 px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 text-right">
          <div className="space-y-4">
            <span className="text-editorial-accent font-black tracking-[0.3em] uppercase text-xs">SELECTED WORKS / 2026</span>
            <h2 className="text-6xl font-black tracking-tighter leading-none">بورتفوليو <br/> <span className="text-editorial-accent">GROWX</span></h2>
          </div>
          <div className="max-w-xs">
             <p className="text-sm opacity-50 leading-relaxed uppercase">نحن لا نصمم فقط، نحن نصنع تأثيراً بصرياً يغير مسار شركتك الناشئة للأفضل وبأعلى معايير الجودة العالمية لعام 2026.</p>
          </div>
        </div>

        {/* Portfolio Categories */}
        <div className="space-y-32">
          
          {/* Logo Design Category */}
          <div className="space-y-12">
            <div className="flex items-center gap-4">
              <h3 className="text-2xl font-black uppercase tracking-tighter text-editorial-accent">01 / تصميم الشعارات (LOGOS)</h3>
              <div className="h-[1px] flex-1 bg-white/10" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=800"
              ].map((img, i) => (
                <motion.div key={i} whileHover={{ y: -10 }} className="group relative space-y-4">
                  <div className="aspect-square overflow-hidden bg-editorial-surface border border-white/5">
                    <img src={img} alt="Logo Design" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" />
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black opacity-30 uppercase tracking-widest">Minimalist Identity</span>
                    <h4 className="text-lg font-bold">Concept {i + 1}</h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Visual Identity Category */}
          <div className="space-y-12">
            <div className="flex items-center gap-4">
              <h3 className="text-2xl font-black uppercase tracking-tighter text-editorial-accent">02 / الهوية البصرية (IDENTITY)</h3>
              <div className="h-[1px] flex-1 bg-white/10" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=1200",
                "https://images.unsplash.com/photo-1634942537034-2216bc378941?auto=format&fit=crop&q=80&w=1200"
              ].map((img, i) => (
                <motion.div key={i} whileHover={{ y: -10 }} className="group relative space-y-6">
                  <div className="aspect-[16/10] overflow-hidden bg-editorial-surface border border-white/5">
                    <img src={img} alt="Identity Design" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black opacity-30 uppercase tracking-widest">Brand Strategy & Guidelines</span>
                    <h4 className="text-xl font-bold">Comprehensive Brand Book {i + 1}</h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Social Media Category */}
          <div className="space-y-12">
            <div className="flex items-center gap-4">
              <h3 className="text-2xl font-black uppercase tracking-tighter text-editorial-accent">03 / السوشيال ميديا (WEB & SOCIAL)</h3>
              <div className="h-[1px] flex-1 bg-white/10" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=800",
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
              ].map((img, i) => (
                <motion.div key={i} whileHover={{ y: -10 }} className="group relative space-y-4">
                  <div className="aspect-[4/5] overflow-hidden bg-editorial-surface border border-white/5">
                    <img src={img} alt="Social Media" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" />
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black opacity-30 uppercase tracking-widest">Kinetic Content Design</span>
                    <h4 className="text-lg font-bold">Campaign Visual {i + 1}</h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Section 3: Call to Action (The 3 SAR Offer) */}
      <section className="relative z-10 py-40 bg-editorial-accent text-black overflow-hidden">
        <div className="absolute inset-0 mix-blend-overlay opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 text-[30rem] font-black leading-none translate-x-1/4 -translate-y-1/4 opacity-10">3SR</div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 text-center space-y-12 relative z-10">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="space-y-4"
           >
             <span className="text-xs font-black tracking-[0.4em] uppercase border-b-2 border-black pb-2">TIME IS RUNNING OUT / 2026 EXCLUSIVE</span>
             <h2 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-none uppercase">3 SAR <span className="text-sm border-2 border-black px-4 align-middle">ONLY</span></h2>
           </motion.div>
           
           <p className="text-2xl font-bold max-w-2xl mx-auto opacity-80 leading-relaxed">
             هذه الجودة العالمية التي رأيتها بالأعلى، يمكنك الحصول عليها الآن لبداية براندك مقابل 3 ريال فقط. العرض ينتهي قريباً جداً.
           </p>
           
           <motion.a
             whileHover={{ scale: 1.05, rotate: -2 }}
             whileTap={{ scale: 0.95 }}
             href={`https://wa.me/966566964857?text=${encodeURIComponent("مرحباً GrowX، أود الاستفسار عن عرض الـ 3 ريال بعد رؤية بورتفوليو 2026")}`}
             target="_blank"
             rel="noopener noreferrer"
             className="inline-block bg-black text-white px-16 py-6 text-xl font-black tracking-widest uppercase shadow-[10px_10px_0px_rgba(255,255,255,0.2)]"
           >
             احجز مكانك الآن
           </motion.a>
        </div>
      </section>

      {/* Basic Footer */}
      <footer className="relative z-10 py-24 px-6 border-t border-white/5 text-center flex flex-col items-center justify-center gap-8 bg-editorial-bg">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center"
        >
          <GrowXLogo className="w-24 h-24 mb-4" color="#FF4D00" stacked showText={false} />
          <div className="space-y-4">
            <p className="text-[10px] opacity-40 uppercase tracking-[0.6em] font-black">© 2026 GROWX TECHNOLOGY STUDIOS. ALL RIGHTS RESERVED.</p>
            <div className="flex items-center justify-center gap-6 text-[10px] uppercase tracking-widest font-bold opacity-30">
              <span className="hover:text-editorial-accent cursor-pointer transition-colors">Privacy Policy</span>
              <div className="w-1 h-1 bg-white rounded-full" />
              <span className="hover:text-editorial-accent cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}

