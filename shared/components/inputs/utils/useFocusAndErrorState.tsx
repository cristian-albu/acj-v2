import { useState } from "react";
import {
    TErrorState,
    TFocusedState,
    TInputEvents,
    TInputEvent,
    TErrorEventHandlers,
    TInputFocusAndErrorStateReturn,
} from "../types";

/**
 *
 * @param focusCallback An optional focus callback that will be called onFocus
 * @param blurCallback An optional blur callback that will be called onBlur
 * @returns {TInputFocusAndErrorStateReturn}
 */
const useInputFocusAndErrorState = (
    focusCallback?: TInputEvent,
    blurCallback?: TInputEvent
): TInputFocusAndErrorStateReturn => {
    const [errorState, setShowErr] = useState<TErrorState>({
        shouldShowErr: false,
        shouldHighlightErr: false,
    });

    const [focusedState, setFocusedState] = useState<TFocusedState>({
        focusedOnce: false,
        isFocused: false,
    });

    /**
     * Event handlers for an input component
     */
    const eventHandlers: TInputEvents = {
        onFocus: (event) => {
            if (focusedState.focusedOnce) {
                setShowErr({ shouldShowErr: true, shouldHighlightErr: true });
                setFocusedState({ ...focusedState, isFocused: true });
            } else {
                setFocusedState({ focusedOnce: true, isFocused: true });
            }

            focusCallback && focusCallback(event);
        },
        onBlur: (event) => {
            if (focusedState.focusedOnce) {
                setShowErr({ shouldShowErr: false, shouldHighlightErr: true });
                setFocusedState({ focusedOnce: true, isFocused: false });
            }
            blurCallback && blurCallback(event);
        },
    };

    /**
     * Mouse event handlers for the InputError component
     */
    const inputErrorEventsHandlers: TErrorEventHandlers = {
        onMouseEnter: () => {
            setShowErr({ ...errorState, shouldShowErr: true });
        },
        onMouseLeave: () => {
            if (!focusedState.isFocused) {
                setShowErr({ ...errorState, shouldShowErr: false });
            }
        },
    };
    return { errorState, setShowErr, focusedState, setFocusedState, eventHandlers, inputErrorEventsHandlers };
};

export default useInputFocusAndErrorState;
