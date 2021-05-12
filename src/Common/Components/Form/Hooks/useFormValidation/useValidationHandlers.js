import sleep from "../../../../Utilities/sleep";
import Promise from "../../../../DataTypes/Promise";
import {useRef} from "react";

function getValidatorHandlers(validationPromises, {time, validate}) {
    function validateFieldWithoutDelay(fieldName) {
        validate([fieldName]);
    }

    function validateFieldWithDelay(fieldName) {
        const newValidationPromise = sleep(time)
            .then(() => {
                validateFieldWithoutDelay(fieldName);
            });

        clearCurValidation(fieldName);
        validationPromises.current = {...validationPromises.current, [fieldName]: newValidationPromise};
    }

    function clearCurValidation(fieldName) {
        //If there was no validator for the field, there may be no promise for it here
        if (fieldName in validationPromises.current) {
            validationPromises.current[fieldName].cancel();
        }
    }

    function resetCurValidation(fieldName) {
        clearCurValidation(fieldName);

        validationPromises.current = {...validationPromises.current, [fieldName]: Promise.resolve()};
    }

    return {
        clearCurValidation,
        resetCurValidation,
        validateFieldWithoutDelay,
        validateFieldWithDelay
    };
}

export function useValidationHandlers({validators, time, validate}) {
    const validationPromises = useRef(Object.keys(validators).reduce((acc, el) =>
        ({...acc, [el]: Promise.resolve()}), {}));

    return getValidatorHandlers(validationPromises, {time, validate});
}