import { User } from "./user";

export interface ClaimType {
  id?: number;
  user_id?: number;
  date?: string;
  type?: string;
  category?: string;
  amount?: number;
  description?: string | null;
  is_approve_supervisor?: number;
  approve_supervisor_by?: number | null;
  approve_supervisor_at?: string | null;
  is_approve_personalia?: number;
  approve_personalia_by?: number | null;
  approve_personalia_at?: string | null;
  is_approve_fa?: number;
  approve_fa_by?: number | null;
  approve_fa_at?: string | null;
  created_at?: string;
  updated_at?: string;
  user?: User | null;
  attachments?: AttachmentType | null;
}

export interface AttachmentType {
  id?: number;
  claim_id?: number;
  attachment?: string;
  created_at?: string;
  updated_at?: string;
}
