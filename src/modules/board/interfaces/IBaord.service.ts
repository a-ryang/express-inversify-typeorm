import { CreateBoardDto, GetBoardsDto, UpdateBoardDto } from "../dtos";
import { Board } from "../board.entity";

export interface IBoardService {
  create(dto: CreateBoardDto): Promise<Board>;
  getById(id: number): Promise<Board>;
  getAll(dto: GetBoardsDto): Promise<any>;
  updateOne(id: number, dto: UpdateBoardDto): Promise<Board>;
  deleteOne(id: number): Promise<void>;
}
