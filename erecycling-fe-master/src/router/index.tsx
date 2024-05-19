/* eslint-disable react-refresh/only-export-components */
import AuthLayout from "@/_auth/auth-layout";
import DashboardLayout from "@/_dashboard/dashboard-layout";
import FreeLayout from "@/_maintainance/free-layout";
import Guard from "@/components/guard";
import FullScreenLoader from "@/components/shared/fullscreen-loader";
import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";

const Loadable = (Component: React.ComponentType<unknown>) => (props: JSX.IntrinsicAttributes) =>
  (
    <Suspense fallback={<FullScreenLoader />}>
      <Component {...props} />
    </Suspense>
  );

const LoginPage = Loadable(lazy(() => import("@/_auth/pages/login")));
const RegisterPage = Loadable(lazy(() => import("@/_auth/pages/register")));
const Forbidden = Loadable(lazy(() => import("@/_auth/pages/403")));
const NotFound = Loadable(lazy(() => import("@/_maintainance/pages/404")));
const UserManagement = Loadable(lazy(() => import("@/_dashboard/pages/user/user")));
const ProductManagement = Loadable(lazy(() => import("@/_dashboard/pages/product/product")));
const CreateUpdateUser = Loadable(lazy(() => import("@/_dashboard/pages/user/create-update-user")));
const Home = Loadable(lazy(() => import("@/_dashboard/pages/home")));
const ServiceUnavailable = Loadable(lazy(() => import("@/_maintainance/pages/500")));
const CreateProductPage = Loadable(lazy(() => import("@/_dashboard/pages/product/create")));
const InquiryManagement = Loadable(lazy(() => import("@/_dashboard/pages/inquiry/inquiry")));
const CreateUpdateInquiry = Loadable(lazy(() => import("@/_dashboard/pages/inquiry/create-update")));

const authRoutes: RouteObject = {
  element: <AuthLayout />,
  children: [
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
    {
      path: "unauthorized",
      element: <Forbidden />,
    },
  ],
};

const userDashboardRoute: RouteObject = {
  element: <DashboardLayout />,
  children: [
    {
      path: "",
      element: <Guard canAccess={["customer".toUpperCase()]} />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/inquiry",
          element: <InquiryManagement />,
        },
        {
          path: "/inquiry/new",
          element: <CreateUpdateInquiry />,
        },

        {
          path: "/inquiry/edit",
          element: <CreateUpdateInquiry />,
        },
      ],
    },
  ],
};

const adminDashboardRoute: RouteObject = {
  element: <DashboardLayout />,
  children: [
    {
      path: "",
      element: <Guard canAccess={["STAFF", "ADMIN"]} />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
  ],
};

const maintainanceRoute: RouteObject = {
  element: <FreeLayout />,
  children: [
    {
      path: "/service-unavailable",
      element: <ServiceUnavailable />,
    },
  ],
};

const notFound: RouteObject = {
  path: "*",
  element: <NotFound />,
};

const routes: RouteObject[] = [authRoutes, userDashboardRoute, maintainanceRoute, adminDashboardRoute, notFound];

export default routes;
