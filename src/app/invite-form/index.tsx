import React from 'react';
import Field from '../../field';
import Button from '../../button';
import Modal from '../../modal';
import './invite-form.css';
import useInviteForm from '../use-invite-form';

interface Props {
    onClose: () => void;
}

const InviteForm = ({ onClose }: Props) => {
    const {
        name,
        onSetName,
        onValidateName,
        nameErrorMessage,
        email,
        onSetEmail,
        onValidateEmail,
        emailErrorMessage,
        confirmEmail,
        onSetConfirmEmail,
        onValidateConfirmEmail,
        confirmEmailErrorMessage,
        onSubmit,
        submitError,
        isSubmitting,
        isDone,
    } = useInviteForm();

    if (isDone) {
        return <Modal title="All done!" onClose={onClose}>
            <div className="invite-form-wrapper">
                <p>We have successfuly sent your information for an invitation. You should hear from us shortly.</p>
                <Button onClick={onClose} size="medium">Close</Button>
            </div>
        </Modal>
    }

    return <Modal title="Request an invite" onClose={onClose}>
        <div className="invite-form-wrapper">
            <Field id="name" label="Full name" onChange={onSetName} onBlur={onValidateName} value={name} isErrored={!!nameErrorMessage} errorMessage={nameErrorMessage} />
            <Field id="email" label="Email" onChange={onSetEmail} onBlur={onValidateEmail} value={email} isErrored={!!emailErrorMessage} errorMessage={emailErrorMessage} />
            <Field id="confirm" label="Confirm email" onChange={onSetConfirmEmail} onBlur={onValidateConfirmEmail} value={confirmEmail} isErrored={!!confirmEmailErrorMessage} errorMessage={confirmEmailErrorMessage} />
            <Button onClick={onSubmit} size="medium" isDisabled={isSubmitting}>{isSubmitting ? 'Submitting, Please wait...' : 'Submit'}</Button>
            {submitError && <span className="submit-error-message">{submitError}</span>}
        </div>
    </Modal>;
}

export default InviteForm;