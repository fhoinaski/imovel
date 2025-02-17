import React from 'react';
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";


gsap.registerPlugin(ScrollTrigger);

const PaginaImobiliaria = () => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const [imagemPrincipal, setImagemPrincipal] = useState("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80");
  const [videoAtivo, setVideoAtivo] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const imagensPropriedade = [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
    "https://images.unsplash.com/photo-1600607687920-4e03c0cdc276?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
    "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80"
  ];

  const videosPropriedade = [
    "https://player.vimeo.com/video/123456789",
    "https://player.vimeo.com/video/234567890",
    "https://player.vimeo.com/video/345678901",
    "https://player.vimeo.com/video/456789012"
  ];

  useEffect(() => {
    const tl = gsap.timeline();

    // Animação inicial de carregamento
    tl.from(textRef.current, {
      yPercent: 100,
      duration: 1.5,
      ease: "power4.out",
    })
      .to(lineRef.current, {
        width: "100%",
        duration: 1.2,
        ease: "power4.inOut",
      })
      .to(
        [textRef.current, lineRef.current],
        {
          yPercent: -100,
          duration: 1,
          ease: "power4.in",
        },
        "+=0.4"
      )
      .to(
        loaderRef.current,
        {
          yPercent: -100,
          duration: 1,
          ease: "power4.in",
        },
        "<"
      );

    // Efeito parallax para a seção de destaque
    if (parallaxRef.current && imageRef.current) {
      gsap.to(imageRef.current, {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Animar seções ao rolar
    if (detailsRef.current) {
      gsap.from(detailsRef.current.children, {
        y: 70,
        opacity: 0,
        duration: 1.2,
        stagger: 0.25,
        ease: "power3.out",
        scrollTrigger: {
          trigger: detailsRef.current,
          start: "top 75%",
        },
      });
    }

    // Animar todos os títulos de seção
    const secaoTitulos = document.querySelectorAll('h2.titulo-secao');
    secaoTitulos.forEach(titulo => {
      gsap.from(titulo, {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titulo,
          start: "top 85%",
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const mudarImagem = (novaImagem: string) => {
    const elementoImagemPrincipal = document.querySelector("#imagemPrincipal") as HTMLImageElement;
    const tl = gsap.timeline();
    
    tl.to(elementoImagemPrincipal, {
      xPercent: -100,
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        setImagemPrincipal(novaImagem);
      }
    }).fromTo(elementoImagemPrincipal, 
      { xPercent: 100, opacity: 0 },
      { xPercent: 0, opacity: 1, duration: 0.6, ease: "power2.inOut" }
    );
  };

  const abrirVideo = (url: string) => {
    setVideoUrl(url);
    setVideoAtivo(true);
    document.body.style.overflow = 'hidden';
  };

  const fecharVideo = () => {
    setVideoAtivo(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      {/* Overlay de carregamento */}
      <div ref={loaderRef} className="fixed inset-0 z-50 bg-white flex items-center justify-center">
        <div className="loader-content overflow-hidden">
          <div ref={textRef} className="text-4xl md:text-6xl font-light tracking-widest text-neutral-900">
            SEU IMOVEL PERFEITO 
          </div>
          <div ref={lineRef} className="h-0.5 bg-neutral-900 w-0 mt-4" />
        </div>
      </div>

      {/* Modal de vídeo */}
      {videoAtivo && (
        <div className="fixed inset-0 z-40 bg-black/90 flex items-center justify-center">
          <button
            onClick={fecharVideo}
            className="absolute top-6 right-6 text-white hover:text-neutral-300 transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="w-full max-w-4xl aspect-video">
            <iframe
              src={videoUrl}
              className="w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      <main className="min-h-screen bg-white">
        {/* Hero Section com Parallax */}
        <section ref={parallaxRef} className="relative h-screen overflow-hidden">
          <img
            ref={imageRef}
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80"
            alt="Mansão de Luxo no Brasil"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="text-center max-w-3xl px-4">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.5 }}
                className="inline-block px-4 py-1 mb-6 text-sm tracking-widest border border-white/70 rounded-full"
              >
                BEM-VINDO
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2.7 }}
                className="text-5xl md:text-7xl font-light tracking-wide mb-8"
              >
                Uma residencia extraordinaria
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 3 }}
                className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
              >
                Experimente o mais alto padrão com esta mansão de alto padrão construida com os melhores materiais e acabamentos.
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, delay: 3.3 }}
                className="mt-10 px-8 py-3 bg-white/10 hover:bg-white/25 border border-white/70 rounded-sm text-white tracking-widest transition-all duration-300"
              >
                EXPLORAR IMÓVEIS
              </motion.button>
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {/* Seção de Detalhes da Propriedade */}
        <section ref={detailsRef} className="container mx-auto px-4 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Galeria de Imagens */}
            <div className="space-y-8">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-xl">
                <img
                  id="imagemPrincipal"
                  src={imagemPrincipal}
                  alt="Vista Principal da Propriedade"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {imagensPropriedade.map((imagem, index) => (
                  <button
                    key={index}
                    onClick={() => mudarImagem(imagem)}
                    className={`relative aspect-square overflow-hidden rounded-lg transition-all duration-300 ${
                      imagemPrincipal === imagem
                        ? "ring-2 ring-neutral-900 scale-95"
                        : "hover:opacity-80 hover:scale-105"
                    }`}
                  >
                    <img
                      src={imagem}
                      alt={`Vista da Propriedade ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Detalhes da Propriedade */}
            <div className="space-y-10">
              <div>
                <span className="text-sm font-medium tracking-widest text-neutral-500">MANSÃO EXCLUSIVA</span>
                <h2 className="text-4xl font-light mb-4 mt-2">Condominiode alto padrão Biguaçu</h2>
                <p className="text-2xl text-neutral-600 font-light">
                  R$ 1.800.000
                </p>
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <p className="text-lg text-neutral-600 leading-relaxed">
                    Localizada em um dos condomínios exclusivos no bairro de Biguaçu, esta magnífica propriedade oferece o maisalto nivel emacabamento e construção. Construída com os mais finos materiais, combina design contemporâneo com elementos naturais.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium tracking-wider text-neutral-500">QUARTOS</h3>
                  <p className="text-3xl font-light">3</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium tracking-wider text-neutral-500">BANHEIROS</h3>
                  <p className="text-3xl font-light">4</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium tracking-wider text-neutral-500">ÁREA CONSTRUÍDA</h3>
                  <p className="text-3xl font-light">300 m²</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium tracking-wider text-neutral-500">TAMANHO DO TERRENO</h3>
                  <p className="text-3xl font-light">400 m²</p>
                </div>
              </div>

              <div className="pt-6">
                <button className="w-full py-4 bg-neutral-900 hover:bg-neutral-800 text-white tracking-widest rounded-sm transition-colors duration-300">
                  AGENDAR VISITA
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Características e Amenidades */}
        <section className="py-24 bg-neutral-50">
          <div className="container mx-auto px-4">
            <h2 className="titulo-secao text-4xl font-light mb-16 text-center">Características & Amenidades</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                {
                  icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
                  title: "Arquitetura",
                  desc: "Design contemporâneo com acabamentos de alta qualidade e materiais sustentáveis."
                },
                {
                  icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                  title: "Espaços Gourmet",
                  desc: "Cozinha de alto padrão com ilha central, adega climatizada e churrasqueira."
                },
                {
                  icon: "M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z",
                  title: "Lazer",
                  desc: "Piscina infinita, spa completo, cinema privativo e quadra de tênis iluminada."
                },
                {
                  icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
                  title: "Segurança",
                  desc: "Sistema de segurança 24h, controle de acesso biométrico e monitoramento remoto."
                }
              ].map((item, index) => (
                <div key={index} className="group">
                  <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg transition-all duration-300 group-hover:bg-white group-hover:shadow-lg">
                    <div className="p-4 rounded-full bg-neutral-100 group-hover:bg-neutral-900 transition-colors duration-300">
                      <svg className="w-7 h-7 text-neutral-700 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                      </svg>
                    </div>
                    <h3 className="text-xl font-light">{item.title}</h3>
                    <p className="text-neutral-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seção de Plantas */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <h2 className="titulo-secao text-4xl font-light mb-16 text-center">Plantas Baixas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80"
                    alt="Planta do Primeiro Andar"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-light">Primeiro Andar</h3>
                  <button className="text-neutral-600 hover:text-neutral-900 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
                <p className="text-neutral-600">Área social ampla com pé direito duplo, sala de estar, sala de jantar, cozinha gourmet, lavabo e acesso à varanda com vista para o mar.</p>
              </div>
              <div className="space-y-6">
                <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80"
                    alt="Planta do Segundo Andar"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-light">Segundo Andar</h3>
                  <button className="text-neutral-600 hover:text-neutral-900 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
                <p className="text-neutral-600">Área íntima com suite master com closet e banheira de hidromassagem, três suítes adicionais, escritório e lounge íntimo com varanda privativa.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Tour Virtual e Vídeos */}
        <section className="py-24 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-8">
                <h2 className="titulo-secao text-4xl font-light">Tour Virtual</h2>
                <div className="aspect-video bg-neutral-100 rounded-xl overflow-hidden shadow-lg relative">
                  <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80"
                    alt="Preview do Tour Virtual"
                    className="w-full h-full object-cover"
                  />
                  <button 
                    onClick={() => abrirVideo("https://player.vimeo.com/video/123456789")}
                    className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group"
                  >
                    <span className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-8 h-8 text-neutral-900"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
                <p className="text-neutral-600 leading-relaxed">
                  Explore cada ambiente desta propriedade excepcional através do nosso tour virtual imersivo em 360°. Navegue livremente pelos cômodos e experimente a sensação de estar realmente dentro desta residência exclusiva.
                </p>
              </div>
              <div className="space-y-8">
                <h2 className="titulo-secao text-4xl font-light">Vídeos da Propriedade</h2>
                <div className="grid grid-cols-2 gap-6">
                  {videosPropriedade.map((video, index) => (
                    <div
                      key={index}
                      className="aspect-video bg-neutral-100 rounded-lg overflow-hidden relative group cursor-pointer shadow-md"
                      onClick={() => abrirVideo(video)}
                    >
                      <img
                        src={`https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                        alt={`Preview de Vídeo ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
                        <span className="w-12 h-12 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 shadow-lg">
                          <svg
                            className="w-5 h-5 text-neutral-900"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <h4 className="text-white text-sm">Vídeo {index + 1}</h4>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-neutral-600 leading-relaxed">
                  Assista aos vídeos exclusivos da propriedade, capturados em diferentes períodos do dia para mostrar a beleza natural e as mudanças de luz neste ambiente excepcional.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Localização */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <h2 className="titulo-secao text-4xl font-light mb-12">Localização</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="aspect-[16/9] bg-neutral-200 rounded-xl overflow-hidden shadow-lg relative">
                  {/* Substitua isso por uma implementação real de mapa */}
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-neutral-500">Mapa será implementado aqui</span>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium tracking-wider text-neutral-500">ENDEREÇO</h3>
                  <p className="text-lg">Condomínio , Biguaçu - SC</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium tracking-wider text-neutral-500">DISTÂNCIAS</h3>
                  <ul className="space-y-2 text-neutral-600">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7" />
                      </svg>
                      <span>5 min de mercados e comercios</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span>20 min do Centro </span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span>15 min de Restaurantes Exclusivos</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>30 min da Marina Porto Bali</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-4">
                  <button className="w-full py-3 border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white tracking-widest rounded-sm transition-colors duration-300 flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    COMO CHEGAR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Contato e Agenda */}
        <section className="py-24 bg-neutral-900 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-8">
                <h2 className="titulo-secao text-4xl font-light">Agende uma Visita Exclusiva</h2>
                <p className="text-neutral-300 leading-relaxed text-lg">
                  Nossa equipe de especialistas está disponível para mostrar esta propriedade excepcional de acordo com sua conveniência. Oferecemos visitas privativas com transporte exclusivo.
                </p>
                <div className="space-y-6 pt-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-full bg-white/10">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium tracking-wider text-neutral-400">TELEFONE</h3>
                      <p className="text-xl font-light">(48) 99113-0536</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-full bg-white/10">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium tracking-wider text-neutral-400">EMAIL</h3>
                      <p className="text-xl font-light">alexandrehoinaski@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-full bg-white/10">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium tracking-wider text-neutral-400">WHATSAPP</h3>
                      <p className="text-xl font-light">(48) 99113-0536</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <form className="bg-white/5 p-8 rounded-lg backdrop-blur-sm">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-light">Solicite Informações</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium tracking-wider text-neutral-400">Nome</label>
                        <input type="text" className="w-full bg-white/10 rounded-sm border-0 py-3 px-4 text-white focus:ring-1 focus:ring-white/30 focus:bg-white/15 transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium tracking-wider text-neutral-400">Telefone</label>
                        <input type="tel" className="w-full bg-white/10 rounded-sm border-0 py-3 px-4 text-white focus:ring-1 focus:ring-white/30 focus:bg-white/15 transition-all" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium tracking-wider text-neutral-400">Email</label>
                      <input type="email" className="w-full bg-white/10 rounded-sm border-0 py-3 px-4 text-white focus:ring-1 focus:ring-white/30 focus:bg-white/15 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium tracking-wider text-neutral-400">Mensagem</label>
                      <textarea rows={4} className="w-full bg-white/10 rounded-sm border-0 py-3 px-4 text-white focus:ring-1 focus:ring-white/30 focus:bg-white/15 transition-all resize-none"></textarea>
                    </div>
                    <div className="pt-2">
                      <button type="submit" className="w-full py-4 bg-white text-neutral-900 hover:bg-neutral-200 tracking-widest rounded-sm transition-colors duration-300 font-medium">
                        ENVIAR SOLICITAÇÃO
                      </button>
                    </div>
                    <p className="text-sm text-neutral-400 text-center">
                      Ao enviar, você concorda com nossa política de privacidade
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

  
      </main>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-400 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-light text-white">Imóveis de Luxo</h2>
              <p className="leading-relaxed">
                Há mais de 25 anos, somos especialistas em propriedades de alto padrão no Brasil e no mundo. Nossa missão é proporcionar uma experiência imobiliária excepcional.
              </p>
              <div className="flex space-x-4 pt-4">
                <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
                <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
                  </svg>
                </a>
                <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Contato</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 mt-0.5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Biguaçu - sc</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 mt-0.5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>(48) 99113-0536</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 mt-0.5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>alexandrehoinaski@gmail.com</span>
                </li>
              </ul>
            </div>
           
        
          </div>
          <div className="border-t border-neutral-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 Imóveis de Luxo. Todos os direitos reservados.</p>
        
          </div>
        </div>
      </footer>
    </>
  );
};

export default PaginaImobiliaria;