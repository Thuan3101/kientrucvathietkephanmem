import { useGetAuth } from "@/lib/react-query/query";
import FullScreenLoader from "./shared/fullscreen-loader";
import { Navigate, Outlet } from "react-router-dom";

type Props = {
  canAccess: string[];
};

const isAllowed = (userRoles: string[], allowedRoles: string[]) => {
  console.log(userRoles, allowedRoles)
  return userRoles.some((role) => allowedRoles.includes(role));
};

function Guard({ canAccess }: Props) {
  const { data: user, isLoading, isFetching } = useGetAuth();
  if (isLoading || isFetching) {
    return <FullScreenLoader />;
  }

  return !user ? (
    <Navigate to="/login" replace />
  ) : isAllowed(
      [user.role.toUpperCase()],
      canAccess
    ) ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" replace />
  );
}

export default Guard;
