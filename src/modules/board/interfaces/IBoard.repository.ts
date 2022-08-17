import { GetBoardsDto, UpdateBoardDto } from "../dtos";
import { Board } from "../board.entity";

export interface IBoardRepository {
  create(entity: Board): Promise<Board>;
  findOneById(id: number): Promise<Board | null>;
  findAll(dto: GetBoardsDto): Promise<[Board[], number]>;
  updateOne(id: number, dto: UpdateBoardDto): Promise<void>;
  deleteOne(id: number): Promise<void>;
}
