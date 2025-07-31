import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, animate, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote, Loader2 } from 'lucide-react';
import { Reference, ReferenceCarouselProps, ButtonProps } from '../types/reference';

// Button component with proper TypeScript
const Button: React.FC<ButtonProps> = ({ 
  variant = "default", 
  size = "default", 
  className = "", 
  children, 
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  
  const variantClasses: Record<string, string> = {
    default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
    ghost: "hover:bg-accent hover:text-accent-foreground"
  };
  
  const sizeClasses: Record<string, string> = {
    default: "h-9 px-4 py-2",
    icon: "h-9 w-9"
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// ReferenceCarousel component with proper TypeScript
const ReferenceCarousel: React.FC<ReferenceCarouselProps> = ({ references = [] }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  
  const autoplayIntervalRef = useRef<number | null>(null);
  const x = useMotionValue(0);
  const dragThreshold = 100;

  const spring = {
    type: "spring" as const,
    stiffness: 350,
    damping: 40,
  };
  
  const stopAutoplay = (): void => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
      autoplayIntervalRef.current = null;
    }
  };

  const startAutoplay = (): void => {
    stopAutoplay();
    if (references.length > 1) {
      autoplayIntervalRef.current = setInterval(() => {
        setCurrentIndex((prev: number) => (prev + 1) % references.length);
      }, 5000);
    }
  };

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [references.length]);

  const goToSlide = (index: number): void => {
    stopAutoplay();
    setCurrentIndex(index);
    animate(x, 0, spring);
    setTimeout(startAutoplay, 5000);
  };

  const goToPrevious = (): void => {
    const newIndex = (currentIndex - 1 + references.length) % references.length;
    goToSlide(newIndex);
  };

  const goToNext = (): void => {
    const newIndex = (currentIndex + 1) % references.length;
    goToSlide(newIndex);
  };

  const handleDragStart = (): void => {
    setIsDragging(true);
    stopAutoplay();
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
    setTimeout(() => setIsDragging(false), 100);

    const offset = info.offset.x;
    const velocity = info.velocity.x;
    
    if (Math.abs(offset) > dragThreshold || Math.abs(velocity) > 300) {
      if (offset > 0 || velocity > 300) {
        goToPrevious();
      } else {
        goToNext();
      }
    } else {
      animate(x, 0, spring);
      setTimeout(startAutoplay, 5000);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>): void => {
    const target = e.target as HTMLImageElement;
    const parent = target.parentElement;
    if (parent) {
      target.style.display = 'none';
      const reference = references[currentIndex];
      parent.innerHTML = `<div class="w-full h-full flex items-center justify-center"><span class="text-2xl font-bold text-gray-500">${reference?.name?.charAt(0) || '?'}</span></div>`;
    }
  };

  if (!references.length) {
    return (
      <div className="w-full  mx-auto">
        <div className="text-center text-gray-500">
          No references available
        </div>
      </div>
    );
  }

  return (
    
    <div className="w-full max-5xl:  mx-auto relative overflow-hidden select-none ">
      {/* Background gradient */}
      <div className="absolute inset-0  rounded-3xl" />
      
      {/* Ambient light effects */}
      <motion.div 
        className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-xl"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <div className="relative z-10">
        {/* Navigation arrows */}
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPrevious}
          className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 text-black hover:text-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={goToNext}
          className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 text-black hover:text-white"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>

        {/* Main carousel container */}
        <div className="flex items-center justify-center min-h-[500px] cursor-grab active:cursor-grabbing">
          <motion.div 
            className="relative w-full flex items-center justify-center"
            style={{ x }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            whileDrag={{ cursor: "grabbing" }}
          >
            <AnimatePresence initial={false} mode="popLayout">
              {references.map((reference: Reference, index: number) => {
                const isActive = index === currentIndex;
                const offset = index - currentIndex;
                const normalizedOffset = offset > references.length / 2 ? offset - references.length : 
                                       offset < -references.length / 2 ? offset + references.length : offset;

                return (
                  <motion.div
                    key={reference.id}
                    className="absolute"
                    style={{
                      zIndex: references.length - Math.abs(normalizedOffset),
                    }}
                    initial={{
                       x: normalizedOffset * 300,
                       scale: 0.5,
                       opacity: 0
                    }}
                    animate={{ 
                      x: normalizedOffset * 220,
                      scale: isActive ? 1 : 0.7,
                      opacity: isActive ? 1 : 0.3
                    }}
                    exit={{ opacity: 0, scale: 0.3 }}
                    transition={spring}
                    onClick={() => {
                      if (!isActive && !isDragging) {
                        goToSlide(index);
                      }
                    }}
                    whileHover={!isActive ? { 
                      opacity: 0.6,
                      scale: 0.75,
                    } : {}}
                  >
                    {/* Glass card */}
                    <motion.div 
                      className="w-80 md:w-96 bg-cyan/30 backdrop-blur border border-white/20 rounded-2xl p-8 shadow-xl"
                      whileHover={isActive ? { 
                        y: -5,
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                      } : {}}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {/* Quote icon */}
                      <motion.div 
                        className="absolute -top-1 -left-1 w-12 h-12 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full flex items-center justify-center shadow-lg"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Quote className="w-6 h-6 text-gray-600" />
                      </motion.div>

                      {/* Profile section */}
                      <div className="flex flex-col items-center mb-6">
                        {reference.photo_url ? (
                          <motion.div 
                            className="relative mb-4"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <div className="w-30 h-30 rounded overflow-hidden shadow-lg">
                              <img 
                                src={reference.photo_url} 
                                alt={reference.name}
                                className="w-full h-full object-cover"
                                onError={handleImageError}
                              />
                            </div>
                            {/* Glow effect */}
                            <motion.div 
                              className="absolute inset-0 w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20 blur-sm"
                              animate={{ 
                                opacity: [0.2, 0.4, 0.2],
                                scale: [1, 1.1, 1]
                              }}
                              transition={{ 
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                          </motion.div>
                        ) : (
                          <motion.div 
                            className="w-20 h-20 rounded-fullbg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center mb-4 border-3 border-white/30 shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <span className="text-2xl font-bold text-gray-600">
                              {reference.name?.charAt(0) || '?'}
                            </span>
                          </motion.div>
                        )}
                        
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentIndex}
                            className="text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { delay: 0.2 } }}
                            exit={{ opacity: 0 }}
                          >
                            <h3 className="text-xl font-bold text-gray-600 mb-1">
                              {reference.name}
                            </h3>
                            {reference.title && (
                              <p className="from-cyan-400 to-blue-600 text-md font-medium mb-1">
                                {reference.title}
                              </p>
                            )}
                            {reference.company && (
                              <p className="text-gray-600/70 text-sm">
                                {reference.company}
                              </p>
                            )}
                          </motion.div>
                        </AnimatePresence>

                        {/* Rating stars */}
                        {reference.rating && (
                          <motion.div 
                            className="flex gap-1 mt-3"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, type: "spring" }}
                          >
                            {Array.from({ length: 5 }).map((_, i: number) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ 
                                  delay: 0.5 + i * 0.1,
                                  type: "spring",
                                  stiffness: 500,
                                  damping: 25
                                }}
                                whileHover={{ scale: 1.2, rotate: 5 }}
                              >
                                <Star
                                  className={`w-4 h-4 ${
                                    i < reference.rating 
                                      ? 'text-yellow-400 fill-yellow-400' 
                                      : 'text-gray-600/30'
                                  }`}
                                />
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </div>

                      {/* Statement */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentIndex}
                          className="text-center"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <p className="text-gray-600/90 leading-relaxed text-sm md:text-base font-light italic">
                            "{reference.statement}"
                          </p>
                        </motion.div>
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-3 mt-8">
          {references.map((_, index: number) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                index === currentIndex
                  ? 'bg-cyan-400'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              animate={index === currentIndex ? {
                scale: 1.4,
              } : { scale: 1 }}
              transition={spring}
            />
          ))}
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center mt-6">
          <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / references.length) * 100}%` }}
              transition={spring}
            />
          </div>
        </div>

        {/* Drag hint */}
        <motion.div
          className="flex justify-center mt-4"
          animate={{ opacity: isDragging ? 0 : [1, 0.5, 1] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <p className="text-gray-600/40 text-xs font-light">
            ← Drag to navigate →
          </p>
        </motion.div>
      </div>
    </div>
  
  );
  
};

// Fallback data in case JSON file isn't available
const fallbackReferences: Reference[] = [
  {
    "id": 1,
    "name": "Jeff",
    "title": "Teacher",
    "statement": "Jordan displays a great capacity to communicate and has performed admirably in the courses I have taught. I see Jordan's performance in class and his establishing himself as a leader among his peers.",
    "photo_url": "/images/references/jeff.jpg",
    "rating": 5
  },
  {
    "id": 2,
    "name": "Weiyun",
    "title": "Friend",
    "statement": "Jordan is honest, intelligent and responsible, but more than that, he is full of life. He earns the trust of people that surround him and I consider him a truly outstanding character.",
    "photo_url": "/images/references/weiyun.jpg",
    "rating": 5
  },
  {
    "id": 3,
    "name": "Kai",
    "title": "Son",
    "statement": "I have the best dad in my opinion and he helps me a lot with stuff and he works really hard on his homework.",
    "photo_url": "/images/references/kai.jpg",
    "rating": 5
  },
  {
    "id": 4,
    "name": "Nate",
    "title": "Friend",
    "statement": "I met Jordan when he moved in across the street. He brought the whole neighborhood together—people who hadn't even said hello in years. Our families are lifelong friends now.",
    "photo_url": "/images/references/nate.jpg",
    "rating": 5
  },
  {
    "id": 5,
    "name": "Mariyla",
    "title": "Daughter",
    "statement": "My dad is tough on me, but I respect him and I know he loves me. My friends think I have the best dad in the world too. I seriously think he is like a super hero.",
    "photo_url": "/images/references/mariyla.jpg",
    "rating": 5
  },
  {
    "id": 6,
    "name": "Scott",
    "title": "Former Boss",
    "statement": "I choose Jordan to be a part of my crew when I had the chance, because when it came down to the fine details and those situations that make or break something big, those details are everything. One star rating because he is unavible for hire now",
    "photo_url": "/images/references/scott.jpg",
    "rating": 1
  }
];

// Main References component
const References: React.FC = () => {
  const [references, setReferences] = useState<Reference[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadReferences();
  }, []);

  const loadReferences = async (): Promise<void> => {
    try {
      setError(null);
      
      // Try to fetch from JSON file first
      const response = await fetch('/references.json');
      
      if (!response.ok) {
        throw new Error('JSON file not found, using fallback data');
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON, using fallback data');
      }
      
      const data: Reference[] = await response.json();
      setReferences(data);
      console.log('Successfully loaded references from JSON file');
      
    } catch (err) {
      console.warn('Loading from JSON failed, using fallback data:', err);
      // Use fallback data instead of showing error
      setReferences(fallbackReferences);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-600">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-lg font-light">Loading references...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen  items-center justify-center">
        <div className="text-center text-gray-600">
          <p className="text-lg font-light mb-4">Error loading references</p>
          <p className="text-red-400 text-sm">{error}</p>
          <button 
            onClick={loadReferences}
            className="mt-4 px-4 py-2 bg-cyan-500 text-gray-600 rounded hover:bg-cyan-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-light text-green mb-4">
            Client
            <span className="bg-gradient-to-r from-cyan-400 to-green-600 bg-clip-text text-transparent font-normal">
              {' '}References
            </span>
          </h1>
          <p className="text-gray-600/70 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Discover what our valued clients have to say about their experience working with us
          </p>
        </div>

        {/* Carousel */}
        <ReferenceCarousel references={references} />

        {/* Bottom decoration */}
        <div className="flex justify-center mt-16">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default References;