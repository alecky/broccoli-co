import React, { act } from 'react';
import { renderHook, screen, fireEvent } from '@testing-library/react';
import useInviteForm from '.';

describe('useInviteForm', () => {
    it('should return empty values on initialise', () => {
        const { result } = renderHook(useInviteForm);
        expect(result.current).toEqual({
            name: '',
            onSetName: expect.any(Function),
            onValidateName: expect.any(Function),
            nameErrorMessage: undefined,
            email: '',
            onSetEmail: expect.any(Function),
            onValidateEmail: expect.any(Function),
            emailErrorMessage: undefined,
            confirmEmail: '',
            onSetConfirmEmail: expect.any(Function),
            onValidateConfirmEmail: expect.any(Function),
            confirmEmailErrorMessage: undefined,
            onSubmit: expect.any(Function),
            submitError: undefined,
            isSubmitting: false,
            isDone: false,
        });
    });

    describe('name field', () => {
        it('should set the name field onSetName', () => {
            const { result } = renderHook(useInviteForm);
            act(() => result.current.onSetName('my name'));
            expect(result.current.name).toBe('my name');
        });
        it('should validate when onValidateName', () => {
            const { result } = renderHook(useInviteForm);
            act(() => result.current.onValidateName());
            expect(result.current.nameErrorMessage).toBe('Your full name should be at least 3 charachters long.');
        });
        it('should error validates on less that 3 characters', () => {
            const { result } = renderHook(useInviteForm);
            act(() => {
                result.current.onSetName('12');
                result.current.onValidateName();
            });
            expect(result.current.nameErrorMessage).toBe('Your full name should be at least 3 charachters long.');
        });
        it('should not error if more than 3 characters', () => {
            const { result } = renderHook(useInviteForm);
            act(() => {
                result.current.onSetName('12345');
                result.current.onValidateName();
            });
            expect(result.current.nameErrorMessage).toBe(undefined);
        });
        it('it should continue to validate name once onValidateName is called', () => {
            const { result } = renderHook(useInviteForm);
            act(() => result.current.onValidateName());
            expect(result.current.nameErrorMessage).toBe('Your full name should be at least 3 charachters long.');
            expect(result.current.name).toBe('');
            act(() => {
                result.current.onSetName('new name');
            });
            expect(result.current.nameErrorMessage).toBe(undefined);
            expect(result.current.name).toBe('new name');
        });
    });

    describe('email field', () => {
        it('should set the name field onSetEmail', () => {
            const { result } = renderHook(useInviteForm);
            act(() => result.current.onSetEmail('test@email.com'));
            expect(result.current.email).toBe('test@email.com');
        });
        it('should validate when onValidateEmail', () => {
            const { result } = renderHook(useInviteForm);
            act(() => result.current.onValidateEmail());
            expect(result.current.emailErrorMessage).toBe('Please enter a valid email adddress');
        });
        it('should error if the email address is not valid', () => {
            const { result } = renderHook(useInviteForm);
            act(() => {
                result.current.onSetEmail('invalidEmail');
                result.current.onValidateEmail();
            });
            expect(result.current.emailErrorMessage).toBe('Please enter a valid email adddress');
        });
        const emailMessage = 'Please enter a valid email adddress';
        it.each([
            ['email', false],
            ['email@email', false],
            ['@email.com', false],
            ['a@b.c', true],
            ['something@email.com', true],
            ['aa@@bb.com', false],
            ['aa @bb.com', false],
            // can add more tests here
        ])('should %s be invalid: %s', (email, expected) => {
            const { result } = renderHook(useInviteForm);
            act(() => {
                result.current.onSetEmail(email);
                result.current.onValidateEmail();
            });
            expect(result.current.emailErrorMessage !== emailMessage).toBe(expected);
        });

        it('should continue to validate email address onece first validation', () => {
            const { result } = renderHook(useInviteForm);
            act(() => result.current.onValidateEmail());
            expect(result.current.emailErrorMessage).toBe(emailMessage);
            expect(result.current.email).toBe('');
            act(() => {
                result.current.onSetEmail('test@email.com');
            });
            expect(result.current.emailErrorMessage).toBe(undefined);
            expect(result.current.email).toBe('test@email.com');
        });
    });
    describe('confirmEmail', () => {
        it('should set the confirm field confirmEmail', () => {
            const { result } = renderHook(useInviteForm);
            act(() => result.current.onSetConfirmEmail('email@test.com'));
            expect(result.current.confirmEmail).toBe('email@test.com');
        });
        it('should validate onValidateConfirmEmail', () => {
            const { result } = renderHook(useInviteForm);
            act(() => {
                result.current.onSetEmail('test@email.com');
                result.current.onValidateConfirmEmail();
            });
            expect(result.current.confirmEmailErrorMessage).toBe('Your email and confirm email address dont mach');
        });
        it('should error if the email addresses dont match', () => {
            const { result } = renderHook(useInviteForm);
            act(() => {
                result.current.onSetEmail('email@test.com');
                result.current.onSetConfirmEmail('test@email.com')
                result.current.onValidateConfirmEmail();
            });
            expect(result.current.confirmEmailErrorMessage).toBe('Your email and confirm email address dont mach');
        });
        it('should be ok if email and confirm email match', () => {
            const { result } = renderHook(useInviteForm);
            act(() => {
                result.current.onSetEmail('test@email.com');
                result.current.onSetConfirmEmail('test@email.com')
                result.current.onValidateConfirmEmail();
            });
            expect(result.current.confirmEmailErrorMessage).toBe(undefined);
        });
        it('should continue to validate once first validation', () => {
            const { result } = renderHook(useInviteForm);
            act(() => {
                result.current.onSetEmail('email@test.com');
                result.current.onSetConfirmEmail('test@email.com')
                result.current.onValidateConfirmEmail();
            });
            expect(result.current.confirmEmailErrorMessage).toBe('Your email and confirm email address dont mach');
            act(() => result.current.onSetConfirmEmail('email@test.com'));
            expect(result.current.confirmEmailErrorMessage).toBe(undefined);
        });
    });

    describe('submit', () => {
        const fetchMock = jest.fn();
        beforeEach(() => {
            fetchMock.mockClear();
            global.fetch = fetchMock as jest.Mock;
        });
        it('should not submit if any field is empty', () => {
            const { result } = renderHook(useInviteForm);
            act(() => result.current.onSubmit());
            expect(result.current.submitError).toBe('Please ensure all fields are completed before you submit');
            act(() => {
                result.current.onSetName('my name');
                result.current.onSubmit();
            });
            console.log('name error message', result.current.nameErrorMessage);
            console.log('email error message', result.current.emailErrorMessage);
            console.log('confirm email error message', result.current.confirmEmailErrorMessage);
            expect(result.current.submitError).toBe('Please ensure all fields are completed before you submit');
            act(() => {
                result.current.onSetEmail('a@b.c');
                result.current.onSubmit();
            });
            console.log('name error message', result.current.nameErrorMessage);
            console.log('email error message', result.current.emailErrorMessage);
            console.log('confirm email error message', result.current.confirmEmailErrorMessage);
            expect(result.current.submitError).toBe('Please ensure all fields are completed before you submit');
            act(() => {
                result.current.onSetConfirmEmail('a@b.c');
                result.current.onSubmit();
            });
            console.log('name error message', result.current.nameErrorMessage);
            console.log('email error message', result.current.emailErrorMessage);
            console.log('confirm email error message', result.current.confirmEmailErrorMessage);
            expect(result.current.submitError).toBe(undefined);
            console.log('email error message', result.current.emailErrorMessage);
        });
        it('should error if any of the fields are in an error state', () => {

        });
        it('should set isSubmitting to true when onSubmit called', () => {

        });
    });
});
