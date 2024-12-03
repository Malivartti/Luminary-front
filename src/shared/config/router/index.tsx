


import EnvPage from '@pages/EnvPage/ui/EnvPage';
import EnvsPage from '@pages/EnvsPage/ui/EnvsPage';
import LoginPage from '@pages/LoginPage/ui/LoginPage';
import NotFoundPage from '@pages/NotFoundPage';
import ProfilePage from '@pages/ProfilePage/ui/ProfilePage';
import RegisterPage from '@pages/RegisterPage/ui/RegisterPage';
import { Navigate, RouteProps } from 'react-router-dom';

export enum AppRoutes {
  MAIN = '/',
  ENVS = '/envs',
  ENV = '/envs/:id',
  LOGIN = '/login',
  REGISTER = '/register',
  PROFILE = '/profile',
  NOT_FOUND = '*'
}

export const AppRoutePages: RouteProps[] = [
  {
    path: AppRoutes.MAIN,
    element: <Navigate to={AppRoutes.ENVS} replace={true} />,
  },
  {
    path: AppRoutes.ENVS,
    element: <EnvsPage />,
  },
  {
    path: AppRoutes.ENV,
    element: <EnvPage />,
  },
  {
    path: AppRoutes.LOGIN,
    element: <LoginPage />,
  },
  {
    path: AppRoutes.REGISTER,
    element: <RegisterPage />,
  },
  {
    path: AppRoutes.PROFILE,
    element: <ProfilePage />,
  },
  {
    path: AppRoutes.NOT_FOUND,
    element: <NotFoundPage />,
  }
];

export const AppRouteUrls = {
  root: AppRoutes.MAIN,
  envs: {
    mask: AppRoutes.ENVS,
    create: () => AppRoutes.ENVS,
  },
  env: {
    mask: AppRoutes.ENV,
    create: (id: string | number) => `${AppRoutes.ENVS}/${id}`,
  },
  login: {
    mask: AppRoutes.LOGIN,
    create: () => AppRoutes.LOGIN,
  },
  register: {
    mask: AppRoutes.REGISTER,
    create: () => AppRoutes.REGISTER,
  },
  profile: {
    mask: AppRoutes.PROFILE,
    create: () => AppRoutes.PROFILE,
  },
  notFound: {
    mask: AppRoutes.NOT_FOUND,
    create: () => AppRoutes.NOT_FOUND,
  },
};
