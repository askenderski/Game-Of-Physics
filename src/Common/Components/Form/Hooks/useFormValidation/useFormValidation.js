import useValidationCleanup from "./useValidationCleanup";
import {useValidationHandlers} from "./useValidationHandlers";

function extractValidationHandlersToExpose(validationHandlers) {
    const {
        resetCurValidation,
        validateFieldWithoutDelay,
        validateFieldWithDelay
    } = validationHandlers;

    return {
        resetCurValidation,
        validateFieldWithoutDelay,
        validateFieldWithDelay
    };
}

export default function useFormValidation(props) {
    const validationHandlers = useValidationHandlers(props);
    useValidationCleanup(validationHandlers, {validators: props.validators});

    return extractValidationHandlersToExpose(validationHandlers);
}