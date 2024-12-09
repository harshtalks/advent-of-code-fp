import { FileSystem } from "@effect/platform/FileSystem";
import { Path } from "@effect/platform/Path";
import { Array, Effect as e, Number, Option, Stream, String } from "effect";

export const adventD3 = e.all([FileSystem, Path]).pipe(
  e.flatMap(([fs, path]) =>
    fs.readFileString(path.join(process.cwd(), "/problems/q-3", "file.txt")),
  ),
  e.map(String.trim),
  e.map(String.matchAll(new RegExp(/mul\((\d*),(\d*)\)/g))),
  e.map(Array.fromIterable),
  e.map(Array.map((value) => [Array.get(value, 1), Array.get(value, 2)])),
  e.map(
    Array.map(
      Array.map((value) =>
        value.pipe(Option.flatMap(Number.parse), Option.getOrThrow),
      ),
    ),
  ),
  e.map(Array.map((value) => Number.multiplyAll(value))),
  e.map(Array.reduce(0, (a, b) => a + b)),
  e.map((data) => console.log(`Advent Day 3: The Result is ${data}`)),
);
