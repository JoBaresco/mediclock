// src/constants/images.ts
// Registre central de tous les assets visuels MediClock
// Sprint 3 — intégration complète

// ─── Icônes fonctionnelles ───────────────────────────────────────────────────
export const Images = {
  // Navigation & écrans principaux
  pilule: require('../../assets/images/Pilule.png'),
  calendrier: require('../../assets/images/Calendrier.png'),
  dossierMedical: require('../../assets/images/Dossier_Medical.png'),
  familleCercle: require('../../assets/images/Famille_Cercle.png'),
  cercleII: require('../../assets/images/Cercle_II.png'),

  // Urgence & sécurité
  sos: require('../../assets/images/sos.png'),
  urgence: require('../../assets/images/Urgence.png'),
  securite: require('../../assets/images/Securite.png'),

  // Notifications
  notification: require('../../assets/images/Notification.png'),
  notificationBadge: require('../../assets/images/Notification_Badge.png'),

  // Médical
  checklist: require('../../assets/images/Cheklist.png'),
  analyseSanguine: require('../../assets/images/analyse_sanguine.png'),

  // ─── Logos MediClock ───────────────────────────────────────────────────────
  logoMaster: require('../../assets/images/Logo_Master_MC.png'),
  logoSeul: require('../../assets/images/Master_MediClock_seul_V.1.png'),
  logoCopyright: require('../../assets/images/Master_MediClock_copyright_V.1.png'),
  logoCopyrightSansFond: require('../../assets/images/Master_MediClock_copyright_sans_fond_V.1.png'),
  logoSansFond: require('../../assets/images/Master_MediClock_sans_fond_V.1.png'),
  headerWordmark: require('../../assets/images/mediclock_II.jpeg'),

  // ─── Images narratives / onboarding ───────────────────────────────────────
  pontMediclock: require('../../assets/images/pont_mediclock.png'),
  silhouetteBoutChemin: require('../../assets/images/silhoutte_bout_chemin_II.png'),
} as const;

export type ImageKey = keyof typeof Images;
