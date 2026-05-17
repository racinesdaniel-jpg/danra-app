import React, { useState } from 'react';
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
    'Diagnóstico',
    'Resumen Ejecutivo',
    'Descriptores de Nivel'
  ];

  const [activePage, setActivePage] = useState('Diagnóstico');

  const radarData = pillars.map((pillar) => ({
    pillar: pillar.name,
    score: Number(calculatePillarScore(pillar).toFixed(1))
  }));

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
          <h1 className="text-5xl font-light tracking-wide mb-4">
            DANRA
          </h1>
          <p className="text-xl text-zinc-400">
            Operational Maturity Assessment
          </p>
        </div>

        {activePage === 'Instrucciones' && (
          <div className="bg-zinc-900 rounded-3xl p-10 border border-zinc-800 mb-10">
            <h2 className="text-3xl font-semibold mb-6">Instrucciones</h2>
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

              <p className="mt-8">
                Escala oficial de respuesta:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
                {options.map((option, index) => (

                  <div
                    key={option.value}
                    className="border border-zinc-800 rounded-2xl p-4 bg-zinc-950"
                  >
                    <h3 className="text-2xl font-bold text-amber-400 mb-2">
                      {option.label}
                    </h3>
                    <div>
                      <p className="text-zinc-100 font-semibold mb-2">
                        Nivel {option.label}
                      </p>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        Evaluación referencial de madurez operativa.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p>
                El resultado permitirá identificar riesgos operativos,
                oportunidades estratégicas y capacidad de dirección operativa.
              </p>
            </div>
          </div>
        )}

        {activePage === 'Diagnóstico' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
            <p className="text-zinc-400 text-sm mb-2">Madurez General</p>
            <h2 className="text-4xl font-semibold mb-3">
              {overallScore ? overallScore.toFixed(1) : '0.0'}
            </h2>
            <p className="text-amber-400 text-lg">
              {getMaturity(overallScore || 0)}
            </p>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 lg:col-span-2">
            <h3 className="text-2xl mb-4">Visión Ejecutiva</h3>
            <p className="text-zinc-400 leading-relaxed">
              Esta evaluación permite identificar el nivel de madurez operativa,
              estructura organizacional, capacidad de control y dirección
              estratégica de la organización.
            </p>
          </div>
        </div>

            <div className="space-y-8">
          {pillars.map((pillar, index) => {
            const score = calculatePillarScore(pillar);

            return (
              <div
                key={index}
                className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800"
              >
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">
                      {pillar.name}
                    </h2>
                    <p className="text-zinc-500">
                      Evaluación ejecutiva del pilar estratégico
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-zinc-500 text-sm">Resultado</p>
                    <h3 className="text-3xl font-bold text-amber-400">
                      {score ? score.toFixed(1) : '0.0'}
                    </h3>
                    <p className="text-sm text-zinc-400 mt-1">
                      {getMaturity(score || 0)}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {pillar.questions.map((question, qIndex) => (
                    <div
                      key={qIndex}
                      className="border border-zinc-800 rounded-2xl p-6"
                    >
                      <p className="text-lg mb-5 leading-relaxed">
                        {question}
                      </p>

                      <div className="flex flex-wrap gap-3">
                        {options.map((option, oIndex) => {
                          const guide = responseGuides[question]?.[oIndex] || option.description;
                          const selected =
                            answers[`${pillar.name}-${question}`] === option.value;

                          return (
                            <button
                              key={oIndex}
                              onClick={() =>
                                handleAnswer(
                                  pillar.name,
                                  question,
                                  option.value
                                )
                              }
                              className={`min-w-[85px] px-5 py-4 rounded-2xl transition-all border ${
                                selected
                                  ? 'bg-amber-500 text-black border-amber-500'
                                  : 'bg-zinc-950 border-zinc-700 text-zinc-300 hover:border-zinc-500'
                              }`}
                            >
                              <div className="text-2xl font-bold mb-1">
                                {option.label}
                              </div>
                              <div className="text-xs opacity-90 leading-relaxed max-w-[140px]">
                                {guide}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
          </>
        )}

        {activePage === 'Resumen Ejecutivo' && (
          <>
            <div className="bg-zinc-900 rounded-3xl p-10 border border-zinc-800 mb-10">
              <h2 className="text-3xl font-semibold mb-6">Resumen Ejecutivo</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border border-zinc-800 rounded-2xl p-6">
                  <p className="text-zinc-500 mb-2">Madurez General</p>
                  <h3 className="text-5xl font-bold text-amber-400 mb-3">
                    {overallScore ? overallScore.toFixed(1) : '0.0'}
                  </h3>
                  <p className="text-xl text-zinc-300">
                    {getMaturity(overallScore || 0)}
                  </p>
                </div>

                <div className="border border-zinc-800 rounded-2xl p-6">
                  <p className="text-zinc-500 mb-4">Interpretación</p>

                  {!isAssessmentComplete ? (
                    <p className="text-zinc-400 leading-relaxed">
                      Una vez finalizada la evaluación de madurez operativa,
                      se generará automáticamente la interpretación estratégica
                      de resultados y el nivel de madurez de la organización.
                    </p>
                  ) : (
                    <p className="text-zinc-300 leading-relaxed">
                      La evaluación ha sido completada exitosamente.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-10 border border-zinc-800 rounded-3xl p-8 bg-zinc-950">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">
                    Perfil de Madurez Operativa
                  </h3>
                  <p className="text-zinc-500">
                    Visualización ejecutiva del desempeño por pilar estratégico
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
                <div className="border border-zinc-800 rounded-3xl p-6 bg-zinc-950">
                  <div className="h-[650px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData} outerRadius="75%">
                        <PolarGrid stroke="#52525b" strokeWidth={1.2} />

                        <PolarAngleAxis
                          dataKey="pillar"
                          tick={{ fill: '#fafafa', fontSize: 16, fontWeight: 700 }}
                        />

                        <PolarRadiusAxis
                          domain={[0, 5]}
                          tick={{ fill: '#f4f4f5', fontSize: 16, fontWeight: 700 }}
                          axisLine={{ stroke: '#71717a' }}
                        />

                        <Radar
                          name="Madurez"
                          dataKey="score"
                          stroke="#f59e0b"
                          strokeWidth={3}
                          fill="#f59e0b"
                          fillOpacity={0.45}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <h3 className="text-3xl font-semibold mb-2">
                      Interpretación Estratégica por Pilar
                    </h3>
                    <p className="text-zinc-500 text-lg">
                      Análisis ejecutivo de fortalezas, riesgos y oportunidades operativas.
                    </p>
                  </div>

                  {pillars.map((pillar, index) => {
                    const score = calculatePillarScore(pillar);

                    const interpretation =
                      score <= 2
                        ? `El pilar ${pillar.name} presenta oportunidades relevantes de fortalecimiento operativo y estructuración.`
                        : score <= 3.5
                        ? `El pilar ${pillar.name} cuenta con capacidades parcialmente estructuradas, aunque todavía existen brechas de consolidación.`
                        : `El pilar ${pillar.name} presenta un nivel sólido de madurez y capacidades operativas consolidadas.`;

                    return (
                      <div
                        key={index}
                        className="border border-zinc-800 rounded-3xl p-6 bg-zinc-950"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-2xl font-semibold text-white">
                            {pillar.name}
                          </h4>

                          <div className="text-3xl font-bold text-amber-400">
                            {score.toFixed(1)}
                          </div>
                        </div>

                        <p className="text-zinc-300 leading-relaxed text-lg">
                          {interpretation}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}

        {activePage === 'Descriptores de Nivel' && (
          <div className="bg-zinc-900 rounded-3xl p-10 border border-zinc-800 mb-10 overflow-x-auto">
            <div className="mb-8">
              <h2 className="text-4xl font-semibold mb-3">
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
