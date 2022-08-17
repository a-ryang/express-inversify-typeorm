import { IsNotEmpty, Length } from "class-validator";

export class CreateBoardDto {
  @Length(2, 10)
  @IsNotEmpty()
  writer: string;

  @Length(2, 30)
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;
}
