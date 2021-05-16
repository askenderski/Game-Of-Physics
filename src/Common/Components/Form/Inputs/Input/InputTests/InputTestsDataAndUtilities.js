import getComponentFromType from "../typeToComponentMapping";
import {mount} from "enzyme";
import FormContext from "../../../FormContext";
import Input from "./Input";

const defaultInputType = "field";
const defaultInputElementType = getComponentFromType(defaultInputType);

const inputElementTypeDifferentFromDefault = "button";

const defaultContext = {props: {}};

const renderInputWithPropGetter = ({inputType=defaultInputType, ...rest} = {}, context) =>
    renderInputWithPropGetterByInputType({inputType, ...rest}, context);
const renderInputWithPropGetterByInputType = (props, context=defaultContext) =>
    mount(<FormContext.Provider value={context}><Input {...props}/></FormContext.Provider>);

const getInputElementByWrapperWithProps = (wrapper, inputElementType=defaultInputElementType) => wrapper.find(inputElementType);
const getProp = (element, prop) => element.prop(prop);

const dataAndUtilities = {
    defaultInputElementType,
    inputElementTypeDifferentFromDefault,
    defaultContext,
    renderInputWithPropGetter,
    renderInputWithPropGetterByInputType,
    getInputElementByWrapperWithProps,
    getProp
};

export default dataAndUtilities;