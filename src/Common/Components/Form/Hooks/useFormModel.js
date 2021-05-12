import useFormHandlers from "./useFormHandlers";
import useFormDataAndControllers from "./useFormDataAndControllers";

export default function useFormModel(formModelData) {
    const formDataAndControllers = useFormDataAndControllers(formModelData);

    const handlers = useFormHandlers(formDataAndControllers, formModelData);

    return {
        data: formDataAndControllers.data,
        handlers
    };
}