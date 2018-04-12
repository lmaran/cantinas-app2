import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
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
    isEditMode: boolean;
    submitted: boolean;
    angForm: FormGroup;
    user: User;

    // firstName = new FormControl('', Validators.required);

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private userService: UserService,
        private _location: Location
    ) {
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
            firstName: '',
            latitude: ['43.815623', Validators.required],
            longitude: ['18.5683106', Validators.required],
        });
    }

    onSubmit() {
        console.log('model-based form submitted');
        // console.log(this.form);
        // console.log(this.employeeAddressForm.value);

        const user = this.angForm.value;
        // console.log(user); // https://toddmotto.com/angular-2-forms-reactive

        this.submitted = true;
        this.userService.createUser(user).subscribe(saved => {
            this.router.navigate(['/users']);
        });
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

    goBack() {
        // https://stackoverflow.com/a/36470719
        this._location.back();
    }

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

        this.route.params.subscribe((params: Params) => {
            const id = params['id'];
            if (id) {
                this.isEditMode = true;

                this.userService.getUserById(id.toString()).subscribe((user: User) => {
                    this.user = user;
                    this.angForm.reset({ firstName: user.firstName });
                    // console.log(user);
                });
            }

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
