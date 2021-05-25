import {mount} from "enzyme";
import FormContext from "../../../FormContext";
import withInput from "./withInput";
import {render} from "@testing-library/react";

const defaultInputType = "input";

const getDefaultContext = props => ({values: {[props.name]: ""}});

const renderInputWithPropGetter = ({propsToPassManually = {}, options, formProps: context}={}) => {
    const {inputType = defaultInputType, ...rest} = propsToPassManually;
    const contextToPass = {...getDefaultContext({inputType, ...rest}), ...context};

    const Component = withInput(inputType, options);

    return mount(<FormContext.Provider value={contextToPass}><Component {...rest}/></FormContext.Provider>);
};

const renderInput = (props = {}, context) => {
    const {inputType = defaultInputType, ...rest} = props;
    const contextToPass = {...getDefaultContext({inputType, ...rest}), ...context};

    const Component = withInput(inputType);

    return render(<FormContext.Provider
        value={contextToPass}><Component inputType={inputType} {...rest}/></FormContext.Provider>);
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