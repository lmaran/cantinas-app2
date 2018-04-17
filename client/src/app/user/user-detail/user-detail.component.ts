import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/filter';

import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/interfaces/user';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
    form: FormGroup;

    user: User;

    firstName = new FormControl('', Validators.required);

    // constructor(fb: FormBuilder) {
    // this.form = fb.group({
    //     firstName: this.firstName,
    //     password: ['', Validators.required],
    // });
    // }

    constructor(private route: ActivatedRoute, private userService: UserService) {}

    employeeAddressForm = new FormGroup({
        fullName: new FormControl('aaa', Validators.required),
        address: new FormGroup({
            postalCode: new FormControl('', Validators.required),
            country: new FormControl('', Validators.required),
        }),
    });
    submitted = false;

    onSubmit() {
        console.log('model-based form submitted');
        // console.log(this.form);
        console.log(this.employeeAddressForm.value);
    }
    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            const id = params['id'];
            // this.userService.getCustomer(id).subscribe((customer: ICustomer) => {
            //     this.customer = customer;
            //     this.mapEnabled = true;
            // });

            this.user = {
                _id: id,
                firstName: 'aaa1',
                lastName: 'bbb',
                age: 20,
                complete: true,
            };
        });
    }
}
