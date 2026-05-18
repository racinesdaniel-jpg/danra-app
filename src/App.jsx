import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';

export default function DanraOperationalMaturityApp() {
  const pillars = [
    {
      name: 'Gobierno Operativo',
      questions: [
        '¿Existen responsables claramente definidos para cada área o proceso crítico?',
        '¿La operación puede funcionar con normalidad sin la presencia del dueño o gerente?',
        '¿Existen reuniones periódicas de seguimiento operativo con agenda y compromisos?'
      ]
    },
    {
      name: 'Procesos y Estandarización',
      questions: [
        '¿Los procesos críticos están documentados?',
        '¿Existen procedimientos estandarizados?',
        '¿La operación depende de personas específicas?'
      ]
    },
    {
      name: 'Información y Visibilidad',
      questions: [
        '¿Existen indicadores operativos definidos?',
        '¿Las decisiones se toman con información confiable?',
        '¿La información está centralizada?'
      ]
    },
    {
      name: 'Control Operativo',
      questions: [
        '¿Existe seguimiento operativo estructurado?',
        '¿Se identifican fácilmente errores y retrasos?',
        '¿Existen mecanismos de control y validación?'
      ]
    },
    {
      name: 'Tecnología y Transformación Digital',
      questions: [
        '¿Existen herramientas digitales para gestionar la operación?',
        '¿La información está automatizada o integrada?',
        '¿Se utilizan dashboards o reportes ejecutivos?'
      ]
    },
    {
      name: 'Dirección Estratégica',
      questions: [
        '¿La empresa opera con planificación estratégica?',
        '¿Existen objetivos claros y seguimiento?',
        '¿Las prioridades operativas están alineadas al negocio?'
      ]
    },
    {
      name: 'Sostenibilidad Operativa',
      questions: [
        '¿La operación soportaría un aumento de clientes?',
        '¿Existen riesgos operativos identificados?',
        '¿La empresa puede crecer manteniendo control?'
      ]
    }
  ];

  const options = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 }
];

