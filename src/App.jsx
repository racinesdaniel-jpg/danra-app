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
  // DESDE AQUÍ EMPIEZA TU APP
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
    }
  ];

  const options = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 }
  ];

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

    return values.length
      ? total / values.length
      : 0;
  };

  const radarData = pillars.map((pillar) => ({
    pillar: pillar.name,
    score: Number(calculatePillarScore(pillar).toFixed(1))
  }));

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white p-8">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-10">

          <div>
            <h1 className="text-5xl font-bold text-amber-400 mb-3">
              DANRA
            </h1>

            <p className="text-zinc-400 text-xl">
              Operational Maturity Assessment
            </p>
          </div>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="bg-zinc-900 border border-zinc-700 hover:border-red-500 hover:text-red-400 transition-all px-5 py-3 rounded-2xl"
          >
            Cerrar sesión
          </button>

        </div>

        {/* RADAR */}

        <div className="bg-zinc-900 rounded-3xl p-10 border border-zinc-800 mb-10">

          <h2 className="text-3xl font-semibold mb-10">
            Perfil Ejecutivo de Madurez
          </h2>

          <div className="w-full h-[500px]">

            <ResponsiveContainer width="100%" height="100%">

              <RadarChart
                data={radarData}
                outerRadius="70%"
              >

                <PolarGrid stroke="#444" />

                <PolarAngleAxis
                  dataKey="pillar"
                  tick={{ fill: '#FFF', fontSize: 14 }}
                />

                <PolarRadiusAxis
                  domain={[0, 5]}
                  tick={{ fill: '#AAA' }}
                />

                <Radar
                  dataKey="score"
                  stroke="#F59E0B"
                  fill="#F59E0B"
                  fillOpacity={0.5}
                />

              </RadarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* PREGUNTAS */}

        <div className="space-y-6">

          {pillars.map((pillar, index) => (

            <div
              key={index}
              className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8"
            >

              <h2 className="text-2xl font-semibold mb-8">
                {pillar.name}
              </h2>

              <div className="space-y-10">

                {pillar.questions.map((question, qIndex) => (

                  <div key={qIndex}>

                    <h3 className="text-xl mb-5 leading-relaxed">
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
                              : 'border-zinc-700 bg-black/30'
                          }`}
                        >

                          <div className="text-4xl font-black text-amber-400 mb-3">
                            {option.label}
                          </div>

                        </button>

                      ))}

                    </div>

                  </div>

                ))}

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}