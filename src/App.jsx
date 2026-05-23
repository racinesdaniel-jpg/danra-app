import React, { useState } from 'react';
import Login from './Login';

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

  // APP PRINCIPAL
  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white p-10">

      <div className="max-w-6xl mx-auto">

        <div className="mb-10">
          <h1 className="text-5xl font-bold text-amber-400 mb-4">
            DANRA
          </h1>

          <p className="text-zinc-400 text-xl">
            Operational Maturity Assessment
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10">

          <h2 className="text-3xl font-semibold mb-6">
            Bienvenido a DANRA
          </h2>

          <p className="text-zinc-300 leading-relaxed text-lg">
            El login ya está funcionando correctamente con Firebase.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-black/40 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-amber-400 text-xl font-bold mb-3">
                Gobierno Operativo
              </h3>

              <p className="text-zinc-400">
                Evaluación estratégica operativa.
              </p>
            </div>

            <div className="bg-black/40 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-amber-400 text-xl font-bold mb-3">
                Diagnóstico
              </h3>

              <p className="text-zinc-400">
                Medición de madurez organizacional.
              </p>
            </div>

            <div className="bg-black/40 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-amber-400 text-xl font-bold mb-3">
                Reportes
              </h3>

              <p className="text-zinc-400">
                Generación automática de PDF ejecutivo.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}