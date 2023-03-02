import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post } from '../interfaces/post.interface';
import { PostModel } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private _http: HttpClient) {}
  
  
  public getPosts(): Observable<PostModel[]> {
    return this._http
    .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
    .pipe(
      map((posts) =>
      posts.map((post) => {
        return this._objToPost(post);
      }))
      );
    }
    // mergeMap(posts => posts.map(post => this.getUserByPost(post.userId)))
    private _objToPost(obj: Post): PostModel {
      return new PostModel(obj.body, obj.id, obj.title, obj.userId);
    }
}

/**
 * ngOnInit(): void {
    this._posts$ = this._postService.getPosts().pipe(
      map((posts) => {
        this.posts = posts.slice(0, 10);
        return this.posts;
      }),
      switchMap(post => post.map(post => {
        console.log(post);
        return this._userService.getUserByPost(post.userId);
      })
      )
    )
    .subscribe(
      (user) => {
        console.log("user in subscribe: ", user);
        this.user = user;
        
        // return this.posts;
      }
    );
  }
 */