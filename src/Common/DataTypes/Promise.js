import {Promise} from "bluebird";

Promise.config({
    cancellation: true
});

export default Promise;