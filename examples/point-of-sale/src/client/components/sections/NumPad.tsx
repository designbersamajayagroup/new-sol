import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useConfig } from '../../hooks/useConfig';
import { usePayment } from '../../hooks/usePayment';
import { Digits } from '../../types';
import { BackspaceIcon } from '../images/BackspaceIcon';
import css from './NumPad.module.css';

interface NumPadInputButton {
    input: Digits | '.';
    onInput(key: Digits | '.'): void;
}

const NumPadButton: FC<NumPadInputButton> = ({ input, onInput }) => {
    const onClick = useCallback(() => onInput(input), [onInput, input]);
    return (
        <button className={css.button} type="button" onClick={onClick}>
            {input}
        </button>
    );
};

export const NumPad: FC = () => {
    const { symbol, decimals } = useConfig();
    const regExp = useMemo(() => new RegExp('^\\d*([.,]\\d{0,' + decimals + '})?$'), [decimals]);

    const [value, setValue] = useState<string>('0');
    const onInput = useCallback(
        (key: Digits | '.') => {
            setValue((currentValue) => {
                const newValue = (currentValue + key).trim().replace(/^0{2,}/, '0');
                if (newValue) {
                    if (/^[.,]/.test(newValue)) {
                        return `0${newValue}`;
                    }
                    return newValue.replace(/^0+(\d)/, '$1');
                }
                return currentValue;
            });
        },
        []
    );

    const onBackspace = useCallback(() => {
        setValue((currentValue) => (currentValue.length ? currentValue.slice(0, -1) || '0' : '0'));
    }, []);

    const { setAmount } = usePayment();

    // Mengambil nilai "ammountValue" dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const amountValue = urlParams.get('ammountValue') || '0';

    useEffect(() => {
        // Mengatur nilai "value" ke "amountValue" dari URL
        setValue(amountValue);
        setAmount(amountValue ? parseFloat(amountValue) : undefined);
    }, [setAmount, amountValue]);

    return (
        <div className={css.root}>
            <div className={css.text}>Enter amount in {symbol}</div>
            <div className={css.value} id="valueFromURL">
                {value}
            </div>
            <div className={css.buttons}>
                <div className={css.row}>
                    <NumPadButton input={1} onInput={onInput} />
                    <NumPadButton input={2} onInput={onInput} />
                    <NumPadButton input={3} onInput={onInput} />
                </div>
                <div className={css.row}>
                    <NumPadButton input={4} onInput={onInput} />
                    <NumPadButton input={5} onInput={onInput} />
                    <NumPadButton input={6} onInput={onInput} />
                </div>
                <div className={css.row}>
                    <NumPadButton input={7} onInput={onInput} />
                    <NumPadButton input={8} onInput={onInput} />
                    <NumPadButton input={9} onInput={onInput} />
                </div>
                <div className={css.row}>
                    <NumPadButton input="." onInput={onInput} />
                    <NumPadButton input={0} onInput={onInput} />
                    <button className={css.button} type="button" onClick={onBackspace}>
                        <BackspaceIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};
