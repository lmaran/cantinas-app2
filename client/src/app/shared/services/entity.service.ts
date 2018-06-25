import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
// import { Http, Response } from '@angular/http';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Entity } from '../interfaces/entity';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do'; // for debugging

const API_URL = environment.apiUrl;

@Injectable({
    providedIn: 'root',
})
export class EntityService {
    constructor(private http: HttpClient) {}

    public getAllEntities(): Observable<Entity[]> {
        return (
            this.http
                // .get(API_URL + '/entities')
                .get<Entity[]>('app/api/v1/entities')
                // .map(response => {
                //     const entities = response.json();
                //     return entities.map(entity => new Entity(entity));
                // })
                // .do(data => console.log('server data:', data)) // debug
                .catch(this.handleError)
        );
    }

    public getEntityById(entityId: string): Observable<Entity> {
        return (
            this.http
                // .get(API_URL + '/entities/' + entityId)
                .get<Entity>(`app/api/v1/entities/${entityId}`)
                //   .map(response => {
                //     return new Entity(response.json());
                //   })
                // .do(data => console.log('server data:', data)) // debug
                .catch(this.handleError)
        );
    }

    public createEntity(entity: Entity): Observable<Entity> {
        return (
            this.http
                // .post(API_URL + '/entities', entity)
                .post<Entity>('app/api/v1/entities', entity)
                //   .map(response => {
                //     return new Entity(response.json());
                //   })
                .catch(this.handleError)
        );
    }

    public updateEntity(entity: Entity): Observable<Entity> {
        return (
            this.http
                // .put(API_URL + '/entities/' + entity.id, entity)
                .put<Entity>(`app/api/v1/entities`, entity)
                //   .map(response => {
                //     return new Entity(response.json());
                //   })
                .catch(this.handleError)
        );
    }

    // public deleteEntityById(entityId: string): Observable<HttpResponse<number>> {
    //     console.log(entityId);
    //     return (
    //         this.http
    //             // .delete(API_URL + '/entities/' + entityId)
    //             .delete(`app/api/v1/entities/${entityId}`)
    //             .map((response: HttpResponse<number>) => response.status)
    //             .catch(this.handleError)
    //     );
    // }

    // public deleteEntityById(entityId: string): Observable<HttpResponse<number>> {
    public deleteEntityById(entityId: string): Observable<{}> {
        const uri = `app/api/v1/entities/${entityId}`;
        return (
            this.http
                // .delete(API_URL + '/entities/' + entityId)
                // tell HttpClient that we want the full response https://stackoverflow.com/a/46809000/2726725
                .delete(uri, { observe: 'response' })
                .map((response: HttpResponse<number>) => response.status)
                .catch(this.handleError)
        );
    }

    private handleError(error: Response | any) {
        console.error('ApiService::handleError', error);
        return Observable.throw(error);
    }
}
