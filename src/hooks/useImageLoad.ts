import { useState, useEffect } from 'react';

type Status = 'idle' | 'loading' | 'ok' | 'error';

export function useImageLoad(url: string | undefined) {
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    if (!url) { setStatus('idle'); return; }
    setStatus('loading');
    const img = new Image();
    img.onload = () => setStatus('ok');
    img.onerror = () => setStatus('error');
    img.src = url;
    return () => { img.onload = null; img.onerror = null; };
  }, [url]);

  return {
    loaded: status === 'ok',
    loading: status === 'loading',
    error: status === 'error',
  };
}
