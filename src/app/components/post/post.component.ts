import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/interfaces/post.interface';
import { PostModel } from 'src/app/models/post.model';
import { UserModel } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnDestroy, OnInit {
  private _user$!: Subscription;
  @Input() public post!: PostModel;
  public user!: UserModel;

  constructor(private _userService: UsersService) { }
  
  ngOnDestroy(): void {
    this._user$.unsubscribe;
  }

  ngOnInit(): void {
    this._user$ = this._userService.getUserByPost(this.post.userId)
    .subscribe(user => this.user = user)
  }
}
