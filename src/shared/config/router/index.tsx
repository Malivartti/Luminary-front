


import EnvPage from '@pages/EnvPage/EnvPage';
import EnvsPage from '@pages/EnvsPage/EnvsPage';
import NotFoundPage from '@pages/NotFoundPage';
import { Navigate, RouteProps } from 'react-router-dom';

export enum AppRoutes {
  MAIN = '/',
  ENVS = '/envs',
  ENV = '/envs/:id',
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
  notFound: {
    mask: AppRoutes.NOT_FOUND,
    create: () => AppRoutes.NOT_FOUND,
  },
};
