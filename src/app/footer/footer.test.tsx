import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '.';

describe('Footer', () => {
    it('Should contain the footer text', () => {
        render(<Footer />);
        const title = screen.getByRole('contentinfo');
        expect(title).toHaveTextContent('This is the footerI cant read it in the image so this is a placeholder');
    });
});
