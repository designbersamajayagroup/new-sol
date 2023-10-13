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

  useEffect(() => {
    autoClickGenerateButton();
  }, []);

  // Function to handle the button click
  const handleClick = () => {
    generate();
  };

  return (
    <button
      className={css.root}
      type="button"
      onClick={handleClick}
      id="generateNow"
      disabled={!amount || amount.isLessThanOrEqualTo(0)}
    >
      Get the QR Code
    </button>
  );
};