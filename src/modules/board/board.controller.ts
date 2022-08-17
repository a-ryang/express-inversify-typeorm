import { Request, Response } from "express";
import { inject } from "inversify";
import {
  controller,
  httpDelete,
  httpGet,
  httpPatch,
  httpPost,
  queryParam,
  requestBody,
  requestParam,
} from "inversify-express-utils";
import { TYPES } from "../../container/types";
import { IBoardService } from "./interfaces/IBaord.service";
import { CreateBoardDto, GetBoardsDto, UpdateBoardDto } from "./dtos";
import { validateBody, validateParam, validateQuery } from "../../middlewares/";
import { Logger } from "../../utils/logger";
import { IdDto } from "../../shared/dto/id.dto";

@controller("/boards")
export class BoardController {
  constructor(
    @inject(TYPES.Logger) private readonly _log: Logger,
    @inject(TYPES.IBoardService) private readonly _boardService: IBoardService
  ) {}

  @httpPost("/", validateBody(CreateBoardDto))
  async create(
    @requestBody() body: CreateBoardDto,
    req: Request,
    res: Response
  ) {
    this._log.info("board controller create");
    const result = await this._boardService.create(body);
    return res.status(201).json(result);
  }

  @httpGet("/:id", validateParam(IdDto))
  async getById(@requestParam() param: IdDto, req: Request, res: Response) {
    const { id } = param;
    this._log.info("board controller get by id");
    const result = await this._boardService.getById(id as unknown as number);
    return res.status(200).json(result);
  }

  @httpGet("/", validateQuery(GetBoardsDto))
  async getAll(@queryParam() query: GetBoardsDto, req: Request, res: Response) {
    this._log.info("board controller get all");
    const result = await this._boardService.getAll(query);
    return res.status(200).json(result);
  }

  @httpPatch("/:id", validateParam(IdDto), validateBody(UpdateBoardDto))
  async update(
    @requestParam() param: IdDto,
    @requestBody() body: UpdateBoardDto,
    req: Request,
    res: Response
  ) {
    this._log.info("board controller update");
    const { id } = param;
    const result = await this._boardService.updateOne(id, body);
    return res.status(200).json(result);
  }

  @httpDelete("/:id", validateParam(IdDto))
  async remove(@requestParam() param: IdDto, req: Request, res: Response) {
    this._log.info("board controller remove");
    const { id } = param;
    await this._boardService.deleteOne(id);
    return res.status(204).end();
  }
}
