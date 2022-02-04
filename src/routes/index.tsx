import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// components
import LoadingScreen from '../components/LoadingScreen';
// ----------------------------------------------------------------------

const Loadable = (Component: any) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

const LoadWithoutSpinner = (Component: any) => (props: any) => {
  return (
    <Suspense fallback={<span />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/home" replace /> },
        { path: 'home', element: <Homepage /> },
        { path: 'create-collection', element: <CreateCollection /> },
        {
          path: 'gallery',
          children: [
            { element: <Navigate to="/gallery/universe/1" replace /> },
            { path: 'universe/:pageUrl', element: <Universe /> }
          ]
        },
        { path: 'nft-minting', element: <NftMinting /> },
        { path: 'nft-manager/:pageUrl', element: <NftManager /> },
        {
          path: 'fun-box',
          children: [
            { path: '/fun-box', element: <FunBox /> },
            { path: '/fun-box/cru-faucet', element: <CruFaucet /> },
            { path: '/fun-box/matic-faucet', element: <MaticFaucet /> }
          ]
        },
        {
          path: 'learn-more',
          element: <LearnMore />
        },
        { path: 'assets/:network/:contract/:tokenId', element: <AssetViewer /> }
      ]
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: 'terms-of-service', element: <TermsOfService /> },
        { path: 'disclaimer', element: <Disclaimer /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS

// Dashboard
const Universe = Loadable(lazy(() => import('../pages/Universe')));
const NftMinting = Loadable(lazy(() => import('../pages/NftMinting')));
const NftManager = Loadable(lazy(() => import('../pages/NftManager')));
const FunBox = Loadable(lazy(() => import('../pages/FunBox')));
const CruFaucet = Loadable(lazy(() => import('../pages/CruFaucet')));
const MaticFaucet = Loadable(lazy(() => import('../pages/MaticFaucet')));
const LearnMore = Loadable(lazy(() => import('../pages/LearnMore')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
const TermsOfService = Loadable(lazy(() => import('../pages/TermsOfService')));
const Disclaimer = Loadable(lazy(() => import('../pages/Disclaimer')));
const AssetViewer = Loadable(lazy(() => import('../pages/AssetViewer')));
const Homepage = LoadWithoutSpinner(lazy(() => import('../pages/Homepage')));
const CreateCollection = LoadWithoutSpinner(lazy(() => import('../pages/CreateCollection')));
// const Universe = lazy(() => import('../pages/Universe'));
// const NftMinting = lazy(() => import('../pages/NftMinting'));
// const NftManager = lazy(() => import('../pages/NftManager'));
// const FunBox = lazy(() => import('../pages/FunBox'));
// const CruFaucet = lazy(() => import('../pages/CruFaucet'));
// const MaticFaucet = lazy(() => import('../pages/MaticFaucet'));
// const LearnMore = lazy(() => import('../pages/LearnMore'));
// const NotFound = lazy(() => import('../pages/Page404'));
// const TermsOfService = lazy(() => import('../pages/TermsOfService'));
// const Disclaimer = lazy(() => import('../pages/Disclaimer'));
// const AssetViewer = lazy(() => import('../pages/AssetViewer'));
// const Homepage from '../pages/Homepage';
