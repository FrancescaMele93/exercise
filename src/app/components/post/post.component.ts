import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
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
export class PostComponent implements OnChanges, OnDestroy, OnInit {
  private _user$!: Subscription;

  // Take post value in input from the parent component
  @Input() public post!: PostModel;
  // Create event emitter to send data to parent component
  @Output() squareIsClicked = new EventEmitter<{post: PostModel, user: UserModel}>();

  public isClicked: boolean = false;
  public initials: string = '';
  public nameSurname!: string[];
  public user!: UserModel;

  constructor(private _userService: UsersService) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    // Call the service to get the user by their id once the post property 
    // is populated by the parent component
    this._user$ = this._userService.getUserById(this.post.userId)
    .subscribe(user => {
        // Use the .split() method to find the space between name and 
        // surname and create separate strings from there, then operate
        // on each of the two array elements to populate the initials prop
        this.nameSurname = user.name.split(' ');
        this.nameSurname.forEach(element => {
          this.initials += element.at(0);
        });
        // Populate the user prop with the data taken through the service
        return this.user = user;
      });
  }
  
  ngOnDestroy(): void {
    this._user$.unsubscribe;
  }

  ngOnInit(): void {
  }

  // Send card data to the parent component, wrapped in one object 
  // because the .emit() method only takes one parameter
  public sendCardData(post: PostModel, user: UserModel) {
    this.squareIsClicked.emit({post, user});
  }
}
