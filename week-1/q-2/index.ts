import {
  Array,
  Console,
  Effect as e,
  Effect,
  Number,
  Option,
  String,
} from "effect";
import { FileSystem } from "@effect/platform/FileSystem";
import { UnOption } from "../../utils";
import { Path } from "@effect/platform";

// check if array is increasing or decreasing
const isIncreasingOrDecreasing = (arr: Array<number>) =>
  e.succeed(arr).pipe(
    e.map((numbers) => Array.zip(numbers.slice(0, -1), numbers.slice(1))),
    e.map(
      (number) =>
        Array.every(number, ([a, b]) => a <= b) ||
        Array.every(number, ([a, b]) => a >= b),
    ),
    e.runSync,
  );

const hasNicePairs = (arr: Array<number>) =>
  e.succeed(arr).pipe(
    e.map((numbers) => Array.zip(numbers.slice(0, -1), numbers.slice(1))),
    e.map((numbers) =>
      Array.every(numbers, ([a, b]) =>
        [1, 2, 3].includes(Math.abs(Number.subtract(a, b))),
      ),
    ),
    e.runSync,
  );

export const adventW1Q2 = Effect.all([FileSystem, Path.Path]).pipe(
  e.andThen(([fs, path]) =>
    fs.readFileString(path.join(process.cwd(), "/week-1/q-2", "file.txt")),
  ),
  e.map(String.trim),
  e.map(String.split("\n")),
  e.map(Array.map(String.split(" "))),
  e.map(Array.map(Array.map((num) => UnOption(Number.parse(num))))),
  e.map(Array.filter(isIncreasingOrDecreasing)),
  e.map(Array.filter(hasNicePairs)),
  e.map(Array.length),
  e.map((data) => console.log(`Week One Question Two: ${data}`)),
);
