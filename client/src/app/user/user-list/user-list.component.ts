import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/interfaces/user';
import { UserDataService } from '../../shared/services/user-data.service';
import { UserService } from '../../shared/services/user.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    providers: [UserDataService, UserService],
})
export class UserListComponent implements OnInit {
    newUser: User = new User();

    users: User[] = [];
    deleteModal = false;
    selectedUser: User = new User();

    constructor(private userDataService: UserDataService, private userService: UserService) {}

    ngOnInit() {
        // this.userService.getAllUsers().subscribe(users => {
        //     this.users = users;
        //     // console.log(users);
        // });
        this.refreshUserList();
    }

    refreshUserList() {
        this.userService.getAllUsers().subscribe(users => {
            this.users = users;
            // console.log(users);
        });
    }

    addUser() {
        this.userDataService.addUser(this.newUser);
        this.newUser = new User();
    }

    // toggleUserComplete(user) {
    //     this.userDataService.toggleUserComplete(user);
    // }

    // get users() {
    //     return this.userDataService.getAllUsers();
    // }

    /**
     * Delete user
     */
    confirmDeleteUser(user) {
        this.deleteModal = true;
        this.selectedUser = user;
    }

    deleteUser(userId) {
        this.deleteModal = false;
        this.userService.deleteUserById(userId).subscribe(res => {
            this.refreshUserList();
        });
    }
}