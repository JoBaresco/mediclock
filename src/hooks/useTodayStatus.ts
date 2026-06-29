import { useTranslation } from './useTranslation';
import { useTreatmentStore } from '../store/useTreatmentStore';
import { useAppointmentStore } from '../store/useAppointmentStore';
import type { StatusType } from '../components/cards/MCStatusCard';

export const useTodayStatus = () => {
  const { t } = useTranslation();
  const intakes = useTreatmentStore((state) => state.getTodayIntakes());
  const appointments = useAppointmentStore((state) => state.appointments);

  const status: StatusType = intakes.length > 0 ? 'action_pending' : 'all_good';
  const title = intakes.length > 0 ? t('today.status.actionPending') : t('today.status.allGood');
  const subtitle = intakes.length > 0 ? '' : t('today.status.allGoodSub');

  return {
    status,
    title,
    subtitle,
    nextAppointment: appointments[0] ?? null,
  };
};
