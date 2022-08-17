import { Type } from "class-transformer";
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  Length,
  Max,
  Min,
} from "class-validator";

export class GetBoardsDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(10)
  @Max(30)
  @IsOptional()
  maxResults: number = 10;

  get skip(): number {
    return (this.page - 1) * this.maxResults;
  }
}
