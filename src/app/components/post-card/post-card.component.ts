import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostModel } from 'src/app/models/post.model';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Output() btnIsClicked = new EventEmitter<{post: PostModel, user: UserModel}>();
  @Input() post!: PostModel;
  @Input() user!: UserModel;

  constructor() { }

  ngOnInit(): void {
  }

  public closeCard() {
    this.btnIsClicked.emit();
  }

}
