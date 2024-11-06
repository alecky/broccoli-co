import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '.';

describe('Home', () => {
    it('should contain heading', () => {
        render(<Home openInviteForm={jest.fn()} />);
        const heading = screen.getByRole('heading');
        expect(heading).toHaveTextContent('A better way to enjoy every day.');
    });
    it('should contain the correct paragraph', () => {
        render(<Home openInviteForm={jest.fn()} />);
        const paragraph = screen.getByText('Would you like to know more about what is happening?');
        expect(paragraph).toBeInTheDocument();
    });
    it('should contain a button and call the callback on click', () => {
        const mockCallback = jest.fn();
        render(<Home openInviteForm={mockCallback} />);
        const button = screen.getByRole('button', {name: 'Request an invitation'});
        fireEvent.click(button);
        expect(mockCallback).toHaveBeenCalled();
    });
});