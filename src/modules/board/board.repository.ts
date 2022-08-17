import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { IBoardRepository } from "./interfaces/IBoard.repository";
import { IDatabaseService } from "../database/interface/IDatabase.service";
import { TYPES } from "../../container/types";
import { GetBoardsDto, UpdateBoardDto } from "./dtos";
import { Board } from "./board.entity";
import { Logger } from "../../utils/logger";

@injectable()
export class BoardRepository implements IBoardRepository {
  constructor(
    @inject(TYPES.Logger) private readonly _log: Logger,
    @inject(TYPES.IDatabaseService) private readonly _db: IDatabaseService
  ) {}

  public async create(entity: Board): Promise<Board> {
    this._log.info("board repo create");
    const repo: Repository<Board> = await this._db.getRepository(Board);
    return await repo.save(entity);
  }

  public async findOneById(id: number): Promise<Board | null> {
    this._log.info("board repo findOneById");
    const repo: Repository<Board> = await this._db.getRepository(Board);
    return await repo.findOne({ where: { id } });
  }

  public async findAll(dto: GetBoardsDto): Promise<[Board[], number]> {
    this._log.info("board repo findAll");
    const repo: Repository<Board> = await this._db.getRepository(Board);
    return await repo
      .createQueryBuilder("board")
      .take(dto.maxResults)
      .skip(dto.skip)
      .orderBy("board.id", "DESC")
      .getManyAndCount();
  }

  public async updateOne(id: number, dto: UpdateBoardDto): Promise<void> {
    this._log.info("board repo updateOne");
    const repo: Repository<Board> = await this._db.getRepository(Board);
    await repo.update(id, dto as QueryDeepPartialEntity<Board>);
  }

  public async deleteOne(id: number): Promise<void> {
    this._log.info("board repo deleteOne");
    const repo: Repository<Board> = await this._db.getRepository(Board);
    await repo.delete(id);
  }
}
