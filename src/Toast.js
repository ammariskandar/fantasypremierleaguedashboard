import React, { useState, useEffect } from 'react';
import './Toast.css'; // Create this CSS file for styling

const Toast = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('toastDismissed');
    if (dismissed) {
      setVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    sessionStorage.setItem('toastDismissed', 'true');
  };

  if (!visible) return null;

  return (
    <div className="toast">
      <p>
        <i>If you haven't joined the mini-league, please do so by completing this form: <a href="https://forms.gle/oxR5ABL4DuqNYLTYA" target="_blank" rel="noopener noreferrer">https://forms.gle/oxR5ABL4DuqNYLTYA</a></i>
      </p>
      <button onClick={handleDismiss} className="toast-dismiss">×</button>
    </div>
  );
};

export default Toast;
