export interface HealthAndLeaveBalanceType {
  leave_balance?: LeaveBalanceType[];
  health_balance?: HealthBalanceType;
}

export interface HealthBalanceType {
  id?: number;
  user_id?: number;
  year?: string;
  health_balance?: string;
  total_balance?: string;
  balance_update?: Date;
  status?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface LeaveBalanceType {
  id?: number;
  user_id?: number;
  year?: string;
  leave_balance?: number;
  expired_balance?: number;
  total_balance?: number;
  status?: number;
  created_at?: Date;
  updated_at?: Date;
}
