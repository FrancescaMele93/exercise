import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription, switchMap } from 'rxjs';
import { PostModel } from 'src/app/models/post.model';
import { UserModel } from 'src/app/models/user.model';
import { PostService } from 'src/app/services/post.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnDestroy, OnInit {
  private _post$!: Subscription;
  private _user$!: Subscription;

  public post!: PostModel;
  public user!: UserModel;

  constructor(
    private _route: ActivatedRoute, 
    private _postService: PostService,
    private _userService: UsersService) { }
  
  ngOnDestroy(): void {
    this._post$.unsubscribe();
  }

  ngOnInit(): void {
    // this._post$ = this._route.paramMap.pipe(
    //   map(param => param.get('id') as string),
    //   switchMap(id => this._postService.getPost(+id))
    // ).subscribe(post => this.post = post);
    this._post$ = this._route.paramMap.pipe(
      map(param => param.get('id') as string),
      switchMap(id => this._postService.getPost(+id)),
      map(post => {
        console.log(post);
        
        return this.post = post
      }),
      switchMap(post => this._userService.getUserById(post.userId))
    ).subscribe(
      user => {
        console.log(user);
        
        this.user = user}
      );
  }

}
/**
 *   ngOnInit(): void {
    this._post$ = this._route.paramMap.pipe(
      map(param => param.get('id') as string),
      switchMap(id => this._postService.getPost(+id)),
      map(post => {
        return this.post = post
      }),
      switchMap(post => this._userService.getUserById(post.userId))
    ).subscribe(
      user => this.user = user
      );
  }
 */