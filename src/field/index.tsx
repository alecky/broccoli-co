import React from 'react';
import './field.css';

interface Props {
    id: string;
    label: string;
    value?: string;
    onChange: (value: string) => void;
    isErrored?: boolean;
    errorMessage?: string;
    onBlur?: () => void;
}

const Field = ({ id, label, value, onChange, isErrored, errorMessage, onBlur}: Props) => {
    const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.value);
    }
    return <div className={`field-wrapper ${isErrored && 'field-error'}`}>
        <label className="field-label" htmlFor={id}>{label}</label>
        <input className="field-input" type="text" name={id} id={id} value={value} onChange={onHandleChange} onBlur={onBlur} />
        {errorMessage && <span className="field-error-message">{errorMessage}</span>}
    </div>;
}

export default Field;
