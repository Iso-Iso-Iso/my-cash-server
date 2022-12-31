import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { HashPassword } from "../helpers/hash-password";

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  async transform(value: any, { type }: ArgumentMetadata) {
    if (type == "body") {
      value.password = HashPassword(value.password);
    }

    return value;
  }
}
