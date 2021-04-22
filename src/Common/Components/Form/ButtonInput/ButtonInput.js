function ButtonInput(props) {
    const ComponentType = props.type !== undefined ? "input" : "button";

    return (
        <ComponentType aria-label="input" {...props} />
    );
}

export default ButtonInput;