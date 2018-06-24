import { Component, OnInit, ViewChild } from '@angular/core';
import { Entity } from '../../shared/interfaces/entity';
import { EntityService } from '../../shared/services/entity.service';
import { AppModalComponent } from '../../shared/components/confirmDelete/confirmDelete.component';
import { ClrLoadingState } from '@clr/angular';

@Component({
    selector: 'app-entity-list',
    templateUrl: './entity-list.component.html',
    styleUrls: ['./entity-list.component.scss'],
    providers: [EntityService],
})
export class EntityListComponent implements OnInit {
    newEntity: Entity = new Entity();

    entities: Entity[] = [];
    deleteModal = false;
    selectedEntity: Entity = new Entity();
    title: string;
    categoryList: any;

    validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
    submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;

    // Don't forget to add this (child) component in the current html
    @ViewChild(AppModalComponent) modal: AppModalComponent;

    constructor(private entityService: EntityService) {}

    ngOnInit() {
        // this.entityService.getAllEntities().subscribe(entities => {
        //     this.entities = entities;
        //     // console.log(entities);
        // });
        this.categoryList = [
            { label: '' },
            { value: '1', label: 'Supa' },
            { value: '2', label: 'Felul doi' },
            { value: '3', label: 'Salata' },
            { value: '4', label: 'Desert' },
        ];

        this.title = 'Entitati';
        this.refreshEntityList();
    }

    validateDemo() {
        this.validateBtnState = ClrLoadingState.LOADING;
        // Validating Logic
        this.validateBtnState = ClrLoadingState.SUCCESS;
    }

    submitDemo() {
        this.submitBtnState = ClrLoadingState.LOADING;
        // Submit Logic
        // this.submitBtnState = ClrLoadingState.DEFAULT;
        this.submitBtnState = ClrLoadingState.SUCCESS;
    }

    refreshEntityList() {
        this.entityService.getAllEntities().subscribe(entities => {
            // this.entities = entities;
            this.entities = entities.map(x => {
                const newCategory = this.categoryList.find(c => c.value === x.category);
                if (newCategory) {
                    x.category = newCategory.label;
                }
                return x;
            });
        });
    }

    // toggleEntityComplete(entity) {
    //     this.entityDataService.toggleEntityComplete(entity);
    // }

    // get entities() {
    //     return this.entityDataService.getAllEntities();
    // }

    // /**
    //  * Delete entity (met.1)
    //  */
    // confirmDeleteEntity(entity) {
    //     this.deleteModal = true;
    //     this.selectedEntity = entity;
    // }

    // met.1
    // deleteEntity(entityId) {
    //     this.deleteModal = false;
    //     this.entityService.deleteEntityById(entityId).subscribe(res => {
    //         this.refreshEntityList();
    //     });
    // }

    // met 2.
    deleteEntity = function(entity) {
        this.modal.open(`${entity.firstName} ${entity.lastName}`, () => {
            this.entityService.deleteEntityById(entity._id).subscribe(res => {
                this.refreshEntityList();
            });
            // this.modal.show = false;
        });
    };
}
