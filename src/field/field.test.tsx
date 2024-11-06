import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Field from '.';

describe('Field', () => {
    it('should render the label provided', () => {
        const text = 'Label text';
        render(<Field id="id" label={text} onChange={() => {}} />);
        const label = screen.getByLabelText(text);
        expect(label).toBeInTheDocument();
    });
    it('should call onChange when text is entered', () => {
        const onChangeMock = jest.fn();
        const value = 'hello';
        render(<Field id="id" label="label" onChange={onChangeMock} />);
        const input = screen.getByLabelText('label');
        fireEvent.change(input, {target: {value: value}});
        expect(input).toHaveValue(value);
    });
    it('Should render an error message when provided', async () => {
        const ErrorMessage = 'This is an error message';
        render(<Field id="id" label="label" onChange={() => {}} errorMessage={ErrorMessage} />);

        expect(await screen.findByText(ErrorMessage)).toBeVisible()
    });
});