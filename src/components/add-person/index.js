import PropTypes from 'prop-types';
import React from 'react';
import { Formik } from 'formik';
import { useUnmount } from 'react-use';
import validate from 'validate.js';
import axios from 'axios';
import API from '~api';
import {
    Modal,
    ModalHead,
    ModalContent,
    ModalActions,
} from '~components/modal';
import Input from '~components/input';
import Button from '~components/button';
import { validationRules as rules } from '~utils/validator';
import './style.scss';

function AddPerson({ isOpen, onClose, onAddPerson }) {
    const [error, setError] = React.useState('');
    const sourceRef = React.useRef(axios.CancelToken.source());

    const onFormSubmit = React.useCallback(
        async (values, actions) => {
            const {
                name,
                phone,
                email,
                organization,
                assistant,
                groups,
                location,
            } = values;
            try {
                const response = await API.post(
                    '/persons',
                    {
                        name,
                        phone,
                        email,
                        '8d540ebcd6918bb2fe7ac118a4df4a4d61099afe':
                            organization,
                        '1dfa3285cdfbcb8dd0b3204d57eb687397542073': assistant,
                        '32dedc4f136ef1c0c8d5c437bbf43a2ef331a525': groups,
                        e5f3a4742d5b18f7c86c7009f16956a387cd3f8c: location,
                    },
                    {
                        cancelToken: sourceRef.current.token,
                    }
                );

                const { data } = response;
                onAddPerson(data.data);
                onClose();
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error(`AddPersons error: ${error.message}`);
                    setError(error.message);
                }
            }
            actions.setSubmitting(false);
        },
        [onAddPerson, onClose]
    );

    const onValidate = React.useCallback(
        ({ name, phone, email, organization, assistant, groups }) => {
            let errors = {};
            const validatorAnswer = validate(
                { name, phone, email, organization, assistant, groups },
                {
                    name: rules.name,
                    phone: rules.phone,
                    email: rules.email,
                    organization: rules.organization,
                    assistant: rules.assistant,
                    groups: rules.groups,
                }
            );
            const isValid = typeof validatorAnswer === 'undefined';
            if (!isValid) {
                const { name, phone, email, organization, assistant, groups } =
                    validatorAnswer;
                errors = {
                    name: name ? validatorAnswer.name[0] : '',
                    phone: phone ? validatorAnswer.phone[0] : '',
                    email: email ? validatorAnswer.email[0] : '',
                    organization: organization
                        ? validatorAnswer.organization[0]
                        : '',
                    assistant: assistant ? validatorAnswer.assistant[0] : '',
                    groups: groups ? validatorAnswer.groups[0] : '',
                };
            }
            return errors;
        },
        []
    );

    useUnmount(() => {
        if (sourceRef.current) {
            sourceRef.current.cancel(
                `Previous POST /persons request has been cancelled`
            );
        }
    });

    return (
        <Modal isOpen={isOpen} onDismiss={onClose} onClose={onClose}>
            <ModalHead onClose={onClose}>Person Information</ModalHead>
            <Formik
                initialValues={{
                    name: '',
                    phone: '',
                    email: '',
                    organization: '',
                    assistant: '',
                    groups: '',
                    location: '',
                }}
                onSubmit={onFormSubmit}
                validate={onValidate}
            >
                {({
                    values,
                    errors,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit} className="add-person">
                        <ModalContent>
                            {error && (
                                <div className="add-peron__error">{error}</div>
                            )}
                            <div className="person__main-data">
                                <Input
                                    value={values.name}
                                    message={errors.name}
                                    onChange={handleChange}
                                    name="name"
                                    label="Name"
                                    disabled={isSubmitting}
                                />
                                <Input
                                    value={values.phone}
                                    message={errors.phone}
                                    onChange={handleChange}
                                    name="phone"
                                    label="Phone"
                                    mask="(999) 999-9999"
                                    disabled={isSubmitting}
                                />
                                <Input
                                    value={values.email}
                                    message={errors.email}
                                    onChange={handleChange}
                                    name="email"
                                    label="Email"
                                    disabled={isSubmitting}
                                />
                                <Input
                                    value={values.organization}
                                    message={errors.organization}
                                    onChange={handleChange}
                                    name="organization"
                                    label="Organization"
                                    disabled={isSubmitting}
                                />
                                <Input
                                    value={values.assistant}
                                    message={errors.assistant}
                                    onChange={handleChange}
                                    name="assistant"
                                    label="Assistant"
                                    disabled={isSubmitting}
                                />
                                <Input
                                    value={values.groups}
                                    message={errors.groups}
                                    onChange={handleChange}
                                    name="groups"
                                    label="Groups"
                                    disabled={isSubmitting}
                                />
                                <Input
                                    value={values.location}
                                    message={errors.location}
                                    onChange={handleChange}
                                    name="location"
                                    label="Location"
                                    disabled={isSubmitting}
                                />
                            </div>
                        </ModalContent>
                        <ModalActions>
                            <Button type="submit">Add</Button>
                        </ModalActions>
                    </form>
                )}
            </Formik>
        </Modal>
    );
}

AddPerson.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onAddPerson: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AddPerson;
