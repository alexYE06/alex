import { createContext, useContext, useState } from 'react';
import db from '../data/db.json';
import { esCorreoUTP } from '../core/validadores.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  const login = (correo, password) => {
    if (!esCorreoUTP(correo)) {
      return { ok: false, error: 'El correo debe ser institucional (@utp.edu.pe)' };
    }
    const encontrado = db.usuarios.find(
      (u) => u.correo.toLowerCase() === correo.toLowerCase() && u.password === password
    );
    if (!encontrado) {
      return { ok: false, error: 'Credenciales incorrectas' };
    }
    const { password: _, ...usuarioSinClave } = encontrado;
    setUsuario(usuarioSinClave);
    return { ok: true };
  };

  const logout = () => setUsuario(null);

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
