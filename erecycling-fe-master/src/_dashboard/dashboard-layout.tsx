import { Navigate, Outlet } from "react-router-dom";
import Navbar from "@/components/shared/navbar";
import Sidebar from "@/components/shared/sidebar";
import { useGetAuth } from "@/lib/react-query/query";
import FullScreenLoader from "@/components/shared/fullscreen-loader";
import { AppError } from "@/types/utils";
import { toast } from "react-toastify";

const DashboardLayout = () => {
  const { isLoading, error } = useGetAuth();
  if (isLoading) {
    return <FullScreenLoader />;
  }
  if (error) {
    if (error instanceof AppError) {
      console.log("loi roi", error);
      toast.error(error.message);
      return <Navigate to={"/login"} replace />;
      
    }
    else return <Navigate to={"/service-unavailable"} replace />;
  }

  return (
    <div className="flex h-[100vh] overflow-hidden">
      <div className="overflow-hidden hover:overflow-y-auto h-[100vh] w-[280px] border-r border-slate-200 border-dashed relative">
        <Sidebar />
      </div>
      <div className="flex-1 relative pt-[64px] overflow-y-auto">
        <Navbar />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
