import { useMemo } from 'react';
import { useTranslation } from './useTranslation';
import { useTreatmentStore } from '../store/useTreatmentStore';
import { useAppointmentStore } from '../store/useAppointmentStore';
import type { StatusType } from '../components/cards/MCStatusCard';

export const useTodayStatus = () => {
  const { t } = useTranslation();
  const intakes = useTreatmentStore((state) => state.intakes);
  const treatments = useTreatmentStore((state) => state.treatments);
  const appointments = useAppointmentStore((state) => state.appointments);
  const activeTreatments = useMemo(
    () => treatments.filter((item) => item.status === 'active'),
    [treatments]
  );
  const todayIntakes = useMemo(() => {
    const today = new Date().toDateString();

    return intakes.filter((intake) => new Date(intake.scheduledTime).toDateString() === today);
  }, [intakes]);

  const status: StatusType = activeTreatments.length === 0 ? 'no_treatments' : todayIntakes.length === 0 ? 'action_pending' : 'all_good';
  const title =
    status === 'no_treatments'
      ? t('today.status.noTreatments')
      : status === 'action_pending'
      ? t('today.status.actionPending')
      : t('today.status.allGood');
  const subtitle = status === 'all_good' ? t('today.status.allGoodSub') : '';

  return {
    status,
    title,
    subtitle,
    nextAppointment: appointments.find((item) => !item.isCompleted) ?? null,
  };
};
