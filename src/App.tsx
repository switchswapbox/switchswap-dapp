// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import RtlLayout from './components/RtlLayout';
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/LoadingScreen';
import ThemePrimaryColor from './components/ThemePrimaryColor';
import NotistackProvider from './components/NotistackProvider';
import { Provider } from 'react-redux';
import store from './redux/store';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeConfig>
      <ThemePrimaryColor>
        <RtlLayout>
          <NotistackProvider>
            <Provider store={store}>
              <GlobalStyles />
              <ProgressBarStyle />
              <ScrollToTop />
              <Router />
            </Provider>
          </NotistackProvider>
        </RtlLayout>
      </ThemePrimaryColor>
    </ThemeConfig>
  );
}
