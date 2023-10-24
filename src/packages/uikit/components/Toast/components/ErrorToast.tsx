import React from 'react';

import { BaseToast } from './BaseToast';
import { BaseToastProps } from '../types';

export function ErrorToast(props: BaseToastProps) {
    return <BaseToast style={{ borderLeftColor: '#FE6301' }} {...props} />;
}
