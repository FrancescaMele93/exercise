import { Component, OnDestroy, OnInit } from '@angular/core';
import { concat, map, merge, mergeMap, pipe, Subscription, switchMap, tap } from 'rxjs';
import { PostModel } from './models/post.model';
import { UserModel } from './models/user.model';
import { PostService } from './services/post.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private _posts$!: Subscription;
  public posts!: PostModel[];
  public user!: UserModel;
  public userIdArray: number[] = [];

  constructor(private _postService: PostService, private _userService: UsersService) {}
  
  // ngOnInit(): void {
  //   this._posts$ = this._postService.getPosts().subscribe((posts) => {
  //     this.posts = posts.slice(0, 10);
  //     return this.posts;
  //   });
  // }

  ngOnInit(): void {
    this._posts$ = this._postService.getPosts().pipe(
      switchMap((posts) => {
        this.posts = posts.slice(0, 20);
        console.log('posts: ', this.posts);
        this.posts.map(post => this.userIdArray.push(post.userId))
        return this.userIdArray;
      }),
      pipe(map(userIdArr => 
        // userIdArr.map(userId =>
        this._userService.getUserByPost(userIdArr))
      // )
      )
    )
    .subscribe(
      (user) => {
        user.subscribe;
        console.log("user in subscribe: ");
        // this.user = user;
        
        // return this.posts;
      }
    );
  }

  /**
   *     this._posts$ = this._postService.getPosts()
      .pipe(
        map((posts) => {
          this.posts = posts.slice(0, 10);
          console.log('yoohoo', this.posts[0].title);
          return this.posts;
        },
        switchMap(posts => )
        )
      )
    
      .subscribe();
   */
  
  ngOnDestroy(): void {
    this._posts$.unsubscribe;
  }
}
