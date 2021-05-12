import useFormValidation from "./useFormValidation/useFormValidation";

export default function useFormHandlers({data, controllers}, formModelData) {
    const {validateFieldWithDelay, validateFieldWithoutDelay, resetCurValidation} =
        useFormValidation({...data, ...controllers, ...formModelData});

    return {
        setFieldValue: (fieldName, fieldValue) => {
            controllers.setValues({[fieldName]: fieldValue});
            validateFieldWithDelay(fieldName);
        },
        setFieldTouched: (fieldName, fieldIsTouched) => {
            controllers.setTouched({[fieldName]: fieldIsTouched});
            validateFieldWithDelay(fieldName);
        },
        validateFieldImmediately: fieldName => {
            resetCurValidation();
            validateFieldWithoutDelay(fieldName);
        }
    };
}