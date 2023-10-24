const loginFieldName = {
    email: 'email',
    password: 'password',
};

const loginDataForm = [
    {
        name: loginFieldName.email,
        type: 'input-text',
        placeholder: 'Email',
        label: 'Email',
        icon: 'Email',
    },
    {
        name: loginFieldName.password,
        type: 'input-text',
        placeholder: 'Password',
        label: 'Password',
        icon: 'Lock',
    },
];

const FORM_ERROR = [
    {
        field: 'email',
        message: 'Email or password is incorrect',
    },
    {
        field: 'password',
        message: 'Email or password is incorrect',
    },
];

export { loginFieldName, loginDataForm, FORM_ERROR };
