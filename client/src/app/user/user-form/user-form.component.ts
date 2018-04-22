import { Component, OnInit, Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/filter';
import { ValidationService } from '../../shared/services/validation.service';

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
    userForm: FormGroup;
    user: User;
    title: string;
    private formSubmitAttempt: boolean;
    getFirstErr: string;

    // firstName = new FormControl('', Validators.required);

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private _location: Location,
        public renderer2: Renderer2
    ) {
        // this.form = formBuilder.group({
        //     firstName: this.firstName,
        //     password: ['', Validators.required],
        // });
        this.createForm();
    }

    // userloyeeAddressForm = new FormGroup({
    //     fullName: new FormControl('aaa', Validators.required),
    //     address: new FormGroup({
    //         postalCode: new FormControl('', Validators.required),
    //         country: new FormControl('', Validators.required),
    //     }),
    // });
    // submitted = false;

    // getFirstErr() {
    //     console.log('aaaaaa');
    //     return 'aaaa';
    // }

    createForm() {
        this.userForm = this.formBuilder.group({
            firstName: '',
            lastName: ['', Validators.required],
            age: '',
            email: [null, [Validators.required, Validators.email]],
        });
    }

    isFieldInvalid2(field: string) {
        return !this.userForm.get(field).valid && this.userForm.get(field).touched;
    }

    isFieldInvalid(field: string) {
        // return (
        //     (!this.userForm.get(field).valid && this.userForm.get(field).touched) ||
        //     (this.userForm.get(field).untouched && this.formSubmitAttempt)
        // );
        return !this.userForm.get(field).valid && this.formSubmitAttempt;
    }

    displayFieldCss(field: string) {
        return {
            'has-error': this.isFieldInvalid(field),
            'has-feedback': this.isFieldInvalid(field),
        };
    }

    // https://loiane.com/2017/08/angular-reactive-forms-trigger-validation-on-submit
    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
                console.log(field); // firstName, email
                console.log(control.errors); // {required:true, email:true}

                if (control.errors && control.errors.required) {
                    const propertyName = 'required';
                    const err = ValidationService.getValidatorErrorMessage(propertyName, control.errors[propertyName]);
                    console.log(err);
                    this.getFirstErr = err;
                } else if (control.errors && control.errors.email) {
                    const propertyName = 'email';
                    const err = ValidationService.getValidatorErrorMessage(propertyName, control.errors[propertyName]);
                    console.log(err);
                    this.getFirstErr = err;
                }

                console.log('------------------');
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

    onSubmit() {
        this.formSubmitAttempt = true;

        if (this.userForm.valid) {
            console.log('Valid form.');
            const user = this.userForm.value;

            console.log(user); // https://toddmotto.com/angular-2-forms-reactive

            this.submitted = true;

            if (this.isEditMode) {
                user._id = this.user._id;

                this.userService.updateUser(user).subscribe(saved => {
                    this.router.navigate(['/users']);
                });
            } else {
                this.userService.createUser(user).subscribe(saved => {
                    this.router.navigate(['/users']);
                });
            }
        } else {
            console.log('Invalid form.');

            this.validateAllFormFields(this.userForm);

            return;
        }
    }

    // addNewEmployeeAddress() {
    //     this.userloyeeAddressForm.reset();
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

    reset() {
        this.userForm.reset();
        this.formSubmitAttempt = false;
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnChanges() {
        console.log('ccc');
    }

    ngOnInit() {
        console.log('bbb');
        // this.form.valueChanges
        //     .map(value => {
        //         value.firstName = value.firstName.toUpperCase();
        //         return value;
        //     })
        //     .filter(value => this.form.valid)
        //     .subscribe(value => {
        //         console.log('Model Driven Form valid value: vm = ', JSON.stringify(value));
        //     });

        this.renderer2.selectRootElement('#userLastName').focus(); // https://stackoverflow.com/a/34573219/2726725

        // or directly...https://github.com/rogerpadilla/angular2-minimalist-starter/blob/master/src/app/question/question-form.component.ts
        // const id = this.route.snapshot.params['id'];

        this.route.params.subscribe((params: Params) => {
            const id = params['id'];
            if (id) {
                this.isEditMode = true;
                this.title = 'Editeaza utilizator';

                this.userService.getUserById(id.toString()).subscribe((user: User) => {
                    this.user = user;
                    this.userForm.reset({ firstName: user.firstName, lastName: user.lastName });
                    // console.log(user);
                });
            } else {
                this.title = 'Adauga utilizator';
            }

            // this.user = {
            //     id: id,
            //     firstName: 'aaa1',
            //     lastName: 'bbb',
            //     age: 20,
            //     complete: true,
            // };

            // this.userloyeeAddressForm = this.formBuilder.group({
            //     fullName: this.user.firstName,
            //     latitude: ['43.815623', Validators.required],
            //     longitude: ['18.5683106', Validators.required],
            // });
        });

        // https://alligator.io/angular/reactive-forms-valuechanges/
        this.onChanges();
    }

    // // listen for changes on the entire form
    // onChanges(): void {
    //     this.userForm.valueChanges.subscribe(val => {
    //         this.getFirstErr = `Hello,
    //       My name is ${val.firstName} and my email is ${val.email}.`;
    //     });
    // }

    // listen for changes on on specific form control
    onChanges(): void {
        this.userForm.get('email').valueChanges.subscribe(val => {
            console.log(this.userForm.get('email').errors);

            const errors = this.userForm.get('email').errors;
            if (errors) {
                const k = Object.keys(this.userForm.get('email').errors);
                // if (k && k.length > 0) {
                //     console.log(k[0]);
                // }
                this.getFirstErr = `My first err is ${k[0]}.`;
            }

            // this.getFirstErr = `My email is ${val}.`;

            // Object.keys(this.field.errors).forEach(key => {
            // console.log(key);
            // return key;
            // });
        });
    }
}
