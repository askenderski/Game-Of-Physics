import {shallow} from "enzyme";
import withCombinedStyles from "./withCombinedStyles";

const DummyComponent = props => null;

const renderHOCedComponent = (WrappedComponent, props) => {
    return shallow(<WrappedComponent {...props}/>);
};

const getComponentWrappedInHOC = (wrapper, wrappedComponent = DummyComponent) => wrapper.find(wrappedComponent);
const getProp = (element, prop) => element.prop(prop);

const defaultDefaultClassName = "class1";
const defaultHOCedComponent = withCombinedStyles(DummyComponent, defaultDefaultClassName);
const HOCedComponentWithNoDefaultClassName = withCombinedStyles(DummyComponent);

test("component is wrapped correctly in withCombinedStyles (and so returns itself)", () => {
    const newClassName = "class";

    const HOCedComponent = renderHOCedComponent(defaultHOCedComponent, {className: newClassName});
    const wrappedComponents = getComponentWrappedInHOC(HOCedComponent);

    expect(wrappedComponents).toHaveLength(1);
});

test("component is passed combination of default and specific classNames", () => {
    const newClassName = ["class2", "class3"];

    const HOCedComponent = renderHOCedComponent(defaultHOCedComponent, {className: newClassName});
    const wrappedComponent = getComponentWrappedInHOC(HOCedComponent);

    const classNameOfWrappedComponent = getProp(wrappedComponent, "className");

    expect(classNameOfWrappedComponent).toContain(defaultDefaultClassName);

    newClassName.forEach(curClassName => {
        expect(classNameOfWrappedComponent).toContain(curClassName);
    });
});

test("withCombinedStyles works with undefined default className and undefined className", () => {
    const HOCedComponent = renderHOCedComponent(HOCedComponentWithNoDefaultClassName, {});
    const wrappedComponent = getComponentWrappedInHOC(HOCedComponent);

    const classNameOfWrappedComponent = getProp(wrappedComponent, "className");

    const nonSpaceSymbolsInCombinedClassName = classNameOfWrappedComponent.match(/[^ ]+/);

    expect(nonSpaceSymbolsInCombinedClassName).toBeNull();
});

test("wrapper component returned from withCombinedStyles passes unexpected props correctly to wrappedComponent", () => {
    const [propName, propValue] = ["unexpected", 1];

    const HOCedComponent = renderHOCedComponent(defaultHOCedComponent, {[propName]: propValue});
    const wrappedComponent = getComponentWrappedInHOC(HOCedComponent);

    const wrappedComponentUnexpectedPropValue = getProp(wrappedComponent, propName);

    expect(wrappedComponentUnexpectedPropValue).toBe(propValue);
});