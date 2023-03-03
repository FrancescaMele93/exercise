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
  
  // Transform the object received by the API in an object as per our model
  private _objToPost(obj: Post): PostModel {
    return new PostModel(obj.body, obj.id, obj.title, obj.userId);
  }
  
  // Get single post called by id
  public getPost(id: number): Observable<PostModel> {
    return this._http.get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .pipe(map(post => this._objToPost(post)));
  }
  
  // Get list of post in an array
  public getPosts(): Observable<PostModel[]> {
    return this._http
    .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
    .pipe(
      map((posts) =>
        // For every element of the Post array, create an object with the Post model
        posts.map((post) => {
          return this._objToPost(post);
        }))
    );
  }
}