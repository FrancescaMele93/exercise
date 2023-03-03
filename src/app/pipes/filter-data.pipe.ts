import { Pipe, PipeTransform } from '@angular/core';
import { PostModel } from '../models/post.model';

@Pipe({
  name: 'filterData'
})
export class FilterDataPipe implements PipeTransform {

  transform(posts: PostModel[], searchedText: string): (PostModel[] | null) {
    if (!searchedText) {
      return posts;
    }

    searchedText = searchedText.toLocaleLowerCase();

    return posts.filter(
      post => post.body.includes(searchedText) || post.title.includes(searchedText)
    );
  }

}
