import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
  BadRequestException,
} from "@nestjs/common";
import { IncomeService } from "../features/income/income.service";

@Injectable()
export class IncomeOperationGuard implements CanActivate {
  @Inject()
  private readonly incomeServices: IncomeService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    if (!req.user.userId) {
      throw new UnauthorizedException();
    }
    const { userId } = req.user;
    const { id: incomeId } = req.params;
    const income = await this.incomeServices.getIncomeById(incomeId);

    if (!income) throw new BadRequestException();

    return income.userId === userId;
  }
}
