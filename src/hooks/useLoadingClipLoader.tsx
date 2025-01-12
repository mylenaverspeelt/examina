import { useState, useCallback } from 'react';

export const useLoadingClipLoader = () => {
  const [loading, setLoading] = useState(false);

  const withLoading = useCallback(async (asyncCallback: () => Promise<void>) => {
    setLoading(true);
    try {
      await asyncCallback();
    } catch (error) {
      console.error('Erro ao executar tarefa assíncrona:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, setLoading, withLoading };
};
