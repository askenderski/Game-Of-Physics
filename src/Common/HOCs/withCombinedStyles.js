import {combineClassNames} from "../Utilities/components";

export default function withCombinedStyles(WrappedComponent, defaultClassName) {
    return ({className: newClassName, ...rest}) => {
        const className = combineClassNames(newClassName, defaultClassName);

        return <WrappedComponent className={className} {...rest} />;
    };
};