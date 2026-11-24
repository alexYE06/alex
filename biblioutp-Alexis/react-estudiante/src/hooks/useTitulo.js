import { useEffect } from 'react';

export function useTitulo(texto) {
  useEffect(() => {
    document.title = `BiblioUTP | ${texto}`;
  }, [texto]);
}
