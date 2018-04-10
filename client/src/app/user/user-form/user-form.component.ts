import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/filter';

import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/interfaces/user';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
    angForm: FormGroup;
    user: User;

    // firstName = new FormControl('', Validators.required);

    constructor(private route: ActivatedRoute, private fb: FormBuilder, private userService: UserService) {
        // this.form = fb.group({
        //     firstName: this.firstName,
        //     password: ['', Validators.required],
        // });
        this.createForm();
    }

    // employeeAddressForm = new FormGroup({
    //     fullName: new FormControl('aaa', Validators.required),
    //     address: new FormGroup({
    //         postalCode: new FormControl('', Validators.required),
    //         country: new FormControl('', Validators.required),
    //     }),
    // });
    // submitted = false;

    createForm() {
        this.angForm = this.fb.group({
            fullName: 'aaabbb',
            latitude: ['43.815623', Validators.required],
            longitude: ['18.5683106', Validators.required],
        });
    }

    onSubmit() {
        console.log('model-based form submitted');
        // console.log(this.form);
        // console.log(this.employeeAddressForm.value);
    }

    // addNewEmployeeAddress() {
    //     this.employeeAddressForm.reset();
    //     this.submitted = false;
    // }

    // fullUpdate() {
    //     this.form.setValue({ firstName: 'Partial', password: 'monkey' });
    // }

    // partialUpdate() {
    //     this.form.patchValue({ firstName: 'Partial' });
    // }

    // reset() {
    //     this.form.reset();
    // }

    ngOnInit() {
        // this.form.valueChanges
        //     .map(value => {
        //         value.firstName = value.firstName.toUpperCase();
        //         return value;
        //     })
        //     .filter(value => this.form.valid)
        //     .subscribe(value => {
        //         console.log('Model Driven Form valid value: vm = ', JSON.stringify(value));
        //     });

        const ii = this.route.snapshot.params;
        console.log(ii);

        this.route.params.subscribe((params: Params) => {
            const id = params['id'];

            this.userService.getUserById(id.toString()).subscribe((user: User) => {
                this.user = user;
                this.angForm.reset({ fullName: user.firstName });
                console.log(user);
            });

            // this.user = {
            //     id: id,
            //     firstName: 'aaa1',
            //     lastName: 'bbb',
            //     age: 20,
            //     complete: true,
            // };

            // this.employeeAddressForm = this.fb.group({
            //     fullName: this.user.firstName,
            //     latitude: ['43.815623', Validators.required],
            //     longitude: ['18.5683106', Validators.required],
            // });
        });
    }
}
