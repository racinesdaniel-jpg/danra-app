import React, { useState, useRef } from 'react';
import Login from './Login';

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

  // LOGIN
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // SI NO ESTÁ LOGUEADO
  if (!isAuthenticated) {
    return (
      <Login
        onLogin={() => setIsAuthenticated(true)}
      />
    );
  }

  // =========================
  // RESTO DE TU APP
  // =========================

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

  const pdfRef = useRef();

  const radarData = pillars.map((pillar) => ({
    pillar: pillar.name,
    score: Number(calculatePillarScore(pillar).toFixed(1))
  }));

  const generateExecutivePDF = async () => {
    try {

      const pdf = new jsPDF('p', 'mm', 'a4');

      pdf.text('Resumen Ejecutivo DANRA', 20, 20);

      pdf.save('danra-resumen.pdf');

    } catch (error) {
      console.error(error);
      alert('Error generando PDF');
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
            <h2 className="text-2xl font-semibold mb-6">
              Instrucciones
            </h2>

            <p className="text-zinc-300 leading-relaxed">
              Esta herramienta permite evaluar el nivel de madurez operativa
              de una organización mediante un diagnóstico ejecutivo.
            </p>
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
                    className="w-full flex justify-between items-center p-8 text-left"
                  >

                    <div>
                      <h2 className="text-2xl font-semibold mb-2">
                        {pillar.name}
                      </h2>

                      <p className="text-zinc-500">
                        Resultado: {score.toFixed(1)}
                      </p>
                    </div>

                    <div className="text-3xl text-amber-400">
                      {isOpen ? '−' : '+'}
                    </div>

                  </button>

                  {isOpen && (
                    <div className="px-8 pb-8 space-y-8 border-t border-zinc-800">

                      {pillar.questions.map((question, qIndex) => (
                        <div key={qIndex} className="pt-8">

                          <h3 className="text-xl font-medium mb-6">
                            {question}
                          </h3>

                          <div className="grid grid-cols-5 gap-4">

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
                                className={`rounded-2xl border p-6 transition-all ${
                                  answers[`${pillar.name}-${question}`] === option.value
                                    ? 'border-amber-500 bg-amber-500/10'
                                    : 'border-zinc-800 bg-black/30'
                                }`}
                              >
                                <div className="text-3xl font-bold text-amber-400">
                                  {option.label}
                                </div>
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

          </div>
        )}

        {activePage === 'Resumen Ejecutivo' && (
          <div className="bg-zinc-900 rounded-3xl p-10 border border-zinc-800">

            <h2 className="text-3xl font-bold mb-6">
              Resumen Ejecutivo
            </h2>

            <div className="mb-8">
              <p className="text-zinc-400 mb-2">
                Madurez General
              </p>

              <div className="text-6xl font-black text-amber-400">
                {overallScore.toFixed(1)}
              </div>

              <p className="text-xl mt-3">
                {getMaturity(overallScore)}
              </p>
            </div>

            <div className="w-full h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="pillar" />
                  <PolarRadiusAxis domain={[0, 5]} />
                  <Radar
                    dataKey="score"
                    stroke="#F59E0B"
                    fill="#F59E0B"
                    fillOpacity={0.4}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <button
              onClick={generateExecutivePDF}
              className="mt-10 bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-4 rounded-2xl"
            >
              Generar PDF
            </button>

          </div>
        )}

      </div>
    </div>
  );
}