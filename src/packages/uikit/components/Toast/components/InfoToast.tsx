import React from 'react';

import { BaseToast } from './BaseToast';
import { BaseToastProps } from '../types';

export function InfoToast(props: BaseToastProps) {
    return <BaseToast style={{ borderLeftColor: '#87CEFA' }} {...props} />;
}
