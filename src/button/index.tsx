import React, { PropsWithChildren } from 'react';
import './button.css';

interface Props {
    size: 'large' | 'medium';
    onClick: () => void;
    isDisabled?: boolean,
}

const Button = ({ children, size, onClick, isDisabled }: PropsWithChildren<Props>) => {
    return <button onClick={onClick} className={"button " + size} disabled={isDisabled}>{ children }</button>;
}

export default Button;