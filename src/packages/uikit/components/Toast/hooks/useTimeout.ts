import React from 'react';
function useTimeout(cb, delayMs = 0) {
    const ref = React.useRef(setTimeout(() => {}, 1));
    const clearTimer = React.useCallback(() => {
        if (ref.current) {
            clearTimeout(ref.current);
            ref.current = undefined;
        }
    }, []);
    const startTimer = React.useCallback(() => {
        clearTimer();
        ref.current = setTimeout(() => {
            cb();
            ref.current = undefined;
        }, delayMs);
    }, [clearTimer, delayMs, cb]);
    React.useEffect(() => () => clearTimer(), [clearTimer]);
    return {
        startTimer,
        clearTimer,
        isActive: ref.current !== undefined,
    };
}
export { useTimeout };
