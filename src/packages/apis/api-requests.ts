import Axios, { Method } from 'axios';
import { call } from 'redux-saga/effects';

import ApiUtils, { API_URL, AuthorizationMode } from './utils';

const instance = Axios.create({
    baseURL: API_URL,
    timeout: 60000,
});

instance.interceptors.response.use(
    (response) => ApiUtils.successHandler(response),
    (error) => ApiUtils.errorHandler(error)
);

function* processResponse(response) {
    yield call(ApiUtils.checkResponseCode, response);
    const content = yield response.text();
    return ApiUtils.dataResponse(content, response);
}

export async function apiRequestGet<ReqType, ResType>(
    url: string,
    params?: ReqType,
    authorizationMode?: AuthorizationMode,
    customHeaders?: Record<string, unknown>
): Promise<ResType> {
    const headers = ApiUtils.getHeader(authorizationMode, customHeaders);
    return instance.get(url, { params, headers });
}

export async function apiRequestPost<ReqType, ResType>(
    url: string,
    data?: ReqType,
    authorizationMode?: AuthorizationMode,
    customHeaders?: Record<string, unknown>
): Promise<ResType> {
    const headers = ApiUtils.getHeader(authorizationMode, customHeaders);
    return instance.post(url, { ...data }, { headers });
}

export async function apiRequestDelete<ReqType, ResType>(
    url: string,
    data?: ReqType,
    authorizationMode?: AuthorizationMode,
    customHeaders?: Record<string, unknown>
): Promise<ResType> {
    const headers = ApiUtils.getHeader(authorizationMode, customHeaders);
    return instance.delete(url, { data: { ...data }, headers: { ...headers } });
}

export async function apiRequest<ReqType, ResType>(
    method?: Method,
    url?: string,
    data?: ReqType,
    authorizationMode?: AuthorizationMode,
    customHeaders?: Record<string, unknown>
): Promise<ResType> {
    const headers = ApiUtils.getHeader(authorizationMode, customHeaders);
    return instance.request({
        method,
        url,
        headers,
        data,
    });
}

export function getRequest(url, authorizationMode: AuthorizationMode, params = {}) {
    return function* rest() {
        const data: object = { ...ApiUtils.removeUndefinedField(params) };

        const requestConfig = {
            method: 'GET',
            headers: yield ApiUtils.getHeader(authorizationMode),
        };

        const query = ApiUtils.convertPayloadToQueryString(data);
        const fullUrl = query ? `${ApiUtils.getFullUrl(url)}?${query}` : ApiUtils.getFullUrl(url);
        const response = yield call(fetch, fullUrl, requestConfig);

        ApiUtils.logRequest('GET', url, data);
        return yield processResponse(response);
    };
}

export function postRequest(url, authorizationMode: AuthorizationMode, params = {}) {
    return function* rest() {
        const data: object = {
            ...ApiUtils.removeUndefinedField(params),
        };

        const requestConfig = {
            method: 'POST',
            headers: yield ApiUtils.getHeader(authorizationMode),
            body: JSON.stringify(data),
        };
        const response = yield call(fetch, ApiUtils.getFullUrl(url), requestConfig);

        ApiUtils.logRequest('POST', url, data);
        return yield processResponse(response);
    };
}

export function deleteRequest(url, authorizationMode: AuthorizationMode, params = {}) {
    return function* rest() {
        const data: object = {
            ...ApiUtils.removeUndefinedField(params),
        };

        const requestConfig = {
            method: 'DELETE',
            headers: yield ApiUtils.getHeader(authorizationMode),
        };
        const response = yield call(fetch, ApiUtils.getFullUrl(url), requestConfig);

        ApiUtils.logRequest('DELETE', url, data);
        return yield processResponse(response);
    };
}

export function putRequest(url, authorizationMode: AuthorizationMode, params = {}) {
    return function* rest() {
        const data: object = {
            ...ApiUtils.removeUndefinedField(params),
        };

        const requestConfig = {
            method: 'PUT',
            headers: yield ApiUtils.getHeader(authorizationMode),
            body: JSON.stringify(data),
        };
        const response = yield call(fetch, ApiUtils.getFullUrl(url), requestConfig);

        ApiUtils.logRequest('PUT', url, data);
        return yield processResponse(response);
    };
}

export function postFormData(url, authorizationMode: AuthorizationMode, params) {
    return function* rest() {
        const data = { ...params };
        const requestConfig = {
            method: 'POST',
            headers: yield ApiUtils.getHeader(authorizationMode, null, 'multipart/form-data'),
            body: data,
        };
        const response = yield call(fetch, ApiUtils.getFullUrl(url), requestConfig);

        ApiUtils.logRequest('POST_FORM', url, requestConfig);
        return yield processResponse(response);
    };
}
