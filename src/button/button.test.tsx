import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '.';

describe('Button', () => {
    it('should render a button with the text passed', () => {
        const onClickMock = jest.fn();
        const text = 'The button text';
        render(<Button size="large" onClick={onClickMock}>{text}</Button>);
        const button = screen.getByRole('button');
        expect(button).toHaveTextContent(text);
    });
    it('should call the callback onClick when the button is clicked', () => {
        const onClickMock = jest.fn();
        render(<Button size="large" onClick={onClickMock}>Button</Button>);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(onClickMock).toHaveBeenCalled();
    });
    it('should not call the callback if isDisabled is true', () => {
        const onClickMock = jest.fn();
        render(<Button size="large" onClick={onClickMock} isDisabled>Button</Button>);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(onClickMock).not.toHaveBeenCalled();
    });
});