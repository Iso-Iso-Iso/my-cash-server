import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { AccessTokenGuard } from "../../guards/access-token.guard";
import { IncomeService } from "./income.service";
import { ValidateDtoPipe } from "../../pipes/validate-dto.pipe";
import { CreateIncomeDto } from "../../dto/income.dto";
import { IncomeOperationGuard } from "../../guards/income-operation.guard";

@Controller("/api/income")
export class IncomeController {
  @Inject()
  private readonly incomeService: IncomeService;

  @Get()
  @UseGuards(AccessTokenGuard)
  async getIncome(@Req() req) {
    const { userId } = req.user;
    return await this.incomeService.getIncomeByUserId(userId);
  }

  @Post()
  @UsePipes(ValidateDtoPipe)
  @UseGuards(AccessTokenGuard)
  async createIncome(@Body() body: CreateIncomeDto, @Req() req) {
    const income = { ...body, userId: req.user.userId };
    return await this.incomeService.createIncome(income);
  }

  @Put("/:id")
  @UsePipes(ValidateDtoPipe)
  @UseGuards(AccessTokenGuard, IncomeOperationGuard)
  async updateIncome(
    @Body() body: CreateIncomeDto,
    @Param("id", ParseIntPipe) id,
  ) {
    return await this.incomeService.updateIncomeById(id, body);
  }

  @Delete("/:id")
  @UseGuards(AccessTokenGuard, IncomeOperationGuard)
  async deleteIncome(@Param("id", ParseIntPipe) id) {
    return await this.incomeService.deleteIncomeById(id);
  }
}
