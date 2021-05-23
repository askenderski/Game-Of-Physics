import {mount} from "enzyme";
import FormContext from "../../../FormContext";
import Input from "./Input";
import {render} from "@testing-library/react";

const defaultInputType = "input";

const getDefaultContext = props => ({values: {[props.name]: ""}});

const renderInputWithPropGetter = (props = {}, context) => {
    const {inputType = defaultInputType, ...rest} = props;
    const contextToPass = {...getDefaultContext({inputType, ...rest}), ...context};

    return mount(<FormContext.Provider value={contextToPass}><Input inputType={inputType} {...rest}/></FormContext.Provider>);
};

const renderInput = (props = {}, context) => {
    const {inputType = defaultInputType, ...rest} = props;
    const contextToPass = {...getDefaultContext({inputType, ...rest}), ...context};

    return render(<FormContext.Provider
        value={contextToPass}><Input inputType={inputType} {...rest}/></FormContext.Provider>);
}

const getInputElementByWrapperWithProps = (wrapper, inputType=defaultInputType) => wrapper.find(inputType);
const getProp = (element, prop) => element.prop(prop);

const dataAndUtilities = {
    defaultInputType,
    renderInputWithPropGetter,
    renderInput,
    getInputElementByWrapperWithProps,
    getProp
};

export default dataAndUtilities;