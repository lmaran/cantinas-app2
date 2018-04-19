import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-display-error',
    templateUrl: './display-error.component.html',
    styleUrls: ['./display-error.component.scss'],
})
export class DisplayErrorComponent implements OnInit {
    @Input() field: any;
    @Input() displayError: boolean;

    constructor() {}

    ngOnInit() {
        console.log(this.field);
    }

    // confirm() {
    //     // console.log(this.field);
    // }
}
