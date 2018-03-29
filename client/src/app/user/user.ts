export class User {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    complete: boolean;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
