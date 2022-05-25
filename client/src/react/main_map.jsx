import React from 'react';
import ReactDOM from 'react-dom/client';

import 'mapbox-gl/dist/mapbox-gl.css';

import mapboxgl from 'mapbox-gl';

import { useRef, useEffect, useState } from 'react';

import { TextField } from '@mui/material';
import { styled } from '@mui/system';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { brandingDarkTheme } from './theme';

mapboxgl.accessToken = 'pk.eyJ1Ijoib3RtYW5lY2hlcnJhZGkiLCJhIjoiY2t0ZWpuam02MHp0eDJxcndjZHFuemM5byJ9.Ksc2Dfz-ElqZTrOteg4uwA';

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on('click', (ev) => {
      console.log(ev);
    });
  });

  return (
    <div className='h-full flex'>
      <div ref={mapContainer} className='w-1/2 h-full' />

      <div className='w-1/2 h-full'>
        <TextField id='outlined-basic' label='Outlined' variant='outlined' />
      </div>
    </div>
  );
}

const DrawerHeader = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

// eslint-disable-next-line react/prop-types
export function BrandingProvider({ children }) {
  return (
    <ThemeProvider theme={brandingDarkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export function GCPDashboard() {
  const [isDrawerOpen, setDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    setDrawerOpen((v) => !v);
  };

  return (
    <>
      <BrandingProvider>
        <Box sx={{ display: 'flex' }}>
          <AppHeader toggleDrawer={toggleDrawer} />

          <BrowserRouter basename='/dash'>
            <AppDrawer isDrawerOpen={isDrawerOpen} />

            <Box
              component='main'
              style={{
                flexGrow: 1,
                padding: 23,
                width: isDrawerOpen ? 'calc(100% - 269px)' : 'calc(100% - 61px + 1px)',
                maxWidth: isDrawerOpen ? 'calc(100% - 269px)' : 'calc(100% - 61px + 1px)',
              }}>
              <DrawerHeader />
              <div className='h-full flex'>
                <div ref={mapContainer} className='w-1/2 h-full' />

                <div className='w-1/2 h-full'>
                  <TextField id='outlined-basic' label='Outlined' variant='outlined' />
                </div>
              </div>
            </Box>
          </BrowserRouter>
        </Box>
      </BrandingProvider>
    </>
  );
}

export default App;

ReactDOM.createRoot(document.getElementById('reactRoot')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
