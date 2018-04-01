import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/filter';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
    form: FormGroup;

    firstName = new FormControl('', Validators.required);

    constructor(fb: FormBuilder) {
        // this.form = fb.group({
        //     firstName: this.firstName,
        //     password: ['', Validators.required],
        // });
    }

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

    addNewEmployeeAddress() {
        this.employeeAddressForm.reset();
        this.submitted = false;
    }

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
    }
}
