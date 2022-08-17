import container from "../../src/container/container";
import { TYPES } from "../../src/container/types";
import { IBoardService } from "../../src/modules/board/interfaces/IBaord.service";
import { HttpException } from "../../src/shared/errors/http-exception";
import { Board } from "../../src/modules/board/board.entity";

describe("BoardService unit Test", () => {
  beforeEach(() => {
    container.snapshot();
  });

  afterEach(() => {
    container.restore();
  });

  describe("getById", () => {
    it("if board repository return Board, return foundBoard", async () => {
      const boardId = 1;
      const mockFindOneById = jest.fn(() => new Board());

      container.rebind(TYPES.IBoardRepository).toConstantValue({
        findOneById: mockFindOneById,
      });

      const boardService = container.get<IBoardService>(TYPES.IBoardService);

      const result = await boardService.getById(boardId);

      expect(result).toEqual(new Board());
    });

    it("if board repository return null, throw HttpException", async () => {
      const boardId = 1;
      const mockFindOneById = jest.fn(() => null);

      container.rebind(TYPES.IBoardRepository).toConstantValue({
        findOneById: mockFindOneById,
      });

      const boardService = container.get<IBoardService>(TYPES.IBoardService);

      await expect(
        async () => await boardService.getById(boardId)
      ).rejects.toThrowError(
        new HttpException("NotFound", "not exists board", 404)
      );
      expect(mockFindOneById).toBeCalledTimes(1);
    });
  });
});
