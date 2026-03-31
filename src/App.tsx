import { motion, AnimatePresence } from "motion/react";
import { createClient } from "@supabase/supabase-js";
import { 
  Calendar, 
  ShoppingBag, 
  MessageCircle, 
  ChevronRight, 
  ChevronDown,
  Star, 
  CheckCircle2, 
  Instagram, 
  MapPin, 
  Clock, 
  Scissors, 
  Sparkles, 
  Droplets,
  BookOpen,
  GraduationCap,
  Users,
  Award,
  ArrowRight,
  Menu,
  X
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

const instagramSliderBg = "/img/instagram-sllider.png";
const lookSliderDesktopBg = "/img/webapp_turnos_mobile.png";
const coursesSliderDesktopBg = "/img/capacitaci%C3%B3n.png";
const siteLogoSrc = "/img/logo web.png";
const siteIsologoSrc = "/img/isologo.png";

const services = [
  {
    title: "Balayage Signature",
    description: "Técnicas de iluminación a mano libre para lograr un rubio natural, luminoso y de muy bajo mantenimiento.",
    details: ["90-120 minutos", "Técnica premium", "Iluminación multidimensional"],
    icon: <Sparkles className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Recuperación Capilar",
    description: "Tratamientos intensivos con activos de última generación para restaurar la fibra dañada.",
    details: ["Nutrición profunda", "Anti-rotura", "Brillo inmediato"],
    icon: <Droplets className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Corte de Autor",
    description: "Diseños estructurados en base a visagismo facial, textura del cabello y estilo de vida.",
    details: ["Visagismo", "Corte personalizado", "Styling incluido"],
    icon: <Scissors className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800"
  }
];

const processSteps = [
  { id: "01", title: "Diagnóstico", description: "Evaluamos base capilar, historial técnico y porosidad." },
  { id: "02", title: "Asesoramiento", description: "Diseñamos una propuesta con tono, técnica y mantenimiento ideal." },
  { id: "03", title: "Servicio", description: "Aplicamos el servicio con tiempos controlados y mezclas precisas." },
  { id: "04", title: "Cuidado", description: "Guía personalizada para prolongar el resultado en casa." }
];

const reviews = [
  { name: "Lucía M.", text: "La mejor experiencia en coloración. Paula entiende exactamente lo que buscás.", rating: 5 },
  { name: "Martina G.", text: "Mi cabello nunca estuvo tan sano después de un balayage. Increíble.", rating: 5 },
  { name: "Sofía R.", text: "El diagnóstico es súper detallado. Te sentís en buenas manos desde el minuto uno.", rating: 5 }
];

const products = [
  {
    id: 1,
    name: "Shampoo Nutritivo",
    price: 4500,
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=400",
    description: "Limpieza profunda y nutrición para cabellos procesados."
  },
  {
    id: 2,
    name: "Máscara Reparadora",
    price: 6200,
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=400",
    description: "Restaura la fibra capilar y devuelve el brillo natural."
  },
  {
    id: 3,
    name: "Aceite de Argán",
    price: 3800,
    image: "https://images.unsplash.com/photo-1601049676099-2c2ea9051a77?auto=format&fit=crop&q=80&w=400",
    description: "Finalizador premium para puntas suaves y sin frizz."
  },
  {
    id: 4,
    name: "Sérum Iluminador",
    price: 5400,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400",
    description: "Potencia el brillo de tu coloración por más tiempo."
  },
  {
    id: 5,
    name: "Protector Térmico",
    price: 4100,
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=400",
    description: "Escudo invisible contra el calor de planchas y secadores."
  }
];

const courses = [
  {
    title: "Masterclass Balayage",
    description: "Técnicas avanzadas de difuminado y transiciones naturales.",
    duration: "8 horas",
    level: "Avanzado",
    icon: <Sparkles className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Colorimetría Científica",
    description: "Entendiendo la química detrás del color para resultados predecibles.",
    duration: "12 horas",
    level: "Intermedio",
    icon: <Droplets className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Corte y Estructura",
    description: "Geometría aplicada al diseño de autor y visagismo.",
    duration: "6 horas",
    level: "Todos los niveles",
    icon: <Scissors className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Business & Salon Management",
    description: "Cómo escalar tu negocio y fidelizar a tus clientes.",
    duration: "4 horas",
    level: "Emprendedores",
    icon: <Users className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=2000"
  }
];

const supabaseClient = createClient(
  "https://svhyzqryvjuodmpybzmq.supabase.co",
  "sb_publishable_7-VGuO-3Rb1GIex87SQzjw_bsBy3mxX"
);

const CASTING_BUCKET = "casting-modelos";

function SiteWordmark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`text-center ${compact ? "" : "px-4"}`}>
      <div className={`${compact ? "text-2xl md:text-4xl" : "text-4xl md:text-7xl"} font-black tracking-tighter leading-none`}>
        PAULA PINTOS
      </div>
      <div className={`mx-auto mt-3 h-px bg-accent ${compact ? "w-full max-w-55 md:max-w-70" : "w-full"}`} />
      <div className={`${compact ? "mt-3 text-[9px] md:text-[10px] tracking-[0.45em]" : "mt-4 text-[10px] tracking-[0.6em]"} uppercase opacity-40 font-bold`}>
        Hair Color Studio
      </div>
    </div>
  );
}

