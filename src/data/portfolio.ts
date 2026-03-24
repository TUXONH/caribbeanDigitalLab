export interface PortfolioProject {
  id: string;
  name: string;
  url: string;
  image: string;
  industry: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
}

export const projects: PortfolioProject[] = [
  {
    id: 'collaborate4kids',
    name: 'Collaborate4Kids',
    url: 'https://collaborate4kids.com',
    image: '/images/portfolio/collaborate4kids.svg',
    industry: { es: 'Salud', en: 'Healthcare' },
    description: {
      es: 'Plataforma digital que conecta a padres con terapeutas pediátricos especializados, facilitando la colaboración en el cuidado y desarrollo infantil.',
      en: 'Digital platform connecting parents with specialized pediatric therapists, facilitating collaboration in children\'s care and development.',
    },
  },
  {
    id: 'amazingcancuntours',
    name: 'Amazing Cancun Tours',
    url: 'https://amazingcancuntours.com/en',
    image: '/images/portfolio/amazingcancuntours.svg',
    industry: { es: 'Turismo', en: 'Tourism' },
    description: {
      es: 'Sitio web de tours y excursiones en Cancún y la Riviera Maya con sistema de reservas en línea, reseñas y experiencias únicas para viajeros.',
      en: 'Tours and excursions website for Cancún and the Riviera Maya with online booking system, reviews, and unique experiences for travelers.',
    },
  },
  {
    id: 'foncet',
    name: 'FONCET',
    url: 'https://foncet.org',
    image: '/images/portfolio/foncet.svg',
    industry: { es: 'ONG', en: 'NGO' },
    description: {
      es: 'Portal web para una organización de conservación ambiental en el sur de México, con secciones de proyectos, donaciones y educación ambiental.',
      en: 'Web portal for an environmental conservation organization in southern Mexico, featuring project sections, donations, and environmental education.',
    },
  },
  {
    id: 'abogadomauricioh',
    name: 'Abogado Mauricio H.',
    url: 'https://abogadomauricioh.com/es',
    image: '/images/portfolio/abogadomauricioh.svg',
    industry: { es: 'Legal', en: 'Legal' },
    description: {
      es: 'Sitio profesional para un despacho de abogados en Cancún con más de 40 años de experiencia en derecho penal, familiar, civil y laboral.',
      en: 'Professional website for a law firm in Cancún with over 40 years of experience in criminal, family, civil, and labor law.',
    },
  },
  {
    id: 'verocuidamisunas',
    name: 'Vero Cuida Mis Uñas',
    url: 'https://verocuidamisunas.com',
    image: '/images/portfolio/verocuidamisunas.svg',
    industry: { es: 'Belleza', en: 'Beauty' },
    description: {
      es: 'Plataforma de gestión para salón de belleza con sistema de citas en línea, catálogo de servicios, gestión de inventario y recordatorios para clientes.',
      en: 'Beauty salon management platform with online appointment booking, service catalog, inventory management, and client reminders.',
    },
  },
];
