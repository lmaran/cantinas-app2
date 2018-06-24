export class Entity {
    [x: string]: any;
    // id: number;
    _id: string;
    name: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
