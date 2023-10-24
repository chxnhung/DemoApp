import React from 'react';

import { BaseToast } from './BaseToast';
import { BaseToastProps } from '../types';

export function SuccessToast(props: BaseToastProps) {
    return <BaseToast style={{ borderLeftColor: '#69C779' }} {...props} />;
}
