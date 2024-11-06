import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '.';
import Header from './header';
import Footer from './footer';
import Home from './home';
import InviteForm from './invite-form';

jest.mock('./header', () => jest.fn());
jest.mock('./footer', () => jest.fn());
jest.mock('./home', () => jest.fn());
jest.mock('./invite-form', () => jest.fn());

const mockedHeader = Header as jest.Mock;
const mockedFooter = Footer as jest.Mock;
const mockedHome = Home as jest.Mock;
const mockedInviteForm = InviteForm as jest.Mock;

describe('App', () => {
    it('should render a header, footer and home but NOT inviteForm', () => {
        mockedHeader.mockImplementation(() => <div data-testid="header"/>);
        mockedFooter.mockImplementation(() => <div data-testid="footer"/>);
        mockedHome.mockImplementation(() => <div data-testid="home"/>);
        mockedInviteForm.mockImplementation(() => <div data-testid="invite-form"/>);
        render(<App />);
        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();
        expect(screen.getByTestId('home')).toBeInTheDocument();
        expect(screen.queryByTestId('invite-form')).not.toBeInTheDocument();
    });

    it('should render the inviteForm when openInviteForm', () => {
        mockedHome.mockImplementation(({openInviteForm}) => <button onClick={openInviteForm}>click</button>);
        mockedInviteForm.mockImplementation(() => <div data-testid="invite-form"/>);
        render(<App />);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(screen.getByTestId('invite-form')).toBeInTheDocument();
    });

    it('should close the inviteForm when onClose', () => {
      mockedHome.mockImplementation(({openInviteForm}) => <button onClick={openInviteForm}>open</button>);
      mockedInviteForm.mockImplementation(({onClose}) => <button onClick={onClose}>close</button>);
      render(<App />);
      const openButton = screen.getByRole('button', {name: 'open'});
      fireEvent.click(openButton);
      const closeButton = screen.getByRole('button', {name: 'close'});
      fireEvent.click(closeButton);
      expect(screen.queryByRole('button', {name: 'close'})).not.toBeInTheDocument();
    });
});
