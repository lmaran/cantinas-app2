import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UserDataService } from './user-data.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    providers: [UserDataService],
})
export class UserComponent implements OnInit {
    newUser: User = new User();
    constructor(private userDataService: UserDataService) {}

    ngOnInit() {}

    addUser() {
        this.userDataService.addUser(this.newUser);
        this.newUser = new User();
    }

    toggleUserComplete(user) {
        this.userDataService.toggleUserComplete(user);
    }

    removeUser(user) {
        this.userDataService.deleteUserById(user.id);
    }

    get users() {
        return this.userDataService.getAllUsers();
    }
}
