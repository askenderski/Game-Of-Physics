import {mount} from "enzyme";
import FormContext from "../../../FormContext";
import Input from "./Input";
import {render} from "@testing-library/react";

const defaultInputType = "input";

const getDefaultContext = props => ({values: {[props.name]: ""}});

const renderInputWithPropGetter = ({inputType=defaultInputType, ...rest} = {}, context) =>
    renderInputWithPropGetterWithoutDefaults({inputType, ...rest}, context);
const renderInputWithPropGetterWithoutDefaults = (props, context=getDefaultContext(props)) =>
    mount(<FormContext.Provider value={context}><Input {...props}/></FormContext.Provider>);

const renderInput = ({inputType=defaultInputType, ...rest} = {}, context) =>
    renderInputWithoutDefaults({inputType, ...rest}, context);
const renderInputWithoutDefaults = (props, context=getDefaultContext(props)) =>
    render(<FormContext.Provider value={context}><Input {...props}/></FormContext.Provider>);

const getInputElementByWrapperWithProps = (wrapper, inputType=defaultInputType) => wrapper.find(inputType);
const getProp = (element, prop) => element.prop(prop);

const dataAndUtilities = {
    defaultInputType,
    renderInputWithPropGetter,
    renderInputWithPropGetterWithoutDefaults,
    renderInput,
    renderInputWithoutDefaults,
    getInputElementByWrapperWithProps,
    getProp
};

export default dataAndUtilities;