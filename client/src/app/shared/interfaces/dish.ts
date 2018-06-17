export class Dish {
    [x: string]: any;
    // id: number;
    _id: string;
    name: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
