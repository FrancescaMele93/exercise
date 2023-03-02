export class PostModel {
    constructor(
      public body: string,
      public id: number,
      public title: string,
      public userId: number
    ) {}
  }
  