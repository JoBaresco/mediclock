export type DocumentCategory =
  | 'prescription'
  | 'analysis'
  | 'report_cardiology'
  | 'report_neurology'
  | 'report_traumatology'
  | 'report_ophthalmology'
  | 'report_radiology'
  | 'hospitalization'
  | 'surgery'
  | 'vaccine'
  | 'admin_vitale'
  | 'admin_insurance'
  | 'admin_ald'
  | 'admin_certificate'
  | 'other';

export type DocumentSource = 'camera' | 'gallery' | 'pdf' | 'share';

export interface MedicalDocument {
  id: string;
  title: string;
  category: DocumentCategory;
  source: DocumentSource;
  fileUri: string;
  thumbnailUri?: string;
  date: string;
  doctorName?: string;
  specialty?: string;
  notes?: string;
  tags: string[];
  isSharedWithCircle: boolean;
  sharedWithMemberIds: string[];
  isEncrypted: boolean;
  createdAt: string;
  updatedAt: string;
}
