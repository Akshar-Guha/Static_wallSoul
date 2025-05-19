import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: "Digital Art Collection",
    artist: "Creative Studio",
    description: "A showcase of our digital art expertise, blending traditional techniques with modern technology to create stunning visual experiences.",
    category: "Digital Art",
    year: "2024",
    dimensions: "1920 x 1080",
    price: "Contact for Pricing",
    image: "/images/IMG-1.jpg"
  },
  {
    id: 2,
    title: "Brand Identity Project",
    artist: "Design Team",
    description: "Comprehensive brand identity development, from concept to final execution, creating memorable visual experiences for our clients.",
    category: "Branding",
    year: "2024",
    dimensions: "1920 x 1080",
    price: "Contact for Pricing",
    image: "/images/IMG-2.jpg"
  },
  {
    id: 3,
    title: "Creative Direction",
    artist: "Art Director",
    description: "Strategic creative direction that transforms ideas into compelling visual narratives, driving engagement and brand recognition.",
    category: "Creative Direction",
    year: "2024",
    dimensions: "1920 x 1080",
    price: "Contact for Pricing",
    image: "/images/IMG-3.jpg"
  },
  {
    id: 4,
    title: "Visual Storytelling",
    artist: "Content Team",
    description: "Captivating visual stories that connect with audiences and communicate brand messages effectively through powerful imagery.",
    category: "Visual Storytelling",
    year: "2024",
    dimensions: "1920 x 1080",
    price: "Contact for Pricing",
    image: "/images/IMG-4.JPG"
  }
];

export default function Gallery({ variant = 'page' }) {
  const [mounted, setMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [modalTimeout, setModalTimeout] = useState(null);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleProjectClick = useCallback((id) => {
    if (modalTimeout) {
      clearTimeout(modalTimeout);
    }
    setSelectedProject(id);
    const timeout = setTimeout(() => {
      setSelectedProject(null);
      setModalTimeout(null);
    }, 5000);
    setModalTimeout(timeout);
  }, [modalTimeout]);

  useEffect(() => {
    return () => {
      if (modalTimeout) {
        clearTimeout(modalTimeout);
      }
    };
  }, [modalTimeout]);

  const categories = ['All', ...new Set(projects.map(project => project.category))];
  const filteredProjects = category === 'All' ? projects : projects.filter(project => project.category === category);

  return (
    <section className={`${variant === 'home' ? 'py-12' : 'min-h-screen py-20'} bg-black relative overflow-hidden`}>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-white">
          {variant === 'home' ? 'Featured Works' : 'Creative Portfolio'}
        </h2>
        <p className="text-gray-400 text-lg text-center mb-12 max-w-2xl mx-auto">
          {variant === 'home' 
            ? 'A glimpse into our creative journey and design excellence'
            : 'Explore our collection of creative works, showcasing innovative design solutions and artistic excellence'}
        </p>

        {variant === 'page' && mounted && (
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  category === cat
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className={`grid gap-8 ${
          variant === 'home' 
            ? 'grid-cols-1 md:grid-cols-2' 
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {filteredProjects.slice(0, variant === 'home' ? 4 : 6).map((project, index) => (
            <div
              key={project.id}
              className={`group transition-all duration-500 ${
                loading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div 
                className="relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                onClick={() => handleProjectClick(project.id)}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  quality={85}
                  priority={index < (variant === 'home' ? 2 : 3)}
                />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/80 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
                  <h3 className="text-xl font-bold text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {project.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {variant === 'home' && (
          <div className="text-center mt-12">
            <Link 
              href="/gallery"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full transition-all duration-300"
            >
              View All Works
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}