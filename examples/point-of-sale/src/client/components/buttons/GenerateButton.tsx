import React, { FC, useEffect, useState } from 'react';
import { usePayment } from '../../hooks/usePayment';
import css from './GenerateButton.module.css';

export const GenerateButton: FC = () => {
  const { amount, generate } = usePayment();
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(true);

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

  // Check if the button should be enabled
  useEffect(() => {
    if (amount && amount.isGreaterThan(0.000000001)) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [amount]);

  return (
    <button
      className={css.root}
      type="button"
      onClick={generate}
      id="generateNow"
      disabled={!isButtonEnabled}
    >
      Get the QR Code
    </button>
  );
};