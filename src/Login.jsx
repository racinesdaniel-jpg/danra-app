import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';

import React, { useState } from 'react';
import { auth } from './firebase';

export default function Login({ onLogin }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      onLogin();

    } catch (err) {
      setError('Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">

      <form
        onSubmit={handleLogin}
        className="bg-zinc-900 p-10 rounded-3xl border border-zinc-800 w-full max-w-md"
      >

        <h1 className="text-3xl text-white font-bold mb-8">
          Acceso DANRA
        </h1>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-4 rounded-xl bg-zinc-950 border border-zinc-700 text-white"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-4 rounded-xl bg-zinc-950 border border-zinc-700 text-white"
        />

        {error && (
          <p className="text-red-500 mb-4">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 rounded-xl"
        >
          Ingresar
        </button>
<p
  onClick={handleRegister}
  className="text-center text-sm text-zinc-400 mt-4 cursor-pointer hover:text-amber-400 transition-all"
>
  ¿No tienes cuenta? Crear cuenta
</p>
      </form>
    </div>
  );
}