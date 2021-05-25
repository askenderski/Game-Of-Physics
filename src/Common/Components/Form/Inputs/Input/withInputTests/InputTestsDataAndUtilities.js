import {mount} from "enzyme";
import FormContext from "../../../FormContext";
import withInput from "./withInput";
import {render} from "@testing-library/react";

const defaultInputType = "input";

const getDefaultContext = props => ({values: {[props.name]: ""}});

const renderInputWithPropGetter =
    ({inputType=defaultInputType, propsToPassManually = {}, options, formProps: context}={}) => {
    const contextToPass = {...getDefaultContext({inputType, ...propsToPassManually}), ...context};

    const Component = withInput(inputType, options);

    return mount(<FormContext.Provider value={contextToPass}><Component {...propsToPassManually}/></FormContext.Provider>);
};

const renderInput =
    ({inputType=defaultInputType, propsToPassManually = {}, options, formProps: context}) => {
    const contextToPass = {...getDefaultContext({inputType, ...propsToPassManually}), ...context};

    const Component = withInput(inputType, options);

    return render(<FormContext.Provider value={contextToPass}><Component {...propsToPassManually}/></FormContext.Provider>);
};

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