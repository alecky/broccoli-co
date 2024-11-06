import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../../modal';
import useInviteForm from '../use-invite-form';
import InviteForm from '.';

jest.mock('../../modal', () => jest.fn());
jest.mock('../use-invite-form', () => jest.fn());

const mockedModal = Modal as jest.Mock;
const mockedUseInviteForm = useInviteForm as jest.Mock;

const mockInviteData = {
    name: '',
    onSetName: jest.fn(),
    onValidateName: jest.fn(),
    nameErrorMessage: undefined,
    email: '',
    onSetEmail: jest.fn(),
    onValidateEmail: jest.fn(),
    emailErrorMessage: undefined,
    confirmEmail: '',
    onSetConfirmEmail: jest.fn(),
    onValidateConfirmEmail: jest.fn(),
    confirmEmailErrorMessage: undefined,
    onSubmit: jest.fn(),
    submitError: undefined,
    isSubmitting: false,
    isDone: false,
};

const screenSuccessText = 'We have successfuly sent your information for an invitation. You should hear from us shortly.';

describe('InviteForm', () => {
    describe('Render Modal Title', () => {
        it('should render title when rendering form', () => {
            mockedModal.mockImplementation(({title}) => <div>{title}</div>);
            mockedUseInviteForm.mockImplementation(() => mockInviteData);
            render(<InviteForm onClose={() => {}}/>);
            expect(screen.getByText('Request an invite')).toBeInTheDocument()
        });
        it('should render different title when done registering', () => {
            mockedModal.mockImplementation(({title}) => <div>{title}</div>);
            mockedUseInviteForm.mockImplementation(() => ({...mockInviteData, isDone: true}));
            render(<InviteForm onClose={() => {}}/>);
            expect(screen.getByText('All done!')).toBeInTheDocument()
        });
        it('should call close on modal close', () => {
            const mockOnClose = jest.fn();
            mockedModal.mockImplementation(({onClose}) => <button onClick={onClose}>button</button>);
            mockedUseInviteForm.mockImplementation(() => mockInviteData);
            render(<InviteForm onClose={mockOnClose}/>);
            const closeButton = screen.getByRole('button');
            fireEvent.click(closeButton);
            expect(mockOnClose).toHaveBeenCalled();
        });
    });
    describe('form', () => {
        it('should render all form fields', () => {
            mockedUseInviteForm.mockImplementation(() => mockInviteData);
            mockedModal.mockImplementation(({children}) => <>{children}</>);
            render(<InviteForm onClose={() => {}}/>);
            expect(screen.getByLabelText('Full name')).toBeInTheDocument();
            expect(screen.getByLabelText('Email')).toBeInTheDocument();
            expect(screen.getByLabelText('Confirm email')).toBeInTheDocument();
        });
        it('should render field errors when errors', () => {
            mockedUseInviteForm.mockImplementation(() => ({
                ...mockInviteData,
                nameErrorMessage: 'Name error message',
                emailErrorMessage: 'Email error message',
                confirmEmailErrorMessage: 'Confirm error message',
            }));
            mockedModal.mockImplementation(({children}) => <>{children}</>);
            render(<InviteForm onClose={() => {}}/>);
            expect(screen.getByText('Name error message')).toBeInTheDocument();
            expect(screen.getByText('Email error message')).toBeInTheDocument();
            expect(screen.getByText('Confirm error message')).toBeInTheDocument();
        });
         it('should render submit error', () => {
            mockedUseInviteForm.mockImplementation(() => ({
                ...mockInviteData,
                submitError: 'Error when submitting',
            }));
            mockedModal.mockImplementation(({children}) => <>{children}</>);
            render(<InviteForm onClose={() => {}}/>);
            expect(screen.getByText('Error when submitting')).toBeInTheDocument();
         });
         it('should call validate on field blur', () => {
            mockedUseInviteForm.mockImplementation(() => mockInviteData);
            mockedModal.mockImplementation(({children}) => <>{children}</>);
            render(<InviteForm onClose={() => {}}/>);
            screen.getByLabelText('Full name').focus();
            screen.getByLabelText('Email').focus();
            screen.getByLabelText('Confirm email').focus();
            screen.getByRole('button').focus();
            expect(mockInviteData.onValidateName).toHaveBeenCalled();
            expect(mockInviteData.onValidateEmail).toHaveBeenCalled();
            expect(mockInviteData.onValidateConfirmEmail).toHaveBeenCalled();
         });
         it('should call change on field change', () => {
            mockedUseInviteForm.mockImplementation(() => mockInviteData);
            mockedModal.mockImplementation(({children}) => <>{children}</>);
            render(<InviteForm onClose={() => {}}/>);
            const nameField = screen.getByLabelText('Full name');
            const emailField = screen.getByLabelText('Email');
            const confirmField = screen.getByLabelText('Confirm email');
            fireEvent.change(nameField, {target: {value: 'my name'}});
            fireEvent.change(emailField, {target: {value: 'my@email.com'}});
            fireEvent.change(confirmField, {target: {value: 'confirm email'}});
            expect(mockInviteData.onSetName).toHaveBeenCalledWith('my name');
            expect(mockInviteData.onSetEmail).toHaveBeenCalledWith('my@email.com');
            expect(mockInviteData.onSetConfirmEmail).toHaveBeenCalledWith('confirm email');
         });
         it('should call onsubmit on submit button click', () => {
            mockedUseInviteForm.mockImplementation(() => mockInviteData);
            mockedModal.mockImplementation(({children}) => <>{children}</>);
            render(<InviteForm onClose={() => {}}/>);
            const submitButton = screen.getByRole('button');
            fireEvent.click(submitButton);
            expect(mockInviteData.onSubmit).toHaveBeenCalled();
         });
         it('should render different text during submitting', () => {
            mockedUseInviteForm.mockImplementation(() => ({...mockInviteData, isSubmitting: true}));
            mockedModal.mockImplementation(({children}) => <>{children}</>);
            render(<InviteForm onClose={() => {}}/>);
            const button = screen.getByRole('button', {name: 'Submitting, Please wait...'});
            expect(button).toBeInTheDocument();
         });
    });
    describe('done', () => {
        it('should render different screen on done', () => {
            mockedUseInviteForm.mockImplementation(() => ({...mockInviteData, isDone: true}));
            mockedModal.mockImplementation(({children}) => <>{children}</>);
            render(<InviteForm onClose={() => {}}/>);
            expect(screen.getByText(screenSuccessText)).toBeInTheDocument();
        });
        it('should call onclose on button click', () => {
            const onCloseMock = jest.fn();
            mockedUseInviteForm.mockImplementation(() => ({...mockInviteData, isDone: true}));
            mockedModal.mockImplementation(({children}) => <>{children}</>);
            render(<InviteForm onClose={onCloseMock}/>);
            const button = screen.getByRole('button');
            fireEvent.click(button);
            expect(onCloseMock).toHaveBeenCalled();
        });
    });
});
