import { ContainerModule } from "inversify";
import { TYPES } from "./types";
/* database import */
import { IDatabaseService } from "../modules/database/interface/IDatabase.service";
import { DatabaseService } from "../modules/database/database.service";
/* utils import */
import { Logger } from "../utils/logger";
/* modules import */
import { BoardRepository } from "../modules/board/board.repository";
import { IBoardRepository } from "../modules/board/interfaces/IBoard.repository";
import { BoardService } from "../modules/board/board.service";
import { IBoardService } from "../modules/board/interfaces/IBaord.service";

export const bindings = new ContainerModule((bind) => {
  /* database bind */
  bind<IDatabaseService>(TYPES.IDatabaseService).to(DatabaseService);
  /* utils bind */
  bind<Logger>(TYPES.Logger).to(Logger);
  /* modules bind */
  bind<IBoardService>(TYPES.IBoardService).to(BoardService);
  bind<IBoardRepository>(TYPES.IBoardRepository).to(BoardRepository);
});
