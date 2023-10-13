import BigNumber from 'bignumber.js';
import React, { FC, useMemo, useEffect } from 'react';
import { useConfig } from '../../hooks/useConfig';
import { NON_BREAKING_SPACE } from '../../utils/constants';

export interface AmountProps {
    amount: BigNumber | undefined;
    showZero?: boolean;
}

export const Amount: FC<AmountProps> = ({ amount, showZero }) => {
    const { minDecimals } = useConfig();

    const value = useMemo(() => {
        if (!amount) return NON_BREAKING_SPACE;
        if (amount.isGreaterThan(0)) {
            const decimals = amount.decimalPlaces() ?? 0;
            return amount.toFormat(decimals < minDecimals ? minDecimals : decimals);
        } else {
            return showZero ? '0' : NON_BREAKING_SPACE;
        }
    }, [amount, minDecimals, showZero]);

    // Function to extract ammountValue from URL
    const extractAmmountValueFromURL = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const ammountValue = urlParams.get("ammountValue");

        if (ammountValue) {
            // Update the value with the value from the URL
            const ammountValueElement = document.getElementById("ammountValue");
            if (ammountValueElement) {
                ammountValueElement.textContent = ammountValue;
            }
        }
    };

    useEffect(() => {
        extractAmmountValueFromURL();
    }, []);

    return <span id="ammountValue">{value}</span>;
};
