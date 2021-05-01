import useStateWithShallowMerge from "./useStateWithShallowMerge";
import {act, renderHook} from "@testing-library/react-hooks";

test("useStateWithShallowMerge has value of empty object by default", () => {
    const {result} = renderHook(() => useStateWithShallowMerge());

    const value = result.current[0];

    expect(value).toEqual({});
});

test("useStateWithShallowMerge passes default value correctly", () => {
    const defaultValue = "a";
    const {result} = renderHook(() => useStateWithShallowMerge(defaultValue));

    const value = result.current[0];

    expect(value).toBe(defaultValue);
});

test("useStateWithShallowMerge adds new value correctly", () => {
    const [newValueName, newValue] = ["someName", "a"];
    const {result} = renderHook(() => useStateWithShallowMerge());

    const setState = result.current[1];
    act(()=>setState({[newValueName]: newValue}));
    const value = result.current[0];

    expect(value).toEqual({[newValueName]: newValue});
});

test("useStateWithShallowMerge overwrites value correctly", () => {
    const [valueName, oldValue, newValue] = ["someName", "a", "b"];
    const {result} = renderHook(() => useStateWithShallowMerge({[valueName]: oldValue}));

    const setState = result.current[1];
    act(()=>setState({[valueName]: newValue}));
    const value = result.current[0];

    expect(value).toEqual({[valueName]: newValue});
});

test("useStateWithShallowMerge overwrites value correctly multiple times", () => {
    const [valueName, value1, value2, value3] = ["someName", "a", "b", "c"];
    const {result} = renderHook(() => useStateWithShallowMerge({[valueName]: value1}));

    const setState = result.current[1];
    act(()=>setState({[valueName]: value2}));
    act(()=>setState({[valueName]: value3}));
    const value = result.current[0];

    expect(value).toEqual({[valueName]: value3});
});

test("useStateWithShallowMerge overwrites value correctly and keeps other values", () => {
    const [unaffectedValueName, unaffectedValue] = ["someName1", "a"];
    const [affectedValueName, oldAffectedValue, newAffectedValue] = ["someName1", 1, 2];
    const {result} = renderHook(() => useStateWithShallowMerge(
        {[unaffectedValueName]: unaffectedValue, [affectedValueName]: oldAffectedValue}
    ));

    const setState = result.current[1];
    act(()=>setState({[affectedValueName]: newAffectedValue}));
    const value = result.current[0];

    expect(value).toEqual({[unaffectedValueName]: unaffectedValue, [affectedValueName]: newAffectedValue});
});