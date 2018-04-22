import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-display-error',
    templateUrl: './display-error.component.html',
    styleUrls: ['./display-error.component.scss'],
})
export class DisplayErrorComponent implements OnInit {
    // @Input() field: any;
    @Input() errorMsg: string;
    @Input() displayError: boolean;
    errorName: string;

    constructor() {
        this.errorName = this.getFirstError();
        console.log('... a new instance of LandComponent has been created');
    }

    ngOnInit() {
        this.errorName = this.getFirstError();
        // console.log(this.field);
        // console.log('Control: ' + this.getControlName(this.field));
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnChanges() {
        // console.log(this.field);
        console.log('changed');
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit() {
        console.log('ngAfterViewInit');
    }

    // confirm() {
    //     // console.log(this.field);
    // }
    public getFirstError() {
        // field.errors['required']
        console.log('rrr');
        // console.log('Control: ' + this.getControlName(this.field));

        // if (this.field && this.field.errors) {
        //     console.log(this.field.errors);

        //     Object.keys(this.field.errors).forEach(key => {
        //         console.log(key);
        //         return key;
        //     });
        // }

        // console.log('aaa');
        return 'aaa';
    }

    getControlName(c: AbstractControl): string | null {
        const formGroup = c.parent.controls;
        return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
    }
}
