import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../shared/entity/base-entity";

@Entity()
export class Board extends BaseEntity {
  @Column({ length: 10 })
  writer: string;

  @Column({ length: 30 })
  title: string;

  @Column({ type: "text" })
  content: string;

  static of(writer: string, title: string, content: string) {
    const board = new Board();
    board.writer = writer;
    board.title = title;
    board.content = content;
    return board;
  }

  public isMy(writer: string) {
    return this.writer === writer;
  }
}
