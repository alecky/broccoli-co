import {useState, useEffect} from 'react';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const url = 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth';

const useInviteForm = () => {
    const [name, setName] = useState('');
    const [nameErrorMessage, setNameErrorMessage] = useState<string | undefined>();
    const [nameFistValidated, setNameFirstValidated] = useState<boolean>(false);
    const [email, setEmail] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState<string | undefined>();
    const [emailFirstValidated, setEmailFirstValidated] = useState<boolean>(false);
    const [confirmEmail, setConfirmEmail] = useState('');
    const [confirmEmailErrorMessage, setConfirmEmailErrorMessage] = useState<string | undefined>();
    const [confirmEmailFirstValidated, setConfirmEmailFirstValidated] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string | undefined>();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isDone, setIsDone] = useState<boolean>(false);

    const onValidateName = () => {
        if (!nameFistValidated) {
            setNameFirstValidated(true);
        }
    }

    useEffect(() => {
        if (nameFistValidated) {
            if (name.length < 3) {
                setNameErrorMessage('Your full name should be at least 3 charachters long.');
            } else {
                setNameErrorMessage(undefined);
            }
        }
    },
    [nameFistValidated, name]);

    const onSetName = (name: string) => {
        setName(name);
        setSubmitError(undefined);
    }

    const onValidateEmail = () => {
        if (!emailFirstValidated) {
            setEmailFirstValidated(true);
        }
    }

    useEffect(() => {
        if (emailFirstValidated) {
            if (!emailRegex.test(email)) {
                setEmailErrorMessage('Please enter a valid email adddress');
            } else {
                setEmailErrorMessage(undefined);
            }
        }
    }, [emailFirstValidated, email]);

    const onSetEmail = (email: string) => {
        setEmail(email);
        setSubmitError(undefined);
    }

    const onValidateConfirmEmail = () => {
        if (!confirmEmailFirstValidated) {
            setConfirmEmailFirstValidated(true);
        }
    }

    useEffect(() => {
        if (confirmEmailFirstValidated) {
            if (confirmEmail !== email) {
                setConfirmEmailErrorMessage('Your email and confirm email address dont mach')
            } else {
                setConfirmEmailErrorMessage(undefined);
            }
        }
    }, [confirmEmailFirstValidated, email, confirmEmail]);

    const onSetConfirmEmail = (confirmEmail: string) => {
        setConfirmEmail(confirmEmail);
        setSubmitError(undefined);
    }

    const onSubmit = () => {
        if (
            nameFistValidated && 
            !nameErrorMessage &&
            emailFirstValidated &&
            !emailErrorMessage &&
            confirmEmailFirstValidated &&
            !confirmEmailErrorMessage
        ) {
            setIsSubmitting(true);
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({name: name, email: email}),
            }).then((response) => {
                if (response.status === 200) {
                    setIsDone(true);
                } else if (response.status === 400) {
                    setIsSubmitting(false);
                    response.text().then((resp) => {setSubmitError(JSON.parse(resp).errorMessage)});
                } else {
                    setIsSubmitting(false);
                    setSubmitError('There was a problem communicating with the server please try again later');
                }
            }).catch(() => {
                setIsSubmitting(false);
                setSubmitError('There was a problem please try again later');
            });
        } else if (!nameErrorMessage && !emailErrorMessage && !confirmEmailErrorMessage) {
            setSubmitError('Please ensure all fields are completed before you submit');
        } else {
            setSubmitError('You have some errors you need to correct before you can submit');
        }
    }

    return {
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
    };
}

export default useInviteForm;