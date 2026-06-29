export type CircleMemberRole =
  | 'trusted_person'
  | 'family'
  | 'caregiver'
  | 'doctor'
  | 'nurse'
  | 'pharmacist'
  | 'other';

export type InviteMethod = 'phone' | 'email' | 'contacts' | 'qr_code' | 'secure_link';
export type CircleMemberStatus = 'pending' | 'active' | 'paused' | 'revoked';

export interface CirclePermissions {
  viewIntakes: boolean;
  receiveAlerts: boolean;
  viewAppointments: boolean;
  viewDocuments: boolean;
  confirmActions: boolean;
  sendQuickMessages: boolean;
  viewGeneralStatus: boolean;
  modifyTreatments: boolean;
}

export interface CircleMember {
  id: string;
  name: string;
  role: CircleMemberRole;
  phone?: string;
  email?: string;
  avatarUri?: string;
  status: CircleMemberStatus;
  permissions: CirclePermissions;
  joinedAt?: string;
  lastActivityAt?: string;
}

export type QuickMessage =
  | 'all_good'
  | 'took_treatment'
  | 'went_for_walk'
  | 'arrived_consultation'
  | 'back_home'
  | 'going_to_rest'
  | 'need_help'
  | 'at_hospital'
  | 'safely_home';
