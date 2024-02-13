import { Injectable } from "@nestjs/common";
import { IncomeEntity } from "../../models/income.entity";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class IncomeService {
  @InjectModel(IncomeEntity)
  private readonly incomeEntity: typeof IncomeEntity;

  async getIncomeByUserId(userId) {
    return await this.incomeEntity.findAll({ where: { userId } });
  }

  async createIncome(income) {
    return await this.incomeEntity.create(income, { raw: true });
  }

  async updateIncomeById(id: number, income) {
    return await this.incomeEntity.update(income, { where: { id } });
  }

  async getIncomeById(id: number) {
    return await this.incomeEntity.findOne({ where: { id } });
  }

  async deleteIncomeById(id: number) {
    return await this.incomeEntity.destroy({ where: { id } });
  }
}
