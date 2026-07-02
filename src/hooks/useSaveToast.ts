import { useCallback, useRef, useState } from 'react';

export function useSaveToast(durationMs = 1500) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setVisible(true);
    timeoutRef.current = setTimeout(() => setVisible(false), durationMs);
  }, [durationMs]);

  return { visible, show };
}
