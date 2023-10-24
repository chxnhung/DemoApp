import * as yup from 'yup';

import { NO_WHITE_SPACE, VALID_EMAIL, VALID_PASSWORD } from 'utils/validate';

const loginSchema = yup.object({
    email: yup
        .string()
        .required('This Field is required.')
        .email('Email is invalid.')
        .matches(VALID_EMAIL, 'Email is invalid.'),
    password: yup.string().required('This Field is required.'),
});

export default loginSchema;
