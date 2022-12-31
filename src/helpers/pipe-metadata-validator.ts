export function validateMetatype(metatype: Function): boolean {
  const types: Function[] = [String, Boolean, Number, Array, Object];
  return !metatype || types.includes(metatype);
}
