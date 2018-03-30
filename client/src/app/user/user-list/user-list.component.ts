import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/interfaces/user';
import { UserDataService } from '../../shared/services/user-data.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    providers: [UserDataService],
})
export class UserListComponent implements OnInit {
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
