import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { PostModel } from 'src/app/models/post.model';
import { UserModel } from 'src/app/models/user.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, OnDestroy {
  private _posts$!: Subscription;

  public cardIsOpen: boolean = false;
  public cardPost!: PostModel;
  public cardUser!: UserModel;
  public posts!: PostModel[];
  public searchedText: string = '';
  public users!: UserModel[];
  public userIdArray: number[] = [];

  constructor(private _postService: PostService) {}

  ngOnInit(): void {
    // Call the service to get the post list
    this._posts$ = this._postService.getPosts().pipe(
      map((posts) => {
        //Take only the first 20 posts
        return this.posts = posts.slice(0, 20);
    })).subscribe();
  }
  
  ngOnDestroy(): void {
    // Unsuscribe to the observer once the component is destroyed
    this._posts$.unsubscribe;
  }

  // set the ngIf property back to false once the "Close" btn is clicked
  // and its event payload is sent back to the parent
  public closeCard() {
    this.cardIsOpen = false;
  }

  // Send user and post data to the PostCardComponent, then set the ngIf
  // property to true
  public openCard(cardData: {post: PostModel, user: UserModel}) {
    this.cardPost = cardData.post;
    this.cardUser = cardData.user;
    this.cardIsOpen = true;
  }
}
