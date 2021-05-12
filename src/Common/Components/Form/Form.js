import useFormModel from "./Hooks/useFormModel";

function getPropsToPassToView(props) {
    const {handlers, data} = props;

    const {values, touched, errorsToShow: errors} = data;
    const {setFieldTouched, setFieldValue, validateFieldImmediately} = handlers;

    const handleChangeByName = (name, value) => {
        setFieldTouched(name, true);
        setFieldValue(name, value);
    };
    const focusOn = name => {
        setFieldTouched(name, true);
    };
    const removeFocusFrom = name => {
        validateFieldImmediately(name);
    };

    return {values, handleChangeByName, focusOn, removeFocusFrom, touched, errors};
}

function Form(props) {
    const {getFormView} = props;
    const {initialValues = {}, validators = {}, time} = props;

    const formModel = useFormModel({initialValues, validators, time});
    const formView = getFormView(getPropsToPassToView(formModel));

    return <form>{formView}</form>;
}

export default Form;