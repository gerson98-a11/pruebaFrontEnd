// En tu archivo App.jsx o donde tengas definido tu componente principal
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FullWidthLayout from './components/FullWidthLayout.jsx';
import HomeTask from './Pages/homeTask.jsx';
import Profile from './Pages/Profile.jsx'; // Asegúrate de que el nombre del archivo sea en PascalCase

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<FullWidthLayout />}>
          <Route path="/" element={<HomeTask />} />
          <Route path="/task" element={<HomeTask />} />
          <Route path="/profile" element={<Profile/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
