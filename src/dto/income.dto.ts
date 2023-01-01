import {
  IsNotEmpty,
  IsNumber,
  IsIn,
  IsString,
  MinLength,
} from "class-validator";
import { INCOME } from "../constants/income.const";

export class CreateIncomeDto {
  @IsIn(Object.values(INCOME))
  @IsNotEmpty()
  type: string;

  @IsNumber()
  amount: number;

  @IsString()
  @MinLength(3)
  name: string;
}
