import React, { FC, useEffect } from 'react';
import { usePayment } from '../../hooks/usePayment';
import css from './GenerateButton.module.css';

export const GenerateButton: FC = () => {
  const { amount, generate } = usePayment();

  // Function to trigger button click based on URL parameter
  const autoClickGenerateButton = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const ammountValue = urlParams.get("ammountValue");

    if (ammountValue) {
      const generateButton = document.getElementById("generateNow");
      if (generateButton) {
        generateButton.click();
      }
    }
  };

  // Use useEffect to call the function when the component mounts
  useEffect(() => {
    autoClickGenerateButton();
  }, []);

  return (
    <button className={css.root} type="button" onClick={generate} id="generateNow" disabled={!amount || amount.isLessThanOrEqualTo(0.0000001)}>
      Get the QR Code
    </button>
  );
};
