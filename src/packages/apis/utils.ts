/* eslint-disable no-console */
import { AxiosError, AxiosRequestHeaders, AxiosResponse } from 'axios';

export const API_URL = 'https://random-data-api.com/api/';

export const enum AuthorizationMode {
    PUBLIC = 0,
    ACCESS_TOKEN = 1,
}

export const ACCESS_TOKEN = 'ACCESS_TOKEN';

export const enum ResponseCode {
    SUCCESS = 201,
    UNAUTHORIZED = 401,
    TOKEN_REMOVED = 403,
    NOT_FOUND = 404,
    INTERVAL_SERVER = 500,
    ERR_BAD_REQUEST = 400,
}

const removeUndefinedField = (params: object) => {
    Object.keys(params).forEach((key) => {
        if (typeof params[key] === 'undefined') {
            delete params[key];
        }
    });
    return params;
};

const convertPayloadToQueryString = (payload: object = {}) => {
    return Object.keys(payload)
        .map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(payload[key]);
        })
        .join('&');
};

const removeField = (params: object, deleteField: string) => {
    Object.keys(params).forEach((key) => {
        if (key === deleteField) {
            delete params[key];
        }
    });
    return params;
};

const errorHandler = async (error: AxiosError) => {
    const statusCode = error?.response?.status;

    if (statusCode === ResponseCode.TOKEN_REMOVED) {
        return Promise.reject({ ...error });
    }

    if (statusCode === 500 || statusCode === 502) {
        console.log('internalServerError');
        return;
    }

    return Promise.reject({ ...error });
};

const successHandler = async (response: AxiosResponse) => {
    if (__DEV__) {
        console.log(`Response API: ${response.config.url}`, response.data);
    }

    return response.data;
};

function logRequest(method, url, params) {
    if (__DEV__) {
        // console?.tron?.log(`${method}: ${url}`, params);
        console.log(`${method}: ${url}`, params);
    }
}

function logResponse(response, data) {
    if (__DEV__) {
        console.log(
            `%cRESPONSE:%c${' ' + response.url + ' '} %c${response.status}`,
            `color: #fff; background: ${'#1C5629'}`,
            `color: #fff; background: ${'transparent'}`,
            `color: #fff; background: ${response.status === 200 ? '#1C5629' : '#AB1010'}`,
            data
        );
    }
}

function dataResponse(content, response) {
    let data;
    try {
        data = content ? JSON.parse(content) : {};
        logResponse(response, data);
    } catch (error) {
        logResponse(response, error);
        throw error;
    }
    return data;
}

function handleErrorRes(data) {
    const message = data?.message || data?.info?.message;
    if (message) {
        return {
            ...data,
            message,
        };
    }

    return data;
}

function* checkResponseCode(response) {
    if (response.ok) {
        return;
    }

    if (response.status === 500 || response.status === 502) {
        console.log('internalServerError');
        return;
    }

    if (response.status === 401) {
        // check if login
        const isLogin = true;
        if (isLogin) {
            // logout
            setTimeout(() => {
                console.log('sessionTerminated');
                // go To Login
            }, 500);
        }

        return;
    }

    const content = yield response.text();
    throw handleErrorRes(dataResponse(content, response));
}

function getFullUrl(url) {
    if (url.includes('https')) {
        return url;
    }
    return `${API_URL}${url}`;
}

function getHeader(
    authorizationMode?: AuthorizationMode,
    customHeaders?: Record<string, unknown>,
    headerType = 'application/json'
) {
    const header = customHeaders || {};
    if (authorizationMode === AuthorizationMode.ACCESS_TOKEN) {
        header['Authorization'] = `Bearer ${ACCESS_TOKEN}`;
    }
    return {
        ...header,
        'Content-Type': headerType,
    } as AxiosRequestHeaders;
}

const ApiUtils = {
    removeUndefinedField,
    convertPayloadToQueryString,
    removeField,
    errorHandler,
    getHeader,
    getFullUrl,
    checkResponseCode,
    dataResponse,
    handleErrorRes,
    successHandler,
    logRequest,
};

export default ApiUtils;
