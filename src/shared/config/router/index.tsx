


import userStore, { Role } from '@entities/user';
import EnvPage from '@pages/EnvPage/ui/EnvPage';
import EnvsPage from '@pages/EnvsPage/ui/EnvsPage';
import LoginPage from '@pages/LoginPage/ui/LoginPage';
import NotFoundPage from '@pages/NotFoundPage';
import ProfilePage from '@pages/ProfilePage/ui/ProfilePage';
import RegisterPage from '@pages/RegisterPage/ui/RegisterPage';
import { useMemo } from 'react';
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

type TAppRoutePages = RouteProps & {
  roles: Role[]
}

export const AppRoutePages: TAppRoutePages[] = [
  {
    path: AppRoutes.MAIN,
    element: <Navigate to={AppRoutes.ENVS} replace={true} />,
    roles: [Role.guest, Role.user],
  },
  {
    path: AppRoutes.ENVS,
    element: <EnvsPage />,
    roles: [Role.guest, Role.user],
  },
  {
    path: AppRoutes.ENV,
    element: <EnvPage />,
    roles: [Role.guest, Role.user],
  },
  {
    path: AppRoutes.LOGIN,
    element: <LoginPage />,
    roles: [Role.guest],
  },
  {
    path: AppRoutes.REGISTER,
    element: <RegisterPage />,
    roles: [Role.guest],
  },
  {
    path: AppRoutes.PROFILE,
    element: <ProfilePage />,
    roles: [Role.user],
  },
  {
    path: AppRoutes.NOT_FOUND,
    element: <NotFoundPage />,
    roles: [],
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

export const useAccessPages = (pages: TAppRoutePages[]) => {
  const userRole = userStore.user?.role ?? Role.guest;

  return useMemo(() => pages.map((page) => {
    if (page.path === AppRoutes.NOT_FOUND) {
      return page;
    }
    
    if (page.roles.includes(userRole)) {
      return page;
    }
  }).filter(Boolean),
  [userRole, pages]
  );
};