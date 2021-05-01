import Promise from "../DataTypes/Promise";

export default function sleep(timeInMs = 1000) {
    return new Promise((resolve, reject, onCancel)=>{
        const timeout = setTimeout(resolve, timeInMs);

        onCancel(() => {
            clearTimeout(timeout);
        });
    });
};