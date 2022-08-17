import { inject, injectable } from "inversify";
import { TYPES } from "../../container/types";
import { IBoardService } from "./interfaces/IBaord.service";
import { IBoardRepository } from "./interfaces/IBoard.repository";
import { Board } from "./board.entity";
import { CreateBoardDto, GetBoardsDto, UpdateBoardDto } from "./dtos";
import { HttpException } from "../../shared/errors/http-exception";
import { Page } from "../../shared/page/page";

@injectable()
export class BoardService implements IBoardService {
  constructor(
    @inject(TYPES.IBoardRepository)
    private readonly _boardRepo: IBoardRepository
  ) {}

  public async create(dto: CreateBoardDto): Promise<Board> {
    const { writer, title, content } = dto;
    const entity = Board.of(writer, title, content);
    return await this._boardRepo.create(entity);
  }

  public async getById(id: number): Promise<any> {
    const foundBoard = await this._boardRepo.findOneById(id);
    if (!foundBoard)
      throw new HttpException("NotFound", "not exists board", 404);
    return foundBoard;
  }

  public async getAll(dto: GetBoardsDto): Promise<any> {
    const { page, maxResults } = dto;
    const [boards, count] = await this._boardRepo.findAll(dto);

    return new Page(count, page, maxResults, boards);
  }

  public async updateOne(id: number, dto: UpdateBoardDto): Promise<Board> {
    const { writer, title, content } = dto;
    const foundBoard = await this._boardRepo.findOneById(id);
    if (!foundBoard)
      throw new HttpException("NotFound", "not exists board", 404);

    const isMyBoard = foundBoard.isMy(writer);
    if (!isMyBoard) throw new HttpException("Forbidden", "not your board", 403);

    await this._boardRepo.updateOne(id, dto);

    foundBoard.title = title;
    foundBoard.content = content;

    return foundBoard;
  }

  public async deleteOne(id: number): Promise<void> {
    const foundBoard = await this._boardRepo.findOneById(id);
    if (!foundBoard)
      throw new HttpException("NotFound", "not exists board", 404);
    await this._boardRepo.deleteOne(id);
  }
}
