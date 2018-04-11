import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
// import { Http, Response } from '@angular/http';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do'; // for debugging

const API_URL = environment.apiUrl;

@Injectable()
export class UserService {
    constructor(private http: HttpClient) {}

    public getAllUsers(): Observable<User[]> {
        return (
            this.http
                // .get(API_URL + '/users')
                .get('app/api/v1/users')
                // .map(response => {
                //     const users = response.json();
                //     return users.map(user => new User(user));
                // })
                // .do(data => console.log('server data:', data)) // debug
                .catch(this.handleError)
        );
    }

    public createUser(user: User): Observable<User> {
        return (
            this.http
                // .post(API_URL + '/users', user)
                .post('app/api/v1/users', user)
                //   .map(response => {
                //     return new User(response.json());
                //   })
                .catch(this.handleError)
        );
    }

    public getUserById(userId: string): Observable<User> {
        return (
            this.http
                // .get(API_URL + '/users/' + userId)
                .get(`app/api/v1/users/${userId}`)
                //   .map(response => {
                //     return new User(response.json());
                //   })
                .catch(this.handleError)
        );
    }

    //   public updateUser(user: User): Observable<User> {
    //     return this.http
    //       .put(API_URL + '/users/' + user.id, user)
    //       .map(response => {
    //         return new User(response.json());
    //       })
    //       .catch(this.handleError);
    //   }

    //   public deleteUserById(userId: number): Observable<null> {
    //     return this.http
    //       .delete(API_URL + '/users/' + userId)
    //       .map(response => null)
    //       .catch(this.handleError);
    //   }

    private handleError(error: Response | any) {
        console.error('ApiService::handleError', error);
        return Observable.throw(error);
    }
}
