import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
// import { Http, Response } from '@angular/http';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Dish } from '../interfaces/dish';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do'; // for debugging

const API_URL = environment.apiUrl;

@Injectable()
export class DishService {
    constructor(private http: HttpClient) {}

    public getAllDishes(): Observable<Dish[]> {
        return (
            this.http
                // .get(API_URL + '/dishes')
                .get('app/api/v1/dishes')
                // .map(response => {
                //     const dishes = response.json();
                //     return dishes.map(dish => new Dish(dish));
                // })
                // .do(data => console.log('server data:', data)) // debug
                .catch(this.handleError)
        );
    }

    public getDishById(dishId: string): Observable<Dish> {
        return (
            this.http
                // .get(API_URL + '/dishes/' + dishId)
                .get(`app/api/v1/dishes/${dishId}`)
                //   .map(response => {
                //     return new Dish(response.json());
                //   })
                // .do(data => console.log('server data:', data)) // debug
                .catch(this.handleError)
        );
    }

    public createDish(dish: Dish): Observable<Dish> {
        return (
            this.http
                // .post(API_URL + '/dishes', dish)
                .post('app/api/v1/dishes', dish)
                //   .map(response => {
                //     return new Dish(response.json());
                //   })
                .catch(this.handleError)
        );
    }

    public updateDish(dish: Dish): Observable<Dish> {
        return (
            this.http
                // .put(API_URL + '/dishes/' + dish.id, dish)
                .put(`app/api/v1/dishes`, dish)
                //   .map(response => {
                //     return new Dish(response.json());
                //   })
                .catch(this.handleError)
        );
    }

    // public deleteDishById(dishId: string): Observable<HttpResponse<number>> {
    //     console.log(dishId);
    //     return (
    //         this.http
    //             // .delete(API_URL + '/dishes/' + dishId)
    //             .delete(`app/api/v1/dishes/${dishId}`)
    //             .map((response: HttpResponse<number>) => response.status)
    //             .catch(this.handleError)
    //     );
    // }

    public deleteDishById(dishId: string): Observable<HttpResponse<number>> {
        const uri = `app/api/v1/dishes/${dishId}`;
        return (
            this.http
                // .delete(API_URL + '/dishes/' + dishId)
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
