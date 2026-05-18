export type AuthRole = 'user' | 'admin';

export type AuthContext = {
  subjectId: string;
  role: AuthRole;
  sessionId: string;
};
