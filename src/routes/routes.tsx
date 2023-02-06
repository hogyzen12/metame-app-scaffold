import { lazy } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { AppLayout } from 'common/layout';
import { ROUTES } from 'types/enum';

export const MainPage = lazy(
  () => import('pages/Main' /* webpackChunkName: "MainPage" */),
);

export const NotFoundPage = lazy(
  () => import('pages/NotFound' /* webpackChunkName: "NotFoundPage" */),
);

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={ROUTES.MAIN} element={<AppLayout />}>
        <Route index element={<MainPage />} />
      </Route>
      <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />,
    </>,
  ),
);
