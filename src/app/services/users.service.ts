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

  public getUserByPost(userId: number): Observable<UserModel> {
    return this._http.get<User>(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .pipe(map(user => this._objToUser(user)));
  }

  private _objToUser(obj: User): UserModel {
    return new UserModel(obj.id, obj.name, obj.username, obj.email, obj.address, obj.phone, obj.website, obj.company);
  }
}


/**
 *   ngOnInit(): void {
    this._posts$ = this._postService.getPosts().pipe(
      switchMap((posts) => {
        this.posts = posts.slice(0, 10);
        return this.posts;
      }),
      map(post => this._userService.getUserByPost(post.userId)
      )
    )
    .subscribe(
      // (posts) => {
      //   this.posts = posts.slice(0, 10);
      //   return this.posts;
      // }
    );
  }
 */