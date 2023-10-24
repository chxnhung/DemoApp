import { Platform } from 'react-native';

const majorVersionIOS = parseInt(String(Platform.Version), 10);
const isAutoFillSupported = Platform.OS === 'ios' && majorVersionIOS >= 12;
const codeToArray = (code?: string): string[] => code?.split('') ?? [];
const initValue = (arr) => {
    const result = arr.reduce((obj, num) => {
        obj['code' + num] = '';
        return obj;
    }, {});
    return result;
};
const fieldName = (idx: number) => {
    return 'code' + idx.toString();
};
const REGEX_NUMBER_ONLY = new RegExp('^[0-9]+$');
const isNum = (str) => {
    return REGEX_NUMBER_ONLY.test(str) || str.length === 0;
};
const combineCode = (values) => {
    let code = '';
    const codeValue = Object.values(values);
    codeValue.map((value) => {
        if (value !== '') {
            code = code + value.toString();
        }
    });
    return code;
};

export { codeToArray, isAutoFillSupported, initValue, fieldName, isNum, combineCode };
