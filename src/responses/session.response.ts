export interface LoginActivityResponse {
  sessions: LoginActivitySession[];
  suspicious_logins: LoginActivitySuspiciousSession[];
  status: string;
}

export interface LoginActivitySuspiciousSession {
  id: string;
  location: string;
  latitude: number;
  longitude: number;
  device: string;
  timestamp: number;
  user_agent: string;
  ip_address: string;
}

export interface LoginActivitySession extends LoginActivitySuspiciousSession {
  login_timestamp: number;
  is_current: boolean;
  login_id: string;
  device_id: string;
  device_id_uuid: string;
  family_device_id: string;
}
