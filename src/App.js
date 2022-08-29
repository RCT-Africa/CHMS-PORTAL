import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Router from './routes';
import ThemeProvider from './theme';
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import { getToken } from './service/shared/LocalStorage';

export default function App() {

  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
    </ThemeProvider>
  );
}
