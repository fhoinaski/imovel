
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const [mainImage, setMainImage] = useState("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80");

  const propertyImages = [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
    "https://images.unsplash.com/photo-1600607687920-4e03c0cdc276?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
    "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80"
  ];

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial loading animation
    tl.from(textRef.current, {
      yPercent: 100,
      duration: 1.2,
      ease: "power4.out",
    })
      .to(lineRef.current, {
        width: "100%",
        duration: 1,
        ease: "power4.inOut",
      })
      .to(
        [textRef.current, lineRef.current],
        {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.in",
        },
        "+=0.2"
      )
      .to(
        loaderRef.current,
        {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.in",
        },
        "<"
      );

    // Parallax effect for hero section
    if (parallaxRef.current && imageRef.current) {
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Animate sections on scroll
    if (detailsRef.current) {
      gsap.from(detailsRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: detailsRef.current,
          start: "top 80%",
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleImageChange = (newImage: string) => {
    const mainImageEl = document.querySelector("#mainImage") as HTMLImageElement;
    const tl = gsap.timeline();
    
    tl.to(mainImageEl, {
      xPercent: -100,
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        setMainImage(newImage);
      }
    }).fromTo(mainImageEl, 
      { xPercent: 100, opacity: 0 },
      { xPercent: 0, opacity: 1, duration: 0.5, ease: "power2.inOut" }
    );
  };

  return (
    <>
      <div ref={loaderRef} className="loader-overlay">
        <div className="loader-content">
          <div ref={textRef} className="loader-text">
            LUXURY ESTATES
          </div>
          <div ref={lineRef} className="loader-line" />
        </div>
      </div>

      <main className="min-h-screen">
        <section ref={parallaxRef} className="parallax-container">
          <img
            ref={imageRef}
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80"
            alt="Luxury Estate"
            className="parallax-image"
          />
          <div className="content-overlay">
            <div className="text-center">
              <span className="inline-block px-4 py-1 mb-4 text-sm tracking-wider border border-neutral-800 rounded-full">
                WELCOME
              </span>
              <h1 className="text-5xl font-light tracking-wide text-neutral-900 mb-6">
                Extraordinary Homes
              </h1>
              <p className="text-lg text-neutral-700 max-w-lg mx-auto">
                Experience luxury living at its finest with our curated collection
                of exceptional properties.
              </p>
            </div>
          </div>
        </section>

        <section ref={detailsRef} className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <img
                  id="mainImage"
                  src={mainImage}
                  alt="Property Main View"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {propertyImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageChange(image)}
                    className={`relative aspect-square overflow-hidden rounded-lg transition-all duration-300 ${
                      mainImage === image
                        ? "ring-2 ring-neutral-900"
                        : "hover:opacity-80"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Property View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Property Details */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-light mb-4">Luxury Villa in Beverly Hills</h2>
                <p className="text-lg text-neutral-600">
                  $12,500,000
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-neutral-500">BEDROOMS</h3>
                  <p className="text-2xl">5</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-neutral-500">BATHROOMS</h3>
                  <p className="text-2xl">6</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-neutral-500">SQUARE FEET</h3>
                  <p className="text-2xl">7,850</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-neutral-500">LOT SIZE</h3>
                  <p className="text-2xl">0.5 Acres</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Floor Plans Section */}
        <section className="bg-neutral-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-light mb-8 text-center">Floor Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="aspect-[4/3] rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80"
                    alt="First Floor Plan"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-light">First Floor</h3>
              </div>
              <div className="space-y-4">
                <div className="aspect-[4/3] rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80"
                    alt="Second Floor Plan"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-light">Second Floor</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Virtual Tour & Videos Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-light">Virtual Tour</h2>
                <div className="aspect-video bg-neutral-100 rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80"
                    alt="Virtual Tour Preview"
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
                    <span className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-neutral-900"
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
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-light">Property Videos</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((index) => (
                    <div
                      key={index}
                      className="aspect-video bg-neutral-100 rounded-lg overflow-hidden relative group"
                    >
                      <img
                        src={`https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                        alt={`Video Preview ${index}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                        <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg
                            className="w-4 h-4 text-neutral-900"
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
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="bg-neutral-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-light mb-8">Location</h2>
            <div className="aspect-[16/9] bg-neutral-200 rounded-lg overflow-hidden">
              {/* Replace this with an actual map implementation */}
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-neutral-500">Map will be implemented here</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Index;