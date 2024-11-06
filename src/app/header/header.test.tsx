import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '.';

describe('Header', () => {
    it('Should contain the heading', () => {
        render(<Header />);
        const title = screen.getByRole('heading');
        expect(title).toHaveTextContent('Broccoli & Co.');
    });
});