const responseGuides = {
  '¿Existen responsables claramente definidos para cada área o proceso crítico?': [
    'Todo depende del dueño o gerente.',
    'Existen responsables informales sin claridad total.',
    'Hay responsables definidos en áreas principales.',
    'Los roles están claros y existen responsables funcionales.',
    'Roles documentados, conocidos y respetados en toda la organización.'
  ],

  '¿La operación puede funcionar con normalidad sin la presencia del dueño o gerente?': [
    'La operación se detiene sin el dueño o gerente.',
    'Algunas actividades continúan, pero existe alta dependencia.',
    'La operación básica continúa con supervisión parcial.',
    'La operación funciona normalmente con seguimiento estructurado.',
    'La organización opera de forma autónoma y controlada.'
  ],

  '¿Existen reuniones periódicas de seguimiento operativo con agenda y compromisos?': [
    'No existen reuniones formales.',
    'Las reuniones son ocasionales y sin seguimiento.',
    'Existen reuniones básicas con seguimiento parcial.',
    'Las reuniones tienen agenda, responsables y control.',
    'Existe una cadencia ejecutiva estructurada y disciplinada.'
  ],

  '¿Los procesos críticos están documentados?': [
    'No existe documentación de procesos.',
    'Algunos procesos están escritos de manera informal.',
    'Los procesos críticos principales están documentados.',
    'La documentación está actualizada y es utilizada.',
    'Los procesos son gestionados bajo mejora continua.'
  ],

  '¿Existen procedimientos estandarizados?': [
    'Cada persona trabaja de forma distinta.',
    'Existen lineamientos básicos sin consistencia.',
    'Hay procedimientos definidos parcialmente aplicados.',
    'Los procedimientos son conocidos y utilizados.',
    'La estandarización es transversal y auditada.'
  ],

  '¿La operación depende de personas específicas?': [
    'Toda la operación depende de personas clave.',
    'Existen dependencias importantes en ciertas áreas.',
    'La dependencia existe pero está parcialmente controlada.',
    'Los conocimientos están compartidos en el equipo.',
    'La operación funciona independientemente de personas específicas.'
  ],

  '¿Existen indicadores operativos definidos?': [
    'No existen indicadores operativos.',
    'Existen métricas básicas sin seguimiento formal.',
    'Los KPIs principales están definidos.',
    'Los indicadores son monitoreados regularmente.',
    'KPIs definidos, medidos y revisados periódicamente.'
  ],

  '¿Las decisiones se toman con información confiable?': [
    'Las decisiones se toman por intuición.',
    'Existe información parcial y poco confiable.',
    'La información básica soporta decisiones operativas.',
    'La organización utiliza información validada regularmente.',
    'Las decisiones son completamente data-driven.'
  ],

  '¿La información está centralizada?': [
    'La información está dispersa.',
    'Existe información en varias fuentes desconectadas.',
    'Parte de la información está centralizada.',
    'La información clave está integrada y disponible.',
    'Existe una gestión centralizada y confiable de información.'
  ],

  '¿Existe seguimiento operativo estructurado?': [
    'No existe seguimiento operativo.',
    'El seguimiento es informal y reactivo.',
    'Existe control básico de tareas y actividades.',
    'El seguimiento es estructurado y periódico.',
    'La operación cuenta con monitoreo ejecutivo continuo.'
  ],

  '¿Se identifican fácilmente errores y retrasos?': [
    'Los errores se detectan demasiado tarde.',
    'Los problemas suelen identificarse por reclamos.',
    'Existen mecanismos básicos de detección.',
    'Los errores se identifican oportunamente.',
    'La organización previene desviaciones antes de impactar.'
  ],

  '¿Existen mecanismos de control y validación?': [
    'No existen controles formales.',
    'Los controles son manuales y limitados.',
    'Existen validaciones básicas.',
    'Los controles operativos son consistentes.',
    'Existe un modelo robusto de control y validación.'
  ],

  '¿Existen herramientas digitales para gestionar la operación?': [
    'La operación funciona principalmente de forma manual.',
    'Existen herramientas básicas aisladas.',
    'La empresa utiliza herramientas en procesos clave.',
    'Las herramientas soportan la gestión operativa diaria.',
    'La operación está soportada por un ecosistema digital integrado.'
  ],

  '¿La información está automatizada o integrada?': [
    'No existe automatización.',
    'Existen automatizaciones aisladas.',
    'Algunos sistemas están parcialmente integrados.',
    'La información fluye automáticamente entre áreas clave.',
    'La integración y automatización son transversales.'
  ],

  '¿Se utilizan dashboards o reportes ejecutivos?': [
    'No existen reportes ejecutivos.',
    'Existen reportes manuales limitados.',
    'La empresa utiliza dashboards básicos.',
    'Los dashboards soportan decisiones operativas.',
    'La organización opera con analítica ejecutiva en tiempo real.'
  ],

  '¿La empresa opera con planificación estratégica?': [
    'No existe planificación estratégica.',
    'La planificación es informal.',
    'Existe planificación básica anual.',
    'La estrategia está definida y monitoreada.',
    'La organización opera con dirección estratégica consolidada.'
  ],

  '¿Existen objetivos claros y seguimiento?': [
    'No existen objetivos definidos.',
    'Los objetivos no tienen seguimiento.',
    'Existen objetivos con seguimiento parcial.',
    'Los objetivos son medidos regularmente.',
    'La organización gestiona objetivos con KPIs y control ejecutivo.'
  ],

  '¿Las prioridades operativas están alineadas al negocio?': [
    'La operación trabaja reaccionando a urgencias.',
    'Existe alineación limitada entre áreas.',
    'Las prioridades principales están alineadas.',
    'La operación responde a objetivos estratégicos.',
    'Existe alineación integral entre estrategia y operación.'
  ],

  '¿La operación soportaría un aumento de clientes?': [
    'La operación colapsaría ante crecimiento.',
    'El aumento de demanda generaría problemas importantes.',
    'La operación soportaría crecimiento limitado.',
    'La organización puede escalar manteniendo control.',
    'La operación está diseñada para crecer sosteniblemente.'
  ],

  '¿Existen riesgos operativos identificados?': [
    'No existen riesgos identificados.',
    'Los riesgos se identifican informalmente.',
    'Existen controles básicos de riesgo.',
    'La empresa monitorea riesgos operativos.',
    'La gestión de riesgos es preventiva y estructurada.'
  ],

  '¿La empresa puede crecer manteniendo control?': [
    'El crecimiento generaría pérdida de control.',
    'Existen debilidades importantes para sostener crecimiento.',
    'La operación tiene bases funcionales de control.',
    'La empresa puede evolucionar manteniendo estabilidad.',
    'El modelo operativo soporta evolución sostenida y controlada.'
  ]
};

  const getMaturity = (score) => {
    if (score <= 1.5) return 'Nivel 1 — Reactivo';
    if (score <= 2.5) return 'Nivel 2 — Inicial';
    if (score <= 3.5) return 'Nivel 3 — Estructurado';
    if (score <= 4.5) return 'Nivel 4 — Gestionado';
    return 'Nivel 5 — Optimizado';
  };

  const [answers, setAnswers] = useState({});

  const [organizationData, setOrganizationData] = useState({
    empresa: '',
    giro: '',
    contacto: '',
    cargo: '',
    numero: '',
    correo: '',
    fecha: '',
    colaboradores: ''
  });

  const handleOrganizationData = (field, value) => {
    setOrganizationData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAnswer = (pillar, question, value) => {
    setAnswers((prev) => ({
      ...prev,
      [`${pillar}-${question}`]: value
    }));
  };

  const calculatePillarScore = (pillar) => {
    const values = pillar.questions.map(
      (q) => answers[`${pillar.name}-${q}`] || 0
    );

    const total = values.reduce((a, b) => a + b, 0);
    return values.length ? total / values.length : 0;
  };

  const totalQuestions = pillars.reduce(
    (acc, pillar) => acc + pillar.questions.length,
    0
  );

  const answeredQuestions = Object.keys(answers).length;

  const isAssessmentComplete = answeredQuestions === totalQuestions;

  const overallScore = pillars.reduce(
    (acc, pillar) => acc + calculatePillarScore(pillar),
    0
  ) / pillars.length;

  const pages = [
    'Instrucciones',
    'Datos de la Organización',
    'Preguntas de Diagnóstico',
    'Resumen Ejecutivo',
    'Descriptores de Nivel'
  ];

  const [activePage, setActivePage] = useState('Instrucciones');
  const [openPillar, setOpenPillar] = useState(null);
  const [openExecutiveSections, setOpenExecutiveSections] = useState({
    organizacion: true,
    resumen: true,
    perfil: true,
    interpretacion: true,
    escalera: true
  });

  const pdfRef = useRef();

  const radarData = pillars.map((pillar) => ({
    pillar: pillar.name,
    score: Number(calculatePillarScore(pillar).toFixed(1))
  }));

  const getExecutiveInterpretation = (score) => {
    if (score <= 1.5) {
      return 'La organización opera de manera reactiva, con alta dependencia operativa y ausencia de estructura consolidada.';
    }

    if (score <= 2.5) {
      return 'La organización ha comenzado a desarrollar capacidades operativas básicas, aunque aún existen dependencias críticas y oportunidades importantes de estructuración.';
    }

    if (score <= 3.5) {
      return 'La organización cuenta con procesos definidos y capacidades operativas funcionales.';
    }

    if (score <= 4.5) {
      return 'La organización demuestra un nivel sólido de gestión operativa, con visibilidad y control estructurado.';
    }

    return 'La organización opera bajo un modelo avanzado de excelencia operacional y mejora continua.';
  };

  const getPillarInterpretation = (pillarName, score) => {
    if (score <= 1.5) {
      return `El pilar ${pillarName} presenta brechas críticas de control y estabilidad operativa.`;
    }

    if (score <= 2.5) {
      return `El pilar ${pillarName} evidencia capacidades iniciales con oportunidades importantes de evolución.`;
    }

    if (score <= 3.5) {
      return `El pilar ${pillarName} cuenta con bases operativas funcionales y procesos parcialmente estructurados.`;
    }

    if (score <= 4.5) {
      return `El pilar ${pillarName} refleja una gestión sólida con capacidad de seguimiento y control.`;
    }

    return `El pilar ${pillarName} opera bajo estándares avanzados de excelencia operacional.`;
  };

  const currentMaturityLevel = getMaturity(overallScore || 0);

  const generateExecutivePDF = async () => {
    try {

      setOpenExecutiveSections({
        organizacion: true,
        resumen: true,
        perfil: true,
        interpretacion: true,
        escalera: true
      });

      await new Promise((resolve) => setTimeout(resolve, 1200));

      const pdf = new jsPDF('p', 'mm', 'a4');

      const pageWidth = 210;
      const pageHeight = 297;

      pdf.setFillColor(11, 11, 11);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');

      pdf.setTextColor(255, 255, 255);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(30);

      pdf.text(
        'RESUMEN EJECUTIVO',
        pageWidth / 2,
        105,
        { align: 'center' }
      );

      pdf.setFontSize(16);
      pdf.setTextColor(180, 180, 180);

      pdf.text(
        'Informe de Madurez Operativa',
        pageWidth / 2,
        122,
        { align: 'center' }
      );

      pdf.setFontSize(18);
      pdf.setTextColor(255, 255, 255);

      pdf.text(
        organizationData.empresa?.trim()
          ? organizationData.empresa
          : 'Organización Evaluada',
        pageWidth / 2,
        142,
        { align: 'center' }
      );

      const sections = document.querySelectorAll('.pdf-section');

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];

        if (
          section.innerText.includes('Generación de Informe Ejecutivo')
        ) {
          continue;
        }

        const canvas = await html2canvas(section, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#0B0B0B',
          scrollY: -window.scrollY,
          windowWidth: section.scrollWidth,
          windowHeight: section.scrollHeight
        });

        const imgData = canvas.toDataURL('image/png');

        const margin = 10;

        const imgWidth = pageWidth - margin * 2;

        const imgHeight =
          (canvas.height * imgWidth) / canvas.width;

        pdf.addPage();

        if (imgHeight <= 277) {
          pdf.addImage(
            imgData,
            'PNG',
            margin,
            10,
            imgWidth,
            imgHeight
          );
        } else {
          let heightLeft = imgHeight;

          let position = 10;

          pdf.addImage(
            imgData,
            'PNG',
            margin,
            position,
            imgWidth,
            imgHeight
          );

          heightLeft -= 277;

          while (heightLeft > 0) {
            position = heightLeft - imgHeight + 10;

            pdf.addPage();

            pdf.addImage(
              imgData,
              'PNG',
              margin,
              position,
              imgWidth,
              imgHeight
            );

            heightLeft -= 277;
          }
        }
      }

      const totalPages = pdf.internal.getNumberOfPages();

      const lastPage = pdf.internal.pages[totalPages];

      if (
        lastPage &&
        lastPage.length <= 3
      ) {
        pdf.deletePage(totalPages);
      }

      const companyName =
        organizationData.empresa?.trim()
          ? organizationData.empresa
          : 'Organizacion';

      pdf.save(
        `${companyName}-Resumen-Ejecutivo-DANRA.pdf`
      );

      alert('Informe ejecutivo generado correctamente.');

    } catch (error) {
      console.error(error);
      alert('Ocurrió un error generando el informe PDF.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-4 mb-10 flex-wrap">
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              className={`px-5 py-3 rounded-xl border transition-all ${
                activePage === page
                  ? 'bg-amber-500 text-black border-amber-500'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-300'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <div className="mb-12">
          <h1 className="text-4xl font-light tracking-wide mb-4">
            DANRA
          </h1>
          <p className="text-xl text-zinc-400">
            Operational Maturity Assessment
          </p>
        </div>

        {activePage === 'Instrucciones' && (
          <div className="bg-zinc-900 rounded-3xl p-10 border border-zinc-800 mb-10">
            <h2 className="text-2xl font-semibold mb-6">Instrucciones</h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                Esta herramienta permite evaluar el nivel de madurez operativa
                de una organización mediante un diagnóstico ejecutivo basado
                en pilares estratégicos.
              </p>
              <p>
                Cada pregunta debe responderse utilizando una escala de madurez operativa del 1 al 5.
                La selección debe realizarse considerando el descriptor que mejor represente la realidad actual de la organización.
              </p>

              <div className="border border-zinc-800 rounded-2xl p-6 bg-zinc-950 mt-6">
                <h3 className="text-xl font-semibold mb-4 text-amber-400">
                  Uso del Modelo
                </h3>

                <div className="space-y-5 text-zinc-300 leading-relaxed">
                  <div>
                    <p className="font-semibold text-white mb-1">
                      Resultado Esperado
                    </p>
                    <p>
                      El sistema calculará automáticamente el nivel de madurez por pilar,
                      la madurez general, el perfil de madurez operativa y la interpretación estratégica de resultados.
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-8 text-2xl font-semibold text-white mb-8">
  Escala oficial de respuesta:
</p>

<div className="space-y-6 mt-8">

  {[
    {
      number: '1',
      title: 'Reactivo',
      color: 'from-red-950 via-red-900 to-red-950 border-red-700 text-red-300',
      
      description:
        'La empresa opera resolviendo urgencias. Sin estructura, sin procesos definidos y sin visibilidad operativa.'
    },

    {
      number: '2',
      title: 'Inicial',
      color: 'from-orange-950 via-orange-900 to-orange-950 border-orange-700 text-orange-300',
      
      description:
        'Existen algunos elementos básicos, pero son informales, inconsistentes o dependientes de personas.'
    },

    {
      number: '3',
      title: 'Estructurado',
      color: 'from-yellow-950 via-yellow-900 to-yellow-950 border-yellow-700 text-yellow-300',
      
      description:
        'La empresa tiene procesos definidos y seguimiento básico. Aún hay brechas relevantes.'
    },

    {
      number: '4',
      title: 'Gestionado',
      color: 'from-green-950 via-green-900 to-green-950 border-green-700 text-green-300',
      
      description:
        'Operación controlada con métricas, información confiable y dirección estratégica activa.'
    },

    {
      number: '5',
      title: 'Optimizado',
      color: 'from-cyan-950 via-cyan-900 to-cyan-950 border-cyan-700 text-cyan-300',
      
      description:
        'Empresa de alto desempeño. Mejora continua, datos en tiempo real y capacidad de escalar.'
    }
  ].map((item, index) => (

    <div
      key={index}
      className={`rounded-[32px] border bg-gradient-to-r ${item.color} p-5 md:p-8 shadow-2xl overflow-hidden`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

        <div className="flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-8 flex-1 w-full">

          <div className="min-w-[60px] md:min-w-[90px] text-left md:text-center">
            <div className="text-4xl md:text-6xl font-black leading-none">
              {item.number}
            </div>
          </div>

          <div className="hidden md:block w-px self-stretch bg-white/20" />

          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-bold mb-2 text-white tracking-tight break-words">
              {item.title}
            </h3>

            <p className="text-sm md:text-base leading-relaxed text-zinc-100 max-w-5xl break-words">
              {item.description}
            </p>
          </div>
        </div>

        
      </div>
    </div>

  ))}

</div>

<p className="mt-10 text-zinc-300 leading-relaxed text-lg">
  El resultado permitirá identificar riesgos operativos,
  oportunidades estratégicas y capacidad de dirección operativa.
</p>

<div className="mt-10 flex justify-end">
  <button
    onClick={() => {
      setActivePage('Datos de la Organización');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }}
    className="bg-amber-500 hover:bg-amber-400 transition-all text-black font-semibold px-6 py-3 rounded-2xl shadow-lg"
  >
    Continuar a Datos de la Organización
  </button>
</div>
            </div>
          </div>
        )}

        {activePage === 'Datos de la Organización' && (
          <div className="bg-zinc-900 rounded-3xl p-10 border border-zinc-800 mb-10">
            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-3">
                Datos de la Organización
              </h2>

              <p className="text-zinc-400 text-lg leading-relaxed max-w-4xl">
                Complete la información general de la organización para generar el informe ejecutivo final y realizar el envío automático del PDF al correo registrado.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="block text-zinc-300 mb-3 text-sm uppercase tracking-wide">
                  Empresa
                </label>
                <input
                  type="text"
                  value={organizationData.empresa}
                  onChange={(e) => handleOrganizationData('empresa', e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-amber-500"
                  placeholder="Nombre de la empresa"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-3 text-sm uppercase tracking-wide">
                  Giro del Negocio
                </label>
                <input
                  type="text"
                  value={organizationData.giro}
                  onChange={(e) => handleOrganizationData('giro', e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-amber-500"
                  placeholder="Industria o actividad principal"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-3 text-sm uppercase tracking-wide">
                  Nombre del Contacto
                </label>
                <input
                  type="text"
                  value={organizationData.contacto}
                  onChange={(e) => handleOrganizationData('contacto', e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-amber-500"
                  placeholder="Nombre completo"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-3 text-sm uppercase tracking-wide whitespace-nowrap">
                  CARGO
                </label>
                <input
                  type="text"
                  value={organizationData.cargo}
                  onChange={(e) => handleOrganizationData('cargo', e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-amber-500"
                  placeholder="Cargo del contacto"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-3 text-sm uppercase tracking-wide">
                  Número de Contacto
                </label>
                <input
                  type="text"
                  value={organizationData.numero}
                  onChange={(e) => handleOrganizationData('numero', e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-amber-500"
                  placeholder="Número telefónico"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-3 text-sm uppercase tracking-wide">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={organizationData.correo}
                  onChange={(e) => handleOrganizationData('correo', e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-amber-500"
                  placeholder="correo@empresa.com"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-3 text-sm uppercase tracking-wide">
                  Fecha de Evaluación
                </label>
                <input
                  type="date"
                  value={organizationData.fecha}
                  onChange={(e) => handleOrganizationData('fecha', e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-3 text-sm uppercase tracking-wide">
                  Cantidad de Colaboradores
                </label>
                <input
                  type="number"
                  value={organizationData.colaboradores}
                  onChange={(e) => handleOrganizationData('colaboradores', e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-amber-500"
                  placeholder="Número de colaboradores"
                />
              </div>
            </div>

            <div className="mt-10 flex justify-end">
              <button
                onClick={() => {
                setActivePage('Preguntas de Diagnóstico');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
                className="bg-amber-500 hover:bg-amber-400 transition-all text-black font-semibold px-6 py-3 rounded-2xl shadow-lg"
              >
                Continuar a Diagnóstico
              </button>
            </div>

            
          </div>
        )}

        {activePage === 'Preguntas de Diagnóstico' && (
          <div className="space-y-6">
            {pillars.map((pillar, index) => {
              const score = calculatePillarScore(pillar);
              const isOpen = openPillar === index;

              return (
                <div
                  key={index}
                  className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenPillar(isOpen ? null : index)}
                    className="w-full flex justify-between items-center p-8 hover:bg-zinc-800/30 transition-all text-left"
                  >
                    <div>
                      <h2 className="text-2xl font-semibold mb-2">
                        {pillar.name}
                      </h2>

                      <p className="text-zinc-500">
                        Evaluación ejecutiva del pilar estratégico
                      </p>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <p className="text-zinc-500 text-sm">Resultado</p>

                        <h3 className="text-3xl font-bold text-amber-400">
                          {score ? score.toFixed(1) : '0.0'}
                        </h3>

                        <p className="text-sm text-zinc-400 mt-1">
                          {getMaturity(score || 0)}
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="text-zinc-500 text-sm mb-1">
                          {isOpen ? 'Ocultar preguntas' : 'Ver preguntas'}
                        </div>

                        <div className="text-3xl text-amber-400 font-bold">
                          {isOpen ? '−' : '+'}
                        </div>
                      </div>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-8 pb-8 space-y-8 border-t border-zinc-800">
                      {pillar.questions.map((question, qIndex) => (
                        <div key={qIndex} className="pt-8">
                          <h3 className="text-2xl font-medium mb-6 max-w-5xl leading-relaxed">
                            {question}
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            {options.map((option) => (
                              <button
                                key={option.value}
                                onClick={() =>
                                  handleAnswer(
                                    pillar.name,
                                    question,
                                    option.value
                                  )
                                }
                                className={`rounded-3xl border p-6 text-left transition-all ${
                                  answers[`${pillar.name}-${question}`] === option.value
                                    ? 'border-amber-500 bg-amber-500/10'
                                    : 'border-zinc-800 bg-black/30 hover:border-zinc-600'
                                }`}
                              >
                                <div className="text-4xl font-black text-amber-400 mb-4">
                                  {option.label}
                                </div>

                                <p className="text-zinc-300 leading-relaxed text-sm">
                                  {responseGuides[question]?.[option.value - 1]}
                                </p>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  setActivePage('Resumen Ejecutivo');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-amber-500 hover:bg-amber-400 transition-all text-black font-semibold px-7 py-3 rounded-2xl shadow-lg"
              >
                Ver Resumen Ejecutivo
              </button>
            </div>
          </div>
        )}

        {activePage === 'Resumen Ejecutivo' && (
          <div ref={pdfRef} className="space-y-10">

            <div className="pdf-section bg-zinc-900 rounded-3xl p-10 border border-zinc-800">
              <button
                onClick={() => setOpenExecutiveSections(prev => ({ ...prev, organizacion: !prev.organizacion }))}
                className="w-full flex justify-between items-center mb-8 text-left"
              >
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-2">
                    Datos de la Organización
                  </h2>

                  <p className="text-zinc-500 text-lg">
                    Información general utilizada para el informe ejecutivo.
                  </p>
                </div>

                <div className="flex items-center gap-3 text-amber-400">
                  <span className="text-sm uppercase tracking-wider">
                    {openExecutiveSections.organizacion ? 'Ocultar' : 'Ver más'}
                  </span>
                  <span className="text-3xl font-light">
                    {openExecutiveSections.organizacion ? '−' : '+'}
                  </span>
                </div>
              </button>

              {openExecutiveSections.organizacion && (
              <>
              <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-10">
                <div>
                  <h1 className="text-2xl font-semibold tracking-wide mb-3 text-white">
                    DANRA
                  </h1>

                  <p className="text-lg text-zinc-400">
                    Informe Ejecutivo de Madurez Operativa
                  </p>
                </div>

                <div className="text-left lg:text-right">
                  <p className="text-2xl font-semibold text-white mb-2">
                    Daniel Racines
                  </p>

                  <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
                    Asesor en Gobierno Operativo y Estrategia de Negocio
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="border border-zinc-800 rounded-2xl p-5 bg-black/30">
                  <p className="text-zinc-500 text-sm mb-2 uppercase tracking-wide">
                    Empresa
                  </p>

                  <p className="text-white text-xl font-semibold">
                    {organizationData.empresa || '-'}
                  </p>
                </div>

                <div className="border border-zinc-800 rounded-2xl p-5 bg-black/30">
                  <p className="text-zinc-500 text-sm mb-2 uppercase tracking-wide">
                    Giro del Negocio
                  </p>

                  <p className="text-white text-xl font-semibold">
                    {organizationData.giro || '-'}
                  </p>
                </div>

                <div className="border border-zinc-800 rounded-2xl p-5 bg-black/30">
                  <p className="text-zinc-500 text-sm mb-2 uppercase tracking-wide">
                    Contacto
                  </p>

                  <p className="text-white text-xl font-semibold">
                    {organizationData.contacto || '-'}
                  </p>
                </div>

                <div className="border border-zinc-800 rounded-2xl p-5 bg-black/30">
                  <p className="text-zinc-500 text-sm mb-2 uppercase tracking-wide">
                    Cargo
                  </p>

                  <p className="text-white text-xl font-semibold">
                    {organizationData.cargo || '-'}
                  </p>
                </div>

                <div className="border border-zinc-800 rounded-2xl p-5 bg-black/30">
                  <p className="text-zinc-500 text-sm mb-2 uppercase tracking-wide">
                    Correo Electrónico
                  </p>

                  <p className="text-white text-xl font-semibold break-all">
                    {organizationData.correo || '-'}
                  </p>
                </div>

                <div className="border border-zinc-800 rounded-2xl p-5 bg-black/30">
                  <p className="text-zinc-500 text-sm mb-2 uppercase tracking-wide">
                    Fecha de Evaluación
                  </p>

                  <p className="text-white text-xl font-semibold">
                    {organizationData.fecha || '-'}
                  </p>
                </div>

                <div className="border border-zinc-800 rounded-2xl p-5 bg-black/30">
                  <p className="text-zinc-500 text-sm mb-2 uppercase tracking-wide">
                    Número de Contacto
                  </p>

                  <p className="text-white text-xl font-semibold">
                    {organizationData.numero || '-'}
                  </p>
                </div>

                <div className="border border-zinc-800 rounded-2xl p-5 bg-black/30">
                  <p className="text-zinc-500 text-sm mb-2 uppercase tracking-wide">
                    Colaboradores
                  </p>

                  <p className="text-white text-xl font-semibold">
                    {organizationData.colaboradores || '-'}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

            <div className="pdf-section bg-zinc-900 rounded-3xl p-10 border border-zinc-800">
              <button
                onClick={() => setOpenExecutiveSections(prev => ({ ...prev, resumen: !prev.resumen }))}
                className="w-full flex justify-between items-center mb-6 text-left"
              >
                <h2 className="text-2xl font-semibold">
                  Resumen General de Madurez
                </h2>

                <div className="flex items-center gap-3 text-amber-400">
                  <span className="text-sm uppercase tracking-wider">
                    {openExecutiveSections.resumen ? 'Ocultar' : 'Ver más'}
                  </span>
                  <span className="text-3xl font-light">
                    {openExecutiveSections.resumen ? '−' : '+'}
                  </span>
                </div>
              </button>

              {openExecutiveSections.resumen && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="border border-zinc-800 rounded-3xl p-8 bg-black/30">
                    <p className="text-zinc-500 text-lg mb-3">General de Madurez</p>
                    <div className="text-5xl font-black text-amber-400 mb-4">
                      {overallScore ? overallScore.toFixed(1) : '0.0'}
                    </div>
                    <p className="text-2xl text-white font-semibold">
                      {getMaturity(overallScore || 0)}
                    </p>
                  </div>

                  <div className="border border-zinc-800 rounded-3xl p-8 bg-black/30">
                    <p className="text-zinc-500 text-lg mb-5">Interpretación</p>
                    <p className="text-zinc-300 text-lg leading-relaxed">
                      {!isAssessmentComplete
                        ? 'La interpretación ejecutiva estará disponible una vez completado el diagnóstico organizacional.'
                        : getExecutiveInterpretation(overallScore)}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-10">

              <div className="bg-zinc-900 rounded-3xl p-10 border border-zinc-800 w-full">
                <button
                  onClick={() => setOpenExecutiveSections(prev => ({ ...prev, perfil: !prev.perfil }))}
                  className="w-full flex justify-between items-center mb-6 text-left"
                >
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      Perfil Ejecutivo de Madurez Operativa
                    </h3>
                    <p className="text-zinc-500">
                      Visualización consolidada del desempeño organizacional.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-amber-400">
                    <span className="text-sm uppercase tracking-wider">
                      {openExecutiveSections.perfil ? 'Ocultar' : 'Ver más'}
                    </span>
                    <span className="text-3xl font-light">
                      {openExecutiveSections.perfil ? '−' : '+'}
                    </span>
                  </div>
                </button>

                {openExecutiveSections.perfil && (
                  <div className="h-[950px] w-full">
  <ResponsiveContainer width="100%" height="100%">
    <RadarChart
      data={radarData}
      outerRadius="72%"
      margin={{ top: 120, right: 260, bottom: 120, left: 260 }}
    >
      <PolarGrid stroke="#52525B" />

      <PolarAngleAxis
        dataKey="pillar"
        tick={({ payload, x, y, textAnchor }) => {
          const words = payload.value.split(' ');

          const lines = [];
          for (let i = 0; i < words.length; i += 2) {
            lines.push(words.slice(i, i + 2).join(' '));
          }

          return (
            <text
              x={x}
              y={y}
              textAnchor={textAnchor}
              fill="#F4F4F5"
              fontSize={16}
              fontWeight={700}
            >
              {lines.map((line, index) => (
                <tspan
                  key={index}
                  x={x}
                  dy={index === 0 ? 0 : 18}
                >
                  {line}
                </tspan>
              ))}
            </text>
          );
        }}
      />

      <PolarRadiusAxis
        angle={30}
        domain={[0, 5]}
        tick={{ fill: '#FFFFFF', fontSize: 11 }}
      />

      <Radar
        name="Madurez"
        dataKey="score"
        stroke="#F59E0B"
        fill="#F59E0B"
        fillOpacity={0.45}
      />
    </RadarChart>
  </ResponsiveContainer>
</div>
                )}
              </div>

              <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
                <button
                  onClick={() => setOpenExecutiveSections(prev => ({ ...prev, interpretacion: !prev.interpretacion }))}
                  className="w-full flex justify-between items-start mb-6 text-left"
                >
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">
                      Interpretación Estratégica por Pilar
                    </h3>
                    <p className="text-zinc-500">
                      Análisis ejecutivo de fortalezas y oportunidades.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-amber-400">
                    <span className="text-sm uppercase tracking-wider">
                      {openExecutiveSections.interpretacion ? 'Ocultar' : 'Ver más'}
                    </span>
                    <span className="text-3xl font-light">
                      {openExecutiveSections.interpretacion ? '−' : '+'}
                    </span>
                  </div>
                </button>

                {openExecutiveSections.interpretacion && (
                  <div className="space-y-6">
                    {pillars.map((pillar, index) => {
                      const score = calculatePillarScore(pillar);

                      return (
                        <div
                          key={index}
                          className="border border-zinc-800 rounded-3xl p-6 bg-black/30"
                        >
                          <div className="flex justify-between items-start mb-4 gap-4">
                            <h4 className="text-xl font-bold max-w-[80%]">
                              {pillar.name}
                            </h4>

                            <div className="text-amber-400 text-3xl font-black whitespace-nowrap">
                              {score ? score.toFixed(1) : '0.0'}
                            </div>
                          </div>

                          <p className="text-zinc-300 leading-relaxed">
                            {!isAssessmentComplete
                              ? 'La interpretación estratégica por pilar estará disponible una vez completado el diagnóstico organizacional.'
                              : getPillarInterpretation(pillar.name, score)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="pdf-section border border-zinc-800 rounded-3xl p-8 md:p-10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black overflow-hidden">
              <div className="flex justify-between items-start gap-6 mb-10">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    Escalera Ejecutiva de Madurez
                  </h3>

                  <p className="text-zinc-400 text-lg max-w-3xl leading-relaxed">
                    Visualización estratégica del nivel de madurez organizacional.
                  </p>
                </div>

                <button
                  onClick={() => setOpenExecutiveSections(prev => ({ ...prev, escalera: !prev.escalera }))}
                  className="flex items-center gap-3 text-amber-400 pt-1 shrink-0"
                >
                  <span className="text-sm uppercase tracking-wider">
                    {openExecutiveSections.escalera ? 'Ocultar' : 'Ver más'}
                  </span>
                  <span className="text-3xl font-light">
                    {openExecutiveSections.escalera ? '−' : '+'}
                  </span>
                </button>
              </div>

              {openExecutiveSections.escalera && (
                <div className="space-y-10">
                  <div className="bg-black/40 border border-violet-500/30 rounded-2xl px-6 py-5 max-w-[260px]">
                    <p className="text-violet-400 uppercase tracking-widest text-sm mb-2 font-semibold">
                      Puntaje Promedio
                    </p>

                    <div className="text-5xl font-black text-violet-400 mb-2">
                      {overallScore ? overallScore.toFixed(1) : '0.0'}
                    </div>

                    <p className="text-zinc-300 text-lg font-semibold">
                      {currentMaturityLevel}
                    </p>
                  </div>

                  <div className="overflow-x-auto overflow-y-visible py-4">
                    <div className="min-w-[1050px] flex items-end gap-5 h-[420px] px-6 pt-10 pb-8 border-b border-zinc-800">
                      {[
                        { level: '1', title: 'Reactivo', color: 'from-red-950 to-red-800 border-red-500', active: overallScore <= 1.5, height: 'h-[140px]', description: 'Responde a problemas cuando ocurren.' },
                        { level: '2', title: 'Inicial', color: 'from-orange-950 to-orange-800 border-orange-500', active: overallScore > 1.5 && overallScore <= 2.5, height: 'h-[170px]', description: 'Comienza a definir procesos básicos.' },
                        { level: '3', title: 'Estructurado', color: 'from-yellow-950 to-yellow-800 border-yellow-500', active: overallScore > 2.5 && overallScore <= 3.5, height: 'h-[230px]', description: 'Procesos definidos y seguimiento operativo.' },
                        { level: '4', title: 'Gestionado', color: 'from-green-950 to-green-800 border-green-500', active: overallScore > 3.5 && overallScore <= 4.5, height: 'h-[290px]', description: 'Operación controlada con KPIs y seguimiento.' },
                        { level: '5', title: 'Optimizado', color: 'from-cyan-950 to-cyan-800 border-cyan-500', active: overallScore > 4.5, height: 'h-[340px]', description: 'Mejora continua e innovación sistemática.' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center">
                          <div className="text-zinc-300 text-base mb-4 font-semibold tracking-wide">
                            Nivel {item.level}
                          </div>

                          <div className={`w-full rounded-t-3xl border bg-gradient-to-b ${item.color} ${item.height} relative overflow-visible`}>
                            {isAssessmentComplete && item.active && (
                              <div className="absolute top-3 right-3 bg-white/10 border border-white/20 text-white text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full">
                                Actual
                              </div>
                            )}

                            <div className="absolute inset-0 px-5 pb-5 pt-5 flex flex-col justify-between">
                              <div className="text-2xl font-black text-white/95 mb-2 leading-none">
                                {item.level}
                              </div>

                              <h4 className="text-base font-bold text-white mb-2 leading-tight">
                                {item.title}
                              </h4>

                              <p className="text-xs text-zinc-100 leading-relaxed">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pdf-section grid grid-cols-1 xl:grid-cols-2 gap-6 mb-14">
              <div className="border border-violet-500/20 rounded-3xl p-8 bg-gradient-to-br from-violet-950/30 to-black/40">
                <h4 className="text-2xl font-semibold text-violet-400 mb-4">
                  Próximo Paso Estratégico
                </h4>

                <p className="text-zinc-300 text-lg leading-relaxed">
                  {!isAssessmentComplete
                    ? 'Complete la evaluación para visualizar recomendaciones estratégicas y próximos pasos ejecutivos.'
                    : 'La organización cuenta con información estratégica suficiente para priorizar iniciativas de evolución operativa.'}
                </p>
              </div>

              <div className="border border-zinc-800 rounded-3xl p-8 bg-black/30">
                <h4 className="text-2xl font-semibold text-cyan-400 mb-6">
                  Impacto Esperado
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-center">
                  <div className="border border-zinc-800 rounded-2xl p-5">
                    <p className="text-white font-semibold mb-2">Mayor eficiencia</p>
                  </div>

                  <div className="border border-zinc-800 rounded-2xl p-5">
                    <p className="text-white font-semibold mb-2">Reducción de riesgos</p>
                  </div>

                  <div className="border border-zinc-800 rounded-2xl p-5">
                    <p className="text-white font-semibold mb-2">Mejor dirección</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pdf-section border border-amber-700/30 rounded-3xl p-8 bg-gradient-to-br from-amber-950/40 to-zinc-950">
              <h3 className="text-2xl font-semibold text-amber-400 mb-6">
                Generación de Informe Ejecutivo
              </h3>

              <p className="text-zinc-300 text-lg leading-relaxed max-w-5xl mb-10">
                Una vez finalizado el diagnóstico operativo, el sistema podrá generar automáticamente un informe ejecutivo en PDF.
              </p>

              <button
                onClick={generateExecutivePDF}
                className="bg-amber-500 hover:bg-amber-400 transition-all text-black font-bold text-lg px-10 py-5 rounded-2xl shadow-2xl"
              >
                Finalizar Evaluación y Generar Informe
              </button>
            </div>
          </div>
        )}

        {activePage === 'Descriptores de Nivel' && (
          <div className="bg-zinc-900 rounded-3xl p-10 border border-zinc-800 mb-10 overflow-x-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-3">
                Descriptores de Nivel por Pilar
              </h2>
              <p className="text-zinc-400 text-lg">
                Guía ejecutiva de referencia para interpretar el nivel de madurez operativa
              </p>
            </div>

            <div className="min-w-[1200px] rounded-3xl overflow-hidden border border-zinc-800">
              <div className="grid grid-cols-6 bg-zinc-950 text-center text-sm font-semibold">
                <div className="p-5 border-r border-zinc-800 text-left">
                  Pilar
                </div>
                <div className="p-5 bg-red-950/60 text-red-300 border-r border-zinc-800">
                  1 — Reactivo
                </div>
                <div className="p-5 bg-orange-950/60 text-orange-300 border-r border-zinc-800">
                  2 — Inicial
                </div>
                <div className="p-5 bg-yellow-900/40 text-yellow-300 border-r border-zinc-800">
                  3 — Estructurado
                </div>
                <div className="p-5 bg-green-900/40 text-green-300 border-r border-zinc-800">
                  4 — Gestionado
                </div>
                <div className="p-5 bg-emerald-900/40 text-emerald-300">
                  5 — Optimizado
                </div>
              </div>

              {[
                {
                  pillar: 'Gobierno Operativo',
                  values: [
                    'Sin responsables definidos. El dueño resuelve todo.',
                    'Algunos roles informales. Poca claridad.',
                    'Roles definidos. Reuniones básicas de seguimiento.',
                    'Estructura clara, reuniones regulares y decisiones delegadas.',
                    'Gobierno formal, roles documentados y cadencias establecidas.'
                  ]
                },
                {
                  pillar: 'Procesos y Estandarización',
                  values: [
                    'Sin documentación. Cada persona trabaja a su manera.',
                    'Procesos escritos pero sin aplicación consistente.',
                    'Procesos críticos parcialmente documentados.',
                    'Procesos estandarizados y conocidos por el equipo.',
                    'Mejora continua y actualización periódica de procesos.'
                  ]
                },
                {
                  pillar: 'Información y Visibilidad',
                  values: [
                    'Sin indicadores. Decisiones por intuición.',
                    'Datos aislados y poca confiabilidad.',
                    'KPIs básicos y reportes manuales.',
                    'Información centralizada y dashboards básicos.',
                    'Información en tiempo real y decisiones basadas en datos.'
                  ]
                },
                {
                  pillar: 'Control Operativo',
                  values: [
                    'Sin seguimiento. Los errores se detectan tarde.',
                    'Seguimiento informal y reprocesos frecuentes.',
                    'Seguimiento básico y algunos controles de calidad.',
                    'Control operativo estructurado y pocos reprocesos.',
                    'Control integral con mejora continua y prevención temprana.'
                  ]
                },
                {
                  pillar: 'Tecnología y Transformación Digital',
                  values: [
                    'Uso básico de herramientas aisladas.',
                    'Herramientas digitales sin integración.',
                    'Digitalización parcial de procesos.',
                    'Stack integrado y automatización parcial.',
                    'Transformación digital consolidada y BI automatizado.'
                  ]
                },
                {
                  pillar: 'Dirección Estratégica',
                  values: [
                    'La dirección opera reaccionando a urgencias.',
                    'Objetivos informales y bajo seguimiento.',
                    'Plan estratégico básico y seguimiento parcial.',
                    'Estrategia documentada con KPIs activos.',
                    'Dirección estratégica formal y revisión continua.'
                  ]
                },
                {
                  pillar: 'Sostenibilidad y Escalabilidad',
                  values: [
                    'La operación colapsaría ante crecimiento.',
                    'Existen algunos elementos de sostenibilidad.',
                    'Base operativa funcional con riesgos importantes.',
                    'Capacidad de escalar manteniendo control.',
                    'Modelo operativo diseñado para evolucionar sosteniblemente.'
                  ]
                }
              ].map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-6 border-t border-zinc-800"
                >
                  <div className="p-5 bg-zinc-950 font-semibold border-r border-zinc-800 flex items-center">
                    {row.pillar}
                  </div>

                  {row.values.map((value, valueIdx) => (
                    <div
                      key={valueIdx}
                      className="p-5 text-sm leading-relaxed border-r last:border-r-0 border-zinc-800 text-zinc-300"
                    >
                      {value}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
