import getComponentFromType from "../typeToComponentMapping";
import {mount} from "enzyme";
import FormContext from "../../../FormContext";
import Input from "./Input";

const defaultInputType = "field";
const defaultInputElementType = getComponentFromType(defaultInputType);

const inputTypeDifferentFromDefault = "button";
const inputElementTypeDifferentFromDefault = getComponentFromType(inputTypeDifferentFromDefault);

const getDefaultContext = props => ({values: {[props.name]: ""}});

const renderInputWithPropGetter = ({inputType=defaultInputType, ...rest} = {}, context) =>
    renderInputWithPropGetterWithoutDefaults({inputType, ...rest}, context);
const renderInputWithPropGetterWithoutDefaults = (props, context=getDefaultContext(props)) =>
    mount(<FormContext.Provider value={context}><Input {...props}/></FormContext.Provider>);

const getInputElementByWrapperWithProps = (wrapper, inputElementType=defaultInputElementType) => wrapper.find(inputElementType);
const getProp = (element, prop) => element.prop(prop);

const dataAndUtilities = {
    defaultInputType,
    defaultInputElementType,
    inputTypeDifferentFromDefault,
    inputElementTypeDifferentFromDefault,
    renderInputWithPropGetter,
    renderInputWithPropGetterWithoutDefaults,
    getInputElementByWrapperWithProps,
    getProp
};

export default dataAndUtilities;