function StoreView({ onBack, isSection = false }: { onBack: () => void, isSection?: boolean }) {
  const [cart, setCart] = useState<{id: number, qty: number}[]>([]);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  
  const addToCart = (id: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) return prev.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { id, qty: 1 }];
    });
  };

  const cartTotal = cart.reduce((acc, item) => {
    const product = products.find(p => p.id === item.id);
    return acc + (product?.price || 0) * item.qty;
  }, 0);

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  const handleWhatsAppCheckout = () => {
    const cartItems = cart.map(item => {
      const product = products.find(p => p.id === item.id);
      return `${product?.name} (x${item.qty}) - $${((product?.price || 0) * item.qty).toLocaleString()}`;
    }).join('\n');
    
    const message = `Hola Paula Pintos Hair Studio! 👋\n\nQuiero realizar un pedido:\n\n${cartItems}\n\n*Total: $${cartTotal.toLocaleString()}*\n\nMis datos:\nNombre: ${bookingData.name}\nDirección: ${bookingData.address}\nCiudad: ${bookingData.city}\nCP: ${bookingData.cp}`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5491122334455?text=${encodedMessage}`, '_blank');
    setIsPaid(true);
  };

  const [bookingData, setBookingData] = useState({
    name: "",
    address: "",
    city: "",
    cp: ""
  });

  if (isPaid) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`${isSection ? "py-20" : "pt-32"} px-6 max-w-3xl mx-auto min-h-[60vh] flex flex-col items-center justify-center text-center`}
      >
        <div className="w-24 h-24 gradient-accent rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-violet-500/40">
          <CheckCircle2 className="w-12 h-12 text-black" />
        </div>
        <h2 className="text-5xl font-black uppercase mb-4">¡Pedido Enviado!</h2>
        <p className="text-xl font-light opacity-60 max-w-md mb-12">Tu pedido ha sido enviado por WhatsApp. Nos pondremos en contacto con vos a la brevedad.</p>
        <button 
          onClick={() => { setIsPaid(false); setIsCheckout(false); setCart([]); if (!isSection) onBack(); }}
          className="px-12 py-5 bg-white text-black rounded-full text-[10px] uppercase tracking-widest font-black hover:scale-105 transition-all"
        >
          {isSection ? "Volver a la Tienda" : "Volver al Inicio"}
        </button>
      </motion.div>
    );
  }

  if (isCheckout) {
    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`${isSection ? "py-20" : "pt-32"} px-6 max-w-5xl mx-auto min-h-screen pb-40`}
      >
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-black uppercase">Finalizar Compra</h2>
          <button onClick={() => setIsCheckout(false)} className="text-[10px] uppercase tracking-widest opacity-60 hover:opacity-100 border border-white/20 px-6 py-2 rounded-full transition-all">Volver al Carrito</button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div className="space-y-6">
              <h3 className="text-xs uppercase tracking-widest font-bold opacity-40">Datos de Envío</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  placeholder="Nombre Completo" 
                  className="md:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:border-accent transition-all" 
                  onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                />
                <input 
                  placeholder="Dirección" 
                  className="md:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:border-accent transition-all" 
                  onChange={(e) => setBookingData({...bookingData, address: e.target.value})}
                />
                <input 
                  placeholder="Ciudad" 
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:border-accent transition-all" 
                  onChange={(e) => setBookingData({...bookingData, city: e.target.value})}
                />
                <input 
                  placeholder="Código Postal" 
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:border-accent transition-all" 
                  onChange={(e) => setBookingData({...bookingData, cp: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xs uppercase tracking-widest font-bold opacity-40">Confirmación</h3>
              <p className="text-sm opacity-60">Al hacer clic en "Confirmar por WhatsApp", se abrirá un chat con nosotros para coordinar el pago y el envío.</p>
            </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-[48px] p-10 h-fit sticky top-32">
            <h3 className="text-xs uppercase tracking-widest font-bold opacity-40 mb-8">Resumen del Pedido</h3>
            <div className="space-y-6 mb-8">
              {cart.map(item => {
                const product = products.find(p => p.id === item.id);
                if (!product) return null;
                return (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/10">
                        <img src={product.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-sm font-bold">{product.name}</div>
                        <div className="text-[10px] opacity-40">Cantidad: {item.qty}</div>
                      </div>
                    </div>
                    <div className="font-bold">${(product.price * item.qty).toLocaleString()}</div>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-white/10 pt-6 space-y-4">
              <div className="flex justify-between opacity-60 text-sm">
                <span>Subtotal</span>
                <span>${cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between opacity-60 text-sm">
                <span>Envío</span>
                <span>¡Gratis!</span>
              </div>
              <div className="flex justify-between text-xl font-black border-t border-white/10 pt-4">
                <span>Total</span>
                <span className="text-gradient-accent">${cartTotal.toLocaleString()}</span>
              </div>
            </div>
            <button 
              onClick={handleWhatsAppCheckout}
              disabled={!bookingData.name || !bookingData.address}
              className="w-full mt-10 py-6 gradient-accent text-black rounded-full text-[11px] uppercase tracking-[0.2em] font-black hover:scale-105 transition-all shadow-2xl shadow-violet-500/20 disabled:opacity-30 flex items-center justify-center gap-3"
            >
              <MessageCircle className="w-5 h-5" />
              Confirmar por WhatsApp
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${isSection ? "py-20" : "pt-32"} px-6 max-w-7xl mx-auto min-h-screen pb-40`}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-accent mb-4 block font-bold">Shop Online</span>
          <h2 className="text-5xl md:text-8xl font-black uppercase leading-none">Tienda</h2>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative group">
              <button className="p-5 bg-white/5 border border-white/10 rounded-full hover:gradient-accent hover:text-black transition-all duration-300 relative">
              <ShoppingBag className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-6 h-6 gradient-accent text-black text-[10px] font-black rounded-full flex items-center justify-center border-2 border-black">
                  {cart.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              )}
            </button>
            
            {/* Cart Preview Tooltip */}
            {cart.length > 0 && (
              <div className="absolute right-0 top-full mt-4 w-72 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-4xl p-6 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-50 shadow-2xl">
                <div className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-4">Tu Carrito</div>
                <div className="space-y-4 mb-6 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  {cart.map(item => {
                    const product = products.find(p => p.id === item.id);
                    if (!product) return null;
                    return (
                      <div key={item.id} className="flex justify-between items-center gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/10">
                            <img src={product.image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="text-[11px] font-bold leading-tight">{product.name}</div>
                            <div className="text-[9px] opacity-40">x{item.qty}</div>
                          </div>
                        </div>
                        <div className="text-[11px] font-bold">${(product.price * item.qty).toLocaleString()}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t border-white/10 pt-4 mb-4 flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-widest opacity-40">Total</span>
                  <span className="text-accent font-black">${cartTotal.toLocaleString()}</span>
                </div>
                <button 
                  onClick={() => setIsCheckout(true)}
                  className="w-full py-3 gradient-accent text-black rounded-full text-[9px] uppercase tracking-widest font-black hover:scale-105 transition-all"
                >
                  Finalizar Compra
                </button>
              </div>
            )}
          </div>
          {!isSection && (
            <button onClick={onBack} className="text-[10px] uppercase tracking-widest opacity-60 hover:opacity-100 border border-white/20 px-8 py-4 rounded-full transition-all">
              Volver
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group bg-white/5 border border-white/5 rounded-[48px] p-8 hover:bg-white/8 transition-all duration-500"
          >
            <div className="aspect-square rounded-4xl overflow-hidden mb-8 relative">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute top-6 right-6">
                <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-accent font-black text-sm">
                  ${product.price.toLocaleString()}
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-black uppercase mb-3">{product.name}</h3>
            <p className="text-sm opacity-50 font-light mb-8 leading-relaxed">{product.description}</p>
            <button 
              onClick={() => addToCart(product.id)}
              className="w-full py-5 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-black hover:gradient-accent hover:text-black hover:border-accent transition-all duration-300 flex items-center justify-center gap-3"
            >
              <ShoppingBag className="w-4 h-4" />
              Añadir al Carrito
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function BookingView({ onBack, initialService = "", isSection = false }: { onBack: () => void, initialService?: string, isSection?: boolean }) {
  const [step, setStep] = useState(1);
  const [isConfirmed, setIsConfirmed] = useState(false);
  
  const servicesList = [
    { title: "Balayage Signature", description: "Técnica premium de iluminación natural.", price: "$18.000", image: "https://images.unsplash.com/photo-1560869713-7d0a29430803" },
    { title: "Recuperación Capilar", description: "Tratamiento intensivo de restauración.", price: "$9.500", image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702" },
    { title: "Corte de Autor", description: "Diseño personalizado según visagismo.", price: "$6.000", image: "https://images.unsplash.com/photo-1562322140-8baeececf3df" },
    { title: "Color Global", description: "Cobertura total con brillo extremo.", price: "$12.000", image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1" },
    { title: "Face Framing", description: "Iluminación estratégica del contorno facial.", price: "$10.500", image: "https://images.unsplash.com/photo-1516914915600-896acb9c0373" },
    { title: "Keratina Premium", description: "Control de frizz y suavidad absoluta.", price: "$14.000", image: "https://images.unsplash.com/photo-1527799822340-304bc647596c" },
    { title: "Peinado Social", description: "Estilismo para eventos especiales.", price: "$7.500", image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11" },
    { title: "Nutrición Express", description: "Brillo y suavidad en 30 minutos.", price: "$5.000", image: "https://images.unsplash.com/photo-1559599101-f09722fb4948" },
    { title: "Diagnóstico Capilar", description: "Análisis detallado de salud capilar.", price: "$3.000", image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f" },
    { title: "Alisado Saludable", description: "Lacio perfecto sin dañar la fibra.", price: "$16.000", image: "https://images.unsplash.com/photo-1560869713-7d0a29430803" }
  ];

  const [bookingData, setBookingData] = useState({
    services: initialService ? [initialService] : [] as string[],
    date: "",
    time: "",
    name: "",
    phone: ""
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const selectedServicesData = servicesList.filter(s => bookingData.services.includes(s.title));

  useEffect(() => {
    if (initialService && !bookingData.services.includes(initialService)) {
      setBookingData(prev => ({ ...prev, services: [...prev.services, initialService] }));
    }
  }, [initialService]);

  if (isConfirmed) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`${isSection ? "py-20" : "pt-12"} px-6 max-w-3xl mx-auto flex flex-col items-center justify-center text-center`}
      >
        <div className="w-20 h-20 gradient-accent rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-violet-500/40">
          <CheckCircle2 className="w-10 h-10 text-black" />
        </div>
        <h2 className="text-4xl font-black uppercase mb-4">¡Turno Reservado!</h2>
        <p className="text-lg font-light opacity-60 max-w-md mb-8">
          Gracias {bookingData.name.split(' ')[0]}, tu cita ha sido registrada con éxito.
        </p>
        <div className="p-6 rounded-4xl bg-white/5 border border-white/10 w-full mb-8 text-left space-y-4">
          <div className="flex justify-between border-b border-white/5 pb-4">
            <span className="opacity-40 text-[10px] uppercase tracking-widest">Servicios</span>
            <span className="font-bold text-accent text-right">{bookingData.services.join(", ")}</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-4">
            <span className="opacity-40 text-[10px] uppercase tracking-widest">Fecha</span>
            <span className="font-bold">{bookingData.date}</span>
          </div>
          <div className="flex justify-between">
            <span className="opacity-40 text-[10px] uppercase tracking-widest">Hora</span>
            <span className="font-bold">{bookingData.time}hs</span>
          </div>
        </div>
        <button 
          onClick={() => { setIsConfirmed(false); setStep(1); setBookingData({ services: [], date: "", time: "", name: "", phone: "" }); onBack(); }}
          className="px-12 py-5 bg-white text-black rounded-full text-[10px] uppercase tracking-widest font-black hover:scale-105 transition-all"
        >
          Cerrar
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`${isSection ? "py-20" : "pt-8"} px-6 max-w-3xl mx-auto pb-40`}
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-accent mb-2 block font-bold">Reserva Online</span>
          <h2 className="text-4xl md:text-5xl font-black uppercase leading-none">Agendar Turno</h2>
        </div>
        <button onClick={onBack} className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="flex gap-3 mb-10">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex-1">
            <div className={`h-1 rounded-full transition-all duration-500 ${step >= i ? "gradient-accent" : "bg-white/10"}`} />
            <span className={`text-[8px] uppercase tracking-widest mt-2 block font-bold ${step === i ? "text-accent" : "opacity-30"}`}>
              {i === 1 ? "Servicios" : i === 2 ? "Fecha y Hora" : "Tus Datos"}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="max-h-100 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
              {servicesList.map((s) => (
                <button 
                  key={s.title}
                  onClick={() => { 
                    const newServices = bookingData.services.includes(s.title)
                      ? bookingData.services.filter(item => item !== s.title)
                      : [...bookingData.services, s.title];
                    setBookingData({ ...bookingData, services: newServices });
                  }}
                  className={`group w-full p-5 rounded-3xl border text-left transition-all duration-300 relative overflow-hidden ${bookingData.services.includes(s.title) ? "border-accent bg-violet-500/10" : "border-white/10 hover:border-white/30 hover:bg-white/5"}`}
                >
                  <div className="flex justify-between items-center relative z-10">
                    <div className="pr-4">
                      <div className="text-lg font-bold mb-1 leading-tight">{s.title}</div>
                      <div className="text-[11px] opacity-50 font-light">{s.description}</div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${bookingData.services.includes(s.title) ? "bg-accent border-accent text-black" : "border-white/20"}`}>
                      {bookingData.services.includes(s.title) && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="pt-4">
              <button 
                onClick={nextStep}
                disabled={bookingData.services.length === 0}
                className="w-full py-5 rounded-full gradient-accent text-black text-[10px] uppercase tracking-widest font-black disabled:opacity-30 hover:scale-[1.02] transition-all shadow-xl shadow-violet-500/20"
              >
                Continuar ({bookingData.services.length} seleccionados)
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="p-5 rounded-3xl bg-white/5 border border-white/10">
              <div className="text-[9px] uppercase tracking-widest opacity-40 mb-2">Servicios seleccionados</div>
              <div className="flex flex-wrap gap-2">
                {bookingData.services.map(s => (
                  <span key={s} className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-[10px] text-accent font-bold">{s}</span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold mb-4 opacity-60">Seleccioná la fecha</h4>
                <input 
                  type="date" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-accent outline-none transition-all text-sm"
                  onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold mb-4 opacity-60">Seleccioná el horario</h4>
                <div className="grid grid-cols-3 gap-2">
                  {["10:00", "11:30", "14:00", "15:30", "17:00", "18:30"].map((t) => (
                    <button 
                      key={t}
                      onClick={() => setBookingData({ ...bookingData, time: t })}
                      className={`py-3 rounded-xl border text-[11px] font-bold transition-all duration-300 ${bookingData.time === t ? "border-accent gradient-accent text-black" : "border-white/10 hover:border-white/30"}`}
                    >
                      {t}hs
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button onClick={prevStep} className="flex-1 py-4 rounded-full border border-white/10 text-[10px] uppercase tracking-widest font-bold hover:bg-white/5 transition-all">Atrás</button>
              <button 
                onClick={nextStep} 
                disabled={!bookingData.date || !bookingData.time}
                className="flex-1 py-4 rounded-full gradient-accent text-black text-[10px] uppercase tracking-widest font-bold disabled:opacity-30 hover:scale-105 transition-all shadow-xl shadow-violet-500/20"
              >
                Siguiente Paso
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest opacity-40 ml-4">Nombre Completo</label>
                <input 
                  placeholder="Ej: María García"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-accent outline-none transition-all text-sm"
                  onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest opacity-40 ml-4">WhatsApp</label>
                <input 
                  placeholder="Ej: +54 9 11 1234 5678"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-accent outline-none transition-all text-sm"
                  onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="p-6 rounded-4xl bg-violet-500/5 border border-accent/20 space-y-4">
              <div className="text-[9px] uppercase tracking-[0.3em] text-accent font-bold">Resumen de tu Reserva</div>
              <div className="flex justify-between items-start">
                <div className="max-w-[70%]">
                  <div className="text-xl font-black mb-1 leading-tight">{bookingData.services.join(", ")}</div>
                  <div className="text-[11px] opacity-60 flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> {bookingData.date}
                    <Clock className="w-3 h-3 ml-2" /> {bookingData.time}hs
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] uppercase tracking-widest opacity-40 mb-1">Profesional</div>
                  <div className="text-xs font-bold">Paula Pintos</div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button onClick={prevStep} className="flex-1 py-4 rounded-full border border-white/10 text-[10px] uppercase tracking-widest font-bold hover:bg-white/5 transition-all">Atrás</button>
              <button 
                onClick={() => setIsConfirmed(true)}
                disabled={!bookingData.name || !bookingData.phone}
                className="flex-1 py-4 rounded-full gradient-accent text-black text-[10px] uppercase tracking-widest font-black disabled:opacity-30 hover:scale-105 transition-all shadow-xl shadow-violet-500/20"
              >
                Confirmar Turno
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ModelView({ onBack, isSection = false }: { onBack: () => void, isSection?: boolean }) {
  const [step, setStep] = useState(1);
  const [modelData, setModelData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    whatsapp: "",
    instagram: "",
    foto: null as File | null
  });
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const nextStep = () => setStep(s => s + 1);

  const resetForm = () => {
    setStep(1);
    setFormError("");
    setModelData({
      nombre: "",
      apellido: "",
      correo: "",
      whatsapp: "",
      instagram: "",
      foto: null
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormError("");

    if (!file) {
      setModelData((prev) => ({ ...prev, foto: null }));
      return;
    }

    const fileName = file.name.toLowerCase();
    const isJpgType = file.type === "image/jpeg" || fileName.endsWith(".jpg") || fileName.endsWith(".jpeg");
    if (!isJpgType) {
      setFormError("La foto debe ser JPG o JPEG.");
      e.target.value = "";
      setModelData((prev) => ({ ...prev, foto: null }));
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setFormError("La foto no debe superar 8MB.");
      e.target.value = "";
      setModelData((prev) => ({ ...prev, foto: null }));
      return;
    }

    setModelData((prev) => ({ ...prev, foto: file }));
  };

  const submitCasting = async () => {
    setFormError("");

    if (!modelData.nombre || !modelData.apellido || !modelData.correo || !modelData.whatsapp || !modelData.instagram || !modelData.foto) {
      setFormError("Completá todos los datos y adjuntá una foto JPG.");
      return;
    }

    setIsSubmitting(true);
    try {
      const safeBaseName = `${modelData.nombre}_${modelData.apellido}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "") || "postulante";
      const filePath = `casting/${Date.now()}_${safeBaseName}.jpg`;

      const { error: uploadError } = await supabaseClient.storage
        .from(CASTING_BUCKET)
        .upload(filePath, modelData.foto, {
          contentType: "image/jpeg",
          upsert: false
        });

      if (uploadError) {
        throw new Error(`No se pudo subir la foto: ${uploadError.message}`);
      }

      const { data: publicFileData } = supabaseClient.storage
        .from(CASTING_BUCKET)
        .getPublicUrl(filePath);

      const { error: insertError } = await supabaseClient
        .from("casting_postulaciones")
        .insert([
          {
            nombre: modelData.nombre.trim(),
            apellido: modelData.apellido.trim(),
            correo: modelData.correo.trim(),
            whatsapp: modelData.whatsapp.trim(),
            instagram: modelData.instagram.trim(),
            foto_path: filePath,
            foto_url: publicFileData.publicUrl
          }
        ]);

      if (insertError) {
        throw new Error(`No se pudo guardar la postulación: ${insertError.message}`);
      }

      setIsConfirmed(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Ocurrió un error al enviar la postulación.";
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isConfirmed) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`${isSection ? "py-20" : "pt-32"} px-6 max-w-3xl mx-auto min-h-[60vh] flex flex-col items-center justify-center text-center`}
      >
        <div className="w-24 h-24 gradient-accent rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-violet-500/40">
          <Sparkles className="w-12 h-12 text-black" />
        </div>
        <h2 className="text-5xl font-black uppercase mb-4">¡Postulación Recibida!</h2>
        <p className="text-xl font-light opacity-60 max-w-md mb-12">
          Gracias {modelData.nombre}, recibimos tus datos y tu foto. Si tu perfil encaja con una arteada, te contactaremos por WhatsApp o Instagram.
        </p>
        <button 
          onClick={() => {
            setIsConfirmed(false);
            resetForm();
            if (!isSection) onBack();
          }}
          className="px-12 py-5 bg-white text-black rounded-full text-[10px] uppercase tracking-widest font-black hover:scale-105 transition-all"
        >
          {isSection ? "Nueva Postulación" : "Volver al Inicio"}
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`${isSection ? "py-20" : "pt-32"} px-6 max-w-3xl mx-auto min-h-screen pb-40`}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-accent mb-4 block font-bold">Casting Abierto</span>
          <h2 className="text-5xl md:text-7xl font-black uppercase leading-none">Ser Modelo</h2>
        </div>
        {!isSection && (
          <button onClick={onBack} className="text-[10px] uppercase tracking-widest opacity-60 hover:opacity-100 border border-white/20 px-6 py-2 rounded-full transition-all">Cancelar</button>
        )}
      </div>

      <div className="flex gap-4 mb-16">
        {[1, 2].map((i) => (
          <div key={i} className="flex-1">
            <div className={`h-1 rounded-full transition-all duration-500 ${step >= i ? "gradient-accent" : "bg-white/10"}`} />
            <span className={`text-[9px] uppercase tracking-widest mt-2 block font-bold ${step === i ? "text-accent" : "opacity-30"}`}>
              {i === 1 ? "Requisitos" : "Tus Datos"}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="p-8 rounded-[36px] bg-white/5 border border-white/10 space-y-4">
              <h3 className="text-2xl font-black uppercase">Requisitos Para Artear</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                Si sos de esas personas que les gusta los cambios extremos, esta es tu sección.
              </p>
              <p className="text-sm opacity-80 leading-relaxed">
                Para poder lograr una arteada increíble, buscamos personas con cabello virgen; sin tratamientos alisantes con formol; que no estén teñidas de negro; ni cabellos muy procesados.
              </p>
              <p className="text-sm opacity-80 leading-relaxed">
                También suman mucho quienes quieran raparse para hacer un diseño o hacerse un corte fuera de lo convencional.
              </p>
              <p className="text-sm opacity-80 leading-relaxed">
                Si cumplís con estos requisitos, esperamos conocerte. Recordá adjuntar una foto de tu cabello de espalda y otra de costado, con luz del día.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-accent/30 text-accent text-[10px] uppercase tracking-widest font-bold">
                  Casting abierto
                </span>
              </div>
            </div>
            <button 
              onClick={nextStep} 
              className="w-full py-5 rounded-full gradient-accent text-black text-[10px] uppercase tracking-widest font-black disabled:opacity-30 hover:scale-[1.02] transition-all shadow-xl shadow-violet-500/20"
            >
              Cumplo requisitos, continuar
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest opacity-40 ml-4">Nombre</label>
                  <input
                    placeholder="Ej: Lucía"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-accent outline-none transition-all"
                    onChange={(e) => setModelData({ ...modelData, nombre: e.target.value })}
                    value={modelData.nombre}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest opacity-40 ml-4">Apellido</label>
                  <input
                    placeholder="Ej: Fernández"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-accent outline-none transition-all"
                    onChange={(e) => setModelData({ ...modelData, apellido: e.target.value })}
                    value={modelData.apellido}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest opacity-40 ml-4">Correo</label>
                <input
                  type="email"
                  placeholder="Ej: correo@dominio.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-accent outline-none transition-all"
                  onChange={(e) => setModelData({ ...modelData, correo: e.target.value })}
                  value={modelData.correo}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest opacity-40 ml-4">WhatsApp</label>
                <input
                  placeholder="Ej: +54 9 11 1234 5678"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-accent outline-none transition-all"
                  onChange={(e) => setModelData({ ...modelData, whatsapp: e.target.value })}
                  value={modelData.whatsapp}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest opacity-40 ml-4">Instagram</label>
                <input
                  placeholder="Ej: @usuario"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-accent outline-none transition-all"
                  onChange={(e) => setModelData({ ...modelData, instagram: e.target.value })}
                  value={modelData.instagram}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest opacity-40 ml-4">Adjuntar foto JPG</label>
                <input
                  type="file"
                  accept=".jpg,.jpeg,image/jpeg"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-accent outline-none transition-all file:mr-3 file:rounded-full file:border-0 file:px-4 file:py-2 file:text-[10px] file:uppercase file:tracking-widest file:font-bold file:bg-accent file:text-black"
                  onChange={handleFileChange}
                />
                {modelData.foto && (
                  <p className="text-xs text-accent">Archivo seleccionado: {modelData.foto.name}</p>
                )}
              </div>
            </div>

            {formError && (
              <div className="rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {formError}
              </div>
            )}

            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="flex-1 py-5 rounded-full border border-white/10 text-[10px] uppercase tracking-widest font-bold hover:bg-white/5 transition-all">Atrás</button>
              <button 
                onClick={submitCasting}
                disabled={isSubmitting}
                className="flex-1 py-5 rounded-full gradient-accent text-black text-[10px] uppercase tracking-widest font-black disabled:opacity-30 hover:scale-105 transition-all shadow-xl shadow-violet-500/20"
              >
                {isSubmitting ? "Enviando..." : "Enviar postulación"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const slides = [
  {
    id: "look",
    title: "Cambia tu look",
    subtitle: "Paula Pintos Hair Studio",
    video: "/video/video-cambio-tu-look.mp4",
    cta: "Agendar Turno",
    action: "agendarturno-externa"
  },
  {
    id: "model",
    title: "Postulate como modelo",
    subtitle: "Sé parte de nuestras producciones",
    video: "https://player.vimeo.com/external/434045526.sd.mp4?s=c27db96a9db4e3240239940325003ce5a0390696&profile_id=165&oauth2_token_id=57447761",
    mobileVideo: "/video/modelo.mp4",
    cta: "Postularse",
    action: "model"
  },
  {
    id: "products",
    title: "Cuidado desde casa",
    subtitle: "Productos profesionales para vos",
    video: "https://player.vimeo.com/external/517090081.sd.mp4?s=454cabc046506d77678976759903fa2e93427249&profile_id=165&oauth2_token_id=57447761",
    cta: "Ver Tienda",
    action: "tienda-externa"
  },
  {
    id: "courses",
    title: "Colorimetría",
    subtitle: "Capacitaciones profesionales",
    video: "/video/video-colorimetr%C3%ADa.mp4",
    cta: "Consultar por WhatsApp",
    action: "whatsapp-colorimetria"
  },
  {
    id: "instagram",
    title: "Seguinos",
    subtitle: "@paulapintos.hair",
    video: "https://player.vimeo.com/external/459389137.sd.mp4?s=964459461159336b9557404e135f6f4c7d039750&profile_id=165&oauth2_token_id=57447761",
    cta: "Ir a Instagram",
    action: "instagram"
  }
];

function SiteFooter() {
  return (
    <footer className="relative z-40 bg-black py-20 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="flex items-center justify-center md:justify-start">
          <img src={siteIsologoSrc} alt="Paula Pintos" className="h-20 w-auto object-contain opacity-90" />
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4 opacity-60">
            <MapPin className="w-5 h-5" />
            <span className="text-sm">Buenos Aires, Argentina</span>
          </div>
          <div className="flex items-center gap-4 opacity-60">
            <Clock className="w-5 h-5" />
            <span className="text-sm">Mar - Sab: 10:00 - 19:00</span>
          </div>
        </div>
        <div className="flex gap-6">
          <a href="https://www.instagram.com/pau.pintos/" target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 rounded-full hover:bg-white/10 transition-all">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="#" className="p-4 bg-white/5 rounded-full hover:bg-white/10 transition-all">
            <MessageCircle className="w-6 h-6" />
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-[10px] uppercase tracking-widest opacity-30">© 2026 Paula Pintos Hair Studio</span>
        <span className="text-[10px] uppercase tracking-widest opacity-30">Diseno por Libca Digital</span>
      </div>
    </footer>
  );
}

function SiteHeader({ onHome }: { onHome: () => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-70 px-4 py-4 md:px-6 md:py-6 pointer-events-none">
      <div className="mx-auto max-w-7xl flex justify-center">
        <button
          type="button"
          onClick={onHome}
            className="pointer-events-auto inline-flex items-center justify-center px-6 py-4 md:px-10 md:py-5 transition-opacity hover:opacity-85"
          aria-label="Ir al inicio"
        >
          <SiteWordmark compact />
        </button>
      </div>
    </header>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState<"home" | "booking" | "store" | "model" | "courses">("home");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const sliderAnimationFrameRef = useRef<number | null>(null);
  const sliderAutoplayMs = 8200;
  const sliderScrollDurationMs = 1600;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const syncViewport = () => setIsMobileViewport(mediaQuery.matches);

    syncViewport();
    mediaQuery.addEventListener("change", syncViewport);

    return () => {
      mediaQuery.removeEventListener("change", syncViewport);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (sliderAnimationFrameRef.current !== null) {
        window.cancelAnimationFrame(sliderAnimationFrameRef.current);
      }
    };
  }, []);

  // Auto-play logic
  useEffect(() => {
    if (activeView !== "home" || isLoading) return;

    const interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % slides.length;
      scrollToSlide(nextSlide);
    }, sliderAutoplayMs);

    return () => clearInterval(interval);
  }, [currentSlide, activeView, isLoading, sliderAutoplayMs]);

  const scrollToSlide = (index: number) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const startLeft = container.scrollLeft;
      const targetLeft = index * window.innerWidth;
      const distance = targetLeft - startLeft;

      if (distance === 0) {
        setCurrentSlide(index);
        return;
      }

      if (sliderAnimationFrameRef.current !== null) {
        window.cancelAnimationFrame(sliderAnimationFrameRef.current);
      }

      const duration = sliderScrollDurationMs;
      const startTime = performance.now();
      const easeInOutQuart = (progress: number) =>
        progress < 0.5
          ? 8 * progress * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 4) / 2;

      const animateScroll = (timestamp: number) => {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeInOutQuart(progress);

        container.scrollLeft = startLeft + distance * easedProgress;

        if (progress < 1) {
          sliderAnimationFrameRef.current = window.requestAnimationFrame(animateScroll);
          return;
        }

        sliderAnimationFrameRef.current = null;
        setCurrentSlide(index);
      };

      sliderAnimationFrameRef.current = window.requestAnimationFrame(animateScroll);
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = window.innerWidth;
      const index = Math.round(scrollLeft / width);
      if (index !== currentSlide) {
        setCurrentSlide(index);
      }
    }
  };

  const handleVerticalScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollY(e.currentTarget.scrollTop);
  };

  const handleCTA = (action: string) => {
    if (action === "instagram") {
      window.open("https://www.instagram.com/pau.pintos/", "_blank");
      return;
    }
    if (action === "booking" || action === "agendarturno-externa") {
      window.location.href = "/agendar turno.html";
      return;
    }
    if (action === "store" || action === "tienda-externa") {
      window.location.href = "/tienda.html";
      return;
    }
    if (action === "whatsapp-colorimetria") {
      window.open("https://wa.me/5491122334455?text=Hola%20quiero%20consultar%20por%20los%20cursos%20de%20colorimetria", "_blank");
      return;
    }
    setActiveView(action as any);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-paper text-ink overflow-x-hidden">
      {!isLoading && <SiteHeader onHome={() => setActiveView("home")} />}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.8, ease: "easeInOut" }
            }}
            className="fixed inset-0 z-100 bg-black flex flex-col items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-center"
            >
              <motion.div
                initial={{ letterSpacing: "0.2em", opacity: 0 }}
                animate={{ letterSpacing: "-0.02em", opacity: 1 }}
                transition={{ duration: 1.5, ease: "circOut" }}
              >
                <SiteWordmark />
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {!isLoading && activeView === "home" ? (
          <motion.div
            key="home"
            ref={mainContainerRef}
            onScroll={handleVerticalScroll}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative h-screen overflow-y-auto no-scrollbar scroll-smooth"
          >
            {/* Horizontal Slider Section */}
            <div className="relative z-0 h-screen overflow-hidden shrink-0">
              <div 
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex h-screen snap-x snap-mandatory overflow-x-auto no-scrollbar"
              >
                {slides.map((slide, index) => (
                  <section 
                    key={slide.id}
                    className="relative h-screen min-w-full snap-center flex flex-col items-center justify-center overflow-hidden"
                  >
                    {/* Video Background */}
                    <div className="absolute inset-0 z-0">
                      {slide.id === "instagram" ? (
                        <img
                          src={instagramSliderBg}
                          alt="Instagram"
                          className="w-full h-full object-cover opacity-70"
                        />
                      ) : slide.id === "products" ? (
                        <>
                          <motion.div
                            className="absolute inset-0"
                            style={{
                              background:
                                "linear-gradient(135deg, #020202 0%, #14081f 32%, #4c1d95 68%, #09030f 100%)",
                              backgroundSize: "180% 180%"
                            }}
                            animate={{
                              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                              scale: [1, 1.06, 1]
                            }}
                            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                          />
                          <motion.div
                            className="absolute inset-0"
                            style={{
                              background:
                                "radial-gradient(circle at 20% 20%, rgba(168, 85, 247, 0.42) 0%, transparent 36%), radial-gradient(circle at 82% 32%, rgba(91, 33, 182, 0.34) 0%, transparent 34%), radial-gradient(circle at 50% 78%, rgba(0, 0, 0, 0.55) 0%, transparent 42%)"
                            }}
                            animate={{
                              opacity: [0.55, 0.85, 0.55],
                              scale: [1, 1.08, 1],
                              x: ["-2%", "2%", "-2%"],
                              y: ["-1%", "2%", "-1%"]
                            }}
                            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                          />
                        </>
                      ) : slide.id === "look" && !isMobileViewport ? (
                        <img
                          src={lookSliderDesktopBg}
                          alt="Cambia tu look"
                          className="w-full h-full object-cover opacity-70"
                        />
                      ) : slide.id === "courses" && !isMobileViewport ? (
                        <img
                          src={coursesSliderDesktopBg}
                          alt="Colorimetria"
                          className="w-full h-full object-cover opacity-70"
                        />
                      ) : (
                        <video
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-cover opacity-60"
                        >
                          <source src={slide.id === "model" && isMobileViewport ? slide.mobileVideo : slide.video} type="video/mp4" />
                        </video>
                      )}
                      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/80" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 text-center px-6 max-w-4xl">
                      <motion.span
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                        className="text-xs uppercase tracking-[0.4em] text-accent font-bold mb-4 block"
                      >
                        {slide.subtitle}
                      </motion.span>
                      <motion.h2
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="text-5xl md:text-8xl font-black uppercase mb-8 leading-none"
                      >
                          {slide.title}
                      </motion.h2>
                      <motion.button
                        initial={{ opacity: 0, y: 22 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.1, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
                        onClick={() => handleCTA(slide.action)}
                        className="group relative px-12 py-5 bg-white text-black rounded-full text-[10px] uppercase tracking-widest font-black hover:scale-105 transition-all overflow-hidden"
                      >
                        <span className="relative z-10">{slide.cta}</span>
                        <div className="absolute inset-0 gradient-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.button>
                    </div>
                  </section>
                ))}
              </div>

              {/* Navigation Dots */}
              <div className="absolute bottom-40 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToSlide(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentSlide === idx ? "bg-accent w-8" : "bg-white/30 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>

              {/* Scroll Indicator Arrow */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: scrollY > 100 ? 0 : 0.4 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 animate-bounce pointer-events-none"
              >
                <ChevronDown className="w-6 h-6 text-white" />
              </motion.div>
            </div>

            {/* Footer below sliders */}
            <SiteFooter />
          </motion.div>
        ) : activeView === "booking" ? (
          <div key="booking" className="min-h-screen bg-paper pt-12">
            <BookingView onBack={() => setActiveView("home")} />
            <SiteFooter />
          </div>
        ) : activeView === "store" ? (
          <div key="store" className="min-h-screen bg-paper">
            <StoreView onBack={() => setActiveView("home")} />
            <SiteFooter />
          </div>
        ) : activeView === "model" ? (
          <div key="model" className="min-h-screen bg-paper">
            <ModelView onBack={() => setActiveView("home")} />
            <SiteFooter />
          </div>
        ) : activeView === "courses" ? (
          <div key="courses" className="min-h-screen bg-paper pt-32 px-6 pb-40">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-16">
                <h2 className="text-5xl md:text-8xl font-black uppercase">Cursos</h2>
                <button onClick={() => setActiveView("home")} className="text-[10px] uppercase tracking-widest opacity-60 hover:opacity-100 border border-white/20 px-8 py-4 rounded-full transition-all">
                  Volver
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {courses.map((course, idx) => (
                  <div key={idx} className="group bg-white/5 border border-white/10 rounded-[48px] overflow-hidden hover:bg-white/8 transition-all duration-500">
                    <div className="aspect-video relative overflow-hidden">
                      <img src={course.image} alt="" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                      <div className="absolute top-6 right-6">
                        <span className="px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest">{course.level}</span>
                      </div>
                    </div>
                    <div className="p-10">
                      <h3 className="text-3xl font-black uppercase mb-4">{course.title}</h3>
                      <p className="text-sm opacity-50 mb-8 leading-relaxed">{course.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold opacity-40">{course.duration}</span>
                        <button className="px-8 py-4 gradient-accent text-black rounded-full text-[10px] uppercase tracking-widest font-black hover:scale-105 transition-all">Inscribirse</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <SiteFooter />
          </div>
        ) : null}
      </AnimatePresence>

      {/* Fixed Bottom Bar (Zócalo Fijo) */}
      {activeView !== "model" && (
      <div className="fixed bottom-0 left-0 right-0 z-60 p-6 pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto">
          <div className="glass rounded-full p-2 flex items-center justify-between bottom-nav-shadow">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveView("home")}
              className={`flex-1 py-4 rounded-full flex items-center justify-center transition-all ${activeView === "home" ? "gradient-accent text-black shadow-lg shadow-purple-500/20" : "hover:bg-white/5 text-white/60"}`}
            >
              <Sparkles className="w-5 h-5" />
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => window.location.href = "/agendarturno.html"}
              className={`flex-1 py-4 rounded-full flex items-center justify-center transition-all ${activeView === "booking" ? "gradient-accent text-black shadow-lg shadow-purple-500/20" : "hover:bg-white/5 text-white/60"}`}
            >
              <Calendar className="w-5 h-5" />
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => window.location.href = "/tienda.html"}
              className={`flex-1 py-4 rounded-full flex items-center justify-center transition-all ${activeView === "store" ? "gradient-accent text-black shadow-lg shadow-purple-500/20" : "hover:bg-white/5 text-white/60"}`}
            >
              <ShoppingBag className="w-5 h-5" />
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveView("model")}
              className={`flex-1 py-4 rounded-full flex items-center justify-center transition-all ${activeView === "model" ? "gradient-accent text-black shadow-lg shadow-purple-500/20" : "hover:bg-white/5 text-white/60"}`}
            >
              <Users className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
