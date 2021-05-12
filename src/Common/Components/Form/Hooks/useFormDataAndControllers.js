import {useReducer} from "react";

function getInitialErrors({initialValues, validators}) {
    const initialErrorsToShow = {};

    Object.keys(initialValues).concat(Object.keys(validators))
        .forEach(propName => initialErrorsToShow[propName] = []);

    return initialErrorsToShow;
}


export default function useFormDataAndControllers(props) {
    const {initialValues, validators} = props;

    const [state, dispatch] = useReducer((state, action) => {
            if (action.type === "changeValue") {
                return {...state, values: {...state.values, [action.payload.name]: action.payload.value}};
            }
            if (action.type === "changeTouched") {
                return {...state, touched: {...state.touched, [action.payload.name]: action.payload.value}};
            }
            if (action.type === "validateSingleField") {
                return {...state, errorsToShow:
                        {...state.errorsToShow, [action.payload.name]: validators[action.payload.name](state.values[action.payload.name])}};
            }
        },
        {values: initialValues, touched: {}, errorsToShow: getInitialErrors(props)});

    return {
        data: {values: state.values, touched: state.touched, errorsToShow: state.errorsToShow},
        controllers: {
            validate: (fields = []) => {
                fields.forEach(fieldName => {
                    dispatch({type: "validateSingleField", payload: {name: fieldName}});
                });
            },
            setTouched: (touched = {}) => {
                Object.entries(touched).forEach(([fieldName, fieldValue]) => {
                    dispatch({type: "changeTouched", payload: {name: fieldName, value: fieldValue}});
                });
            },
            setValues: (values = {}) => {
                Object.entries(values).forEach(([fieldName, fieldValue]) => {
                    dispatch({type: "changeValue", payload: {name: fieldName, value: fieldValue}});
                });
            }
        }
    };
}