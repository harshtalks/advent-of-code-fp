import { Option } from "effect";

export const UnOption = <T>(opt: Option.Option<T>) =>
  opt.pipe(Option.getOrThrow);
