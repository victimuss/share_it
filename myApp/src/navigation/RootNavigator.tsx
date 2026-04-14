import { useAuth } from "../context/AuthContext";
import { AppNavigator } from "./appNavigator";
import { AuthNavigator } from "./AuthNavigator";
export const RootNavigator = () => {
  const { user } = useAuth();
  return user ? <AppNavigator /> : <AuthNavigator />;
};
