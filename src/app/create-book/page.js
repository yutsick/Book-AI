"use client";

import { useState, useEffect } from "react";
import { CreateBookProvider } from '@/contexts/CreateBookContext';
import { GenreProvider } from '@/contexts/CreateGenreContext';
import MainScreen from './MainScreen';

const PASSWORD_HASH = "70ecd9ad3ff870d960ec90969876ba7d3a5427254e5907105ceb009aad4673a1";

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export default function Page() {
  const [authenticated, setAuthenticated] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    const savedHash = localStorage.getItem("authenticated");
    if (savedHash === PASSWORD_HASH) {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = async () => {
    const hashedInput = await hashPassword(input);
    if (hashedInput === PASSWORD_HASH) {
      localStorage.setItem("authenticated", hashedInput);
      setAuthenticated(true);
    } else {
      alert("Wrong password");
    }
  };


  return authenticated ? (
    <GenreProvider>
      <CreateBookProvider>
        <MainScreen />

      </CreateBookProvider>
    </GenreProvider>
  ) : (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2 className="text-orange">Enter password</h2>
      <input
        type="password"
        value={input}
        className="border-2 border-black/50 rounded-md p-2"
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="mt-5 border bg-orange w-fit px-4 py-2 mx-auto rounded-md">
        <button onClick={handleLogin}>Log in</button>
      </div>
    </div>
  );
}
