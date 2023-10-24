// @ts-nocheck
export const VALID_EMAIL = /^[_A-Za-z0-9]+([.][_A-Za-z0-9]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;
export const NO_WHITE_SPACE = /^\S*$/;
export const VALID_PASSWORD = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,72}$/;
export const ATLEAST_1_SPECIAL_CHARACTER = /^(?=.*[@#$%^&+=!_.]).*$/;
export const ATLEAST_1_UPPERCASE_LETTER = /(?=.*?[A-Z])/;
export const CONTAINS_LETTER = /^(?=.*[a-zA-Z]).*$/;
export const CONTAINS_DIGIT = /^(?=.*[0-9]).*$/;
