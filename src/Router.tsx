import { Route, Routes } from 'react-router-dom';

import Main from '@pages/Main';

export default function Router() {
  return (
    <Routes>
      <Route element={<Main />} path="/" />
    </Routes>
  );
}
