import { useAuth } from "../context/AuthContext";
import { AppNavigator } from "./appNavigator";
import { AuthNavigator } from "./AuthNavigator";
export const RootNavigator = () => {
  const { user } = useAuth();
  const { isLoading } = useAuth();

  if (isLoading) {
    return null;
  }
  return user ? <AppNavigator /> : <AuthNavigator />;
};
