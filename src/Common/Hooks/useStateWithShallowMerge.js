import {useState} from "react";

const useStateWithShallowMerge = defaultValue => {
    const [state, setState] = useState(defaultValue || {});

    return [state, val => setState(prevState => ({...prevState, ...val}))];
}

export default useStateWithShallowMerge;