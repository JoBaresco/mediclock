import { useCallback, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const INACTIVITY_TIMEOUT_KEY = 'inactivity_timeout';
export const DEFAULT_INACTIVITY_TIMEOUT_MINUTES = 15;

type UseInactivityTimerOptions = {
  enabled: boolean;
  onTimeout: () => void;
};

type UseInactivityTimerResult = {
  registerActivity: () => void;
  setInputActive: (active: boolean) => void;
};

export const useInactivityTimer = ({ enabled, onTimeout }: UseInactivityTimerOptions): UseInactivityTimerResult => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInputActiveRef = useRef(false);
  const enabledRef = useRef(enabled);
  const onTimeoutRef = useRef(onTimeout);

  enabledRef.current = enabled;
  onTimeoutRef.current = onTimeout;

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const schedule = useCallback(async () => {
    clear();
    if (!enabledRef.current || isInputActiveRef.current) {
      return;
    }

    const stored = await AsyncStorage.getItem(INACTIVITY_TIMEOUT_KEY);
    const minutes = stored != null ? Number(stored) : DEFAULT_INACTIVITY_TIMEOUT_MINUTES;

    if (!minutes || minutes <= 0) {
      return;
    }

    timeoutRef.current = setTimeout(() => {
      onTimeoutRef.current();
    }, minutes * 60 * 1000);
  }, [clear]);

  const registerActivity = useCallback(() => {
    void schedule();
  }, [schedule]);

  const setInputActive = useCallback(
    (active: boolean) => {
      isInputActiveRef.current = active;
      if (active) {
        clear();
      } else {
        void schedule();
      }
    },
    [clear, schedule]
  );

  useEffect(() => {
    void schedule();
    return clear;
  }, [enabled, schedule, clear]);

  return { registerActivity, setInputActive };
};
