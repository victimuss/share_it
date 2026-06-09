export type AuthStackParamList = {
  Login: { email: string } | undefined;
  Register: undefined;
  Legal: { type: 'privacy' | 'terms' };
};

