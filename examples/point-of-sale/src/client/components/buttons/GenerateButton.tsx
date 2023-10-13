import React, { FC, useEffect, useRef } from 'react';
import { usePayment } from '../../hooks/usePayment';
import css from './GenerateButton.module.css';

export const GenerateButton: FC = () => {
  const { amount, generate } = usePayment();
  const generateButtonRef = useRef<HTMLButtonElement | null>(null);

  // Function to trigger button click based on URL parameter
  const autoClickGenerateButton = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const ammountValue = urlParams.get("ammountValue");

    if (ammountValue && generateButtonRef.current) {
      generateButtonRef.current.click();
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
      ref={generateButtonRef}
      className={css.root}
      type="button"
      onClick={handleClick}
      id="generateNow"
      disabled={false}
    >
      Get the QR Code
    </button>
  );
};
