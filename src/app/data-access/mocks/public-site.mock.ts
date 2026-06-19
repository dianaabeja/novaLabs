import { PublicSiteDto } from '../contracts/public-site.dto';

export const PUBLIC_SITE_MOCK: PublicSiteDto = {
  tenant: {
    slug: 'nova-biometrics',
    name: 'Nova Biometrics',
  },
  modules: ['LANDING', 'CERTIFICATIONS', 'FAQS', 'MEDIA', 'STYLES', 'SEO'],
  landing: {
    layout: [
      {
        id: 'layout-home-hero',
        sortOrder: 1,
        isVisible: true,
        section: {
          pageKey: 'home',
          instanceKey: 'hero',
          sectionType: 'home',
          title: 'Diagnóstico clínico rápido con tecnología cercana',
          subtitle:
            'Estudios de laboratorio, seguimiento clínico y soluciones para pacientes, clínicas y organizaciones.',
          badgeText: 'Entrega digital en 24h',
          description:
            'Nova Biometrics combina toma de muestras, análisis especializado y entrega digital de resultados en una experiencia clara, moderna y fácil de administrar.',
          primaryButtonText: 'Agendar estudio',
          primaryButtonUrl: '/contacto',
          mediaAssetId: 'lab-team',
          style: {
            backgroundColor: '#080C14',
          },
        },
      },
      {
        id: 'layout-home-services',
        sortOrder: 2,
        isVisible: true,
        section: {
          pageKey: 'home',
          instanceKey: 'services',
          sectionType: 'about',
          title: 'Servicios clínicos para decisiones oportunas',
          subtitle:
            'Perfiles preventivos, pruebas hormonales, microbiología y salud ocupacional.',
          description:
            'El CMS local permite publicar servicios, ajustar mensajes comerciales y mantener visible la información clave para pacientes y aliados.',
          mediaAssetId: 'sample-analysis',
          style: {
            backgroundColor: '#080C14',
          },
        },
      },
      {
        id: 'layout-about-main',
        sortOrder: 3,
        isVisible: true,
        section: {
          pageKey: 'about',
          instanceKey: 'about-main',
          sectionType: 'about',
          title: 'Un laboratorio con una operación de nivel profesional',
          subtitle: 'Procesos claros, reportes digitales y atención orientada al paciente.',
          description:
            'Esta demo muestra cómo un laboratorio puede administrar páginas, SEO, navegación, secciones y recursos multimedia sin depender de una API.',
          mediaAssetId: 'microscope',
          style: {
            backgroundColor: '#080C14',
          },
        },
      },
      {
        id: 'layout-contact-main',
        sortOrder: 4,
        isVisible: true,
        section: {
          pageKey: 'contact',
          instanceKey: 'contact-main',
          sectionType: 'contact',
          title: 'Agenda una toma o solicita una propuesta',
          subtitle: 'Atención en sucursal, domicilio y jornadas empresariales.',
          description:
            'Teléfono: 55 8142 2030. Correo: hola@novabiometrics.demo. Dirección: Av. Horizonte 210, CDMX.',
          primaryButtonText: 'Enviar WhatsApp',
          primaryButtonUrl: 'https://wa.me/525512349876',
          mediaAssetId: null,
          style: {
            backgroundColor: '#0F172A',
          },
        },
      },
    ],
  },
  certifications: {
    certifications: [
      {
        id: 'cert-iso',
        name: 'ISO 9001',
        issuingBody: 'Quality Bureau',
        description: 'Sistema de gestion de calidad aplicado a procesos de diagnostico clinico.',
        certificateCode: 'NB-ISO-9001-DEMO',
        documentUrl: '/certificaciones/iso-9001-demo.pdf',
        mediaAssetId: 'quality-badge',
        sortOrder: 1,
        isActive: true,
      },
      {
        id: 'cert-bio',
        name: 'Buenas practicas de bioseguridad',
        issuingBody: 'Comite interno',
        description: 'Protocolos para toma, traslado, resguardo y procesamiento de muestras.',
        certificateCode: 'NB-BIO-2026-DEMO',
        documentUrl: null,
        mediaAssetId: 'biosecurity',
        sortOrder: 2,
        isActive: true,
      },
    ],
  },
  faqs: {
    faqs: [
      {
        id: 'faq-fasting',
        question: 'Necesito ayuno para todos los estudios?',
        answer:
          'No. Algunos perfiles requieren ayuno de 8 a 12 horas. En la confirmacion del estudio indicamos la preparacion necesaria.',
        category: 'Pacientes',
        sortOrder: 1,
        isActive: true,
      },
      {
        id: 'faq-results',
        question: 'Como recibo mis resultados?',
        answer:
          'Puedes recibirlos por correo o consultarlos en linea. En esta version de portafolio el flujo esta simulado desde el contenido del sitio.',
        category: 'Resultados',
        sortOrder: 2,
        isActive: true,
      },
      {
        id: 'faq-companies',
        question: 'Atienden empresas?',
        answer:
          'Si. Nova Biometrics maneja paquetes preventivos, brigadas y convenios con reportes consolidados.',
        category: 'Empresas',
        sortOrder: 3,
        isActive: true,
      },
    ],
  },
  seo: {
    pages: [
      {
        route: '/',
        title: 'Nova Biometrics | Laboratorio clinico',
        description: 'Laboratorio clinico ficticio con CMS local para administrar contenido publico.',
      },
      {
        route: '/nosotros',
        title: 'Nosotros | Nova Biometrics',
        description: 'Conoce la propuesta operativa y clinica de Nova Biometrics.',
      },
      {
        route: '/contacto',
        title: 'Contacto | Nova Biometrics',
        description: 'Agenda estudios, cotizaciones y visitas empresariales.',
      },
    ],
  },
  styles: {
    tokens: [
      {
        tokenKey: 'brand',
        value: {
          primaryColor: '#38BDF8',
          accentColor: '#60A5FA',
        },
      },
    ],
  },
  componentTypes: {
    componentTypes: [
      { typeKey: 'home', label: 'Hero principal', isActive: true },
      { typeKey: 'about', label: 'Bloque informativo', isActive: true },
      { typeKey: 'contact', label: 'Contacto / CTA', isActive: true },
      { typeKey: 'quote-cta', label: 'Llamado a cotizacion', isActive: true },
    ],
  },
  navigation: {
    items: [
      { id: 'nav-home', label: 'Inicio', url: '/', children: [] },
      { id: 'nav-about', label: 'Nosotros', url: '/nosotros', children: [] },
      { id: 'nav-contact', label: 'Contacto', url: '/contacto', children: [] },
    ],
  },
  pages: {
    pages: [
      { pageKey: 'home', label: 'Inicio', route: '/', isActive: true },
      { pageKey: 'about', label: 'Nosotros', route: '/nosotros', isActive: true },
      { pageKey: 'contact', label: 'Contacto', route: '/contacto', isActive: true },
    ],
  },
  media: {
    assets: [
      {
        id: 'lab-team',
        resourceType: 'IMAGE',
        filename: 'lab-team.jpg',
        url: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80',
        altText: 'Equipo de laboratorio trabajando',
        mimeType: 'image/jpeg',
      },
      {
        id: 'sample-analysis',
        resourceType: 'IMAGE',
        filename: 'sample-analysis.jpg',
        url: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=1200',
        altText: 'Analisis de muestras en laboratorio',
        mimeType: 'image/jpeg',
      },
      {
        id: 'microscope',
        resourceType: 'IMAGE',
        filename: 'microscope.jpg',
        url: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=1200&q=80',
        altText: 'Microscopio de laboratorio',
        mimeType: 'image/jpeg',
      },
      {
        id: 'quality-badge',
        resourceType: 'IMAGE',
        filename: 'quality-badge.jpg',
        url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80',
        altText: 'Documentos de certificacion',
        mimeType: 'image/jpeg',
      },
      {
        id: 'biosecurity',
        resourceType: 'IMAGE',
        filename: 'biosecurity.jpg',
        url: 'https://images.pexels.com/photos/8942991/pexels-photo-8942991.jpeg?auto=compress&cs=tinysrgb&w=1200',
        altText: 'Equipo de laboratorio con material de bioseguridad',
        mimeType: 'image/jpeg',
      },
    ],
  },
};
