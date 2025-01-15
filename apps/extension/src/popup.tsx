import React from 'react';
import ReactDOM from 'react-dom/client';

const Popup = () => {
  return (
    <div className="p-4">
      <h1>Bookoo</h1>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
); 