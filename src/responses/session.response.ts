export interface LoginActivityResponse {
  sessions: LoginActivityResponseSession[];
  suspicious_logins: LoginActivityResponseSuspiciousLogin[];
  status: string;
}

export interface LoginActivityResponseSuspiciousLogin {
  id: string;
  location: string;
  latitude: number;
  longitude: number;
  device: string;
  timestamp: number;
  user_agent: string;
  ip_address: string;
}

export interface LoginActivityResponseSession extends LoginActivityResponseSuspiciousLogin {
  login_timestamp: number;
  is_current: boolean;
  login_id: string;
  device_id: string;
  device_id_uuid: string;
  family_device_id: string;
}
