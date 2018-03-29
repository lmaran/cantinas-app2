import { User } from './user';

describe('User', () => {
    it('should create an instance', () => {
        expect(new User()).toBeTruthy();
    });

    it('should accept values in the constructor', () => {
        const user = new User({
            userName: 'Lucian',
            lastName: 'Maran',
            age: 10,
        });
        expect(user.firstName).toEqual('Lucian');
        expect(user.lastName).toEqual('Maran');
        expect(user.age).toEqual(10);
    });
});
