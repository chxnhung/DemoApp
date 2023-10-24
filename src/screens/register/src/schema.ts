import * as yup from 'yup';

import {
    ATLEAST_1_SPECIAL_CHARACTER,
    ATLEAST_1_UPPERCASE_LETTER,
    CONTAINS_DIGIT,
    NO_WHITE_SPACE,
    VALID_EMAIL,
} from 'utils/validate';

const registerSchema = yup.object({
    email: yup
        .string()
        .required('This Field is required.')
        .email('Email is invalid.')
        .matches(VALID_EMAIL, 'Email is invalid.'),
    password: yup
        .string()
        .required('This Field is required.')
        .min(8, 'Password length should be at least 8 characters')
        .matches(ATLEAST_1_UPPERCASE_LETTER, 'Passwords must contain at least 1 capital letters')
        .matches(ATLEAST_1_SPECIAL_CHARACTER, 'Passwords must contain at least 1 special letters')
        .matches(CONTAINS_DIGIT, 'Passwords must contain at least 1 number')
        .matches(NO_WHITE_SPACE, 'Passwords not allow to contain white space'),
    confirmPassword: yup
        .string()
        .required('This Field is required.')
        .min(8, 'Password length should be at least 8 characters')
        .matches(ATLEAST_1_UPPERCASE_LETTER, 'Passwords must contain at least 1 capital letters')
        .matches(ATLEAST_1_SPECIAL_CHARACTER, 'Passwords must contain at least 1 special letters')
        .matches(CONTAINS_DIGIT, 'Passwords must contain at least 1 number')
        .matches(NO_WHITE_SPACE, 'Passwords not allow to contain white space')
        .oneOf([yup.ref('password')], 'Passwords do not match'),
});

export default registerSchema;
