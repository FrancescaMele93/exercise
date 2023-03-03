import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http: HttpClient) { }

  // Get single user called by id
  public getUserById(userId: number): Observable<UserModel> {
    return this._http.get<User>(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .pipe(map(user => this._objToUser(user)));
  }

  // Transform the object received by the API in an object as per our model
  private _objToUser(obj: User): UserModel {
    return new UserModel(obj.id, obj.name, obj.username, obj.email, obj.address, obj.phone, obj.website, obj.company);
  }
}