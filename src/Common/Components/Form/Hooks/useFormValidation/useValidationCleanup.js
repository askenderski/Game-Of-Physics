import {useEffect} from "react";

export default function useValidationCleanup(validationHandlers, {validators}) {
    const {clearCurValidation} = validationHandlers;

    useEffect(() => {
        return () => {
            Object.keys(validators).forEach(fieldName => clearCurValidation(fieldName));
        };
    }, []);
};