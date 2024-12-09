import { Array, Effect as e, Number, Option, String } from "effect";
import { FileSystem } from "@effect/platform/FileSystem";
import { UnOption } from "../../utils";
import { Path } from "@effect/platform";

const del = "   ";

export const adventD1 = e.all([FileSystem, Path.Path]).pipe(
  e.andThen(([fs, path]) =>
    fs.readFileString(path.join(process.cwd(), "/problems/q-1", "file.txt")),
  ),
  e.map(String.trim),
  e.map(String.split("\n")),
  e.map(Array.map(String.split(del))),
  e.map(Array.map(Array.map((num) => UnOption(Number.parse(num))))),
  e.map((arr) =>
    Array.zip(
      Array.sort(
        Array.map(arr, (num) => UnOption(Array.head(num))),
        Number.Order,
      ),
      Array.sort(
        Array.map(arr, (num) => UnOption(Array.last(num))),
        Number.Order,
      ),
    ),
  ),
  e.map(
    Array.map((num) =>
      Number.subtract(UnOption(Array.last(num)), UnOption(Array.head(num))),
    ),
  ),
  e.map(Array.map(Math.abs)),
  e.map(Array.reduce(0, (acc, num) => acc + num)),
  e.map((data) => console.log(`Advent Day 1:: The result is: ${data}`)),
);

export const adventD1P2 = e.all([FileSystem, Path.Path]).pipe(
  e.andThen(([fs, path]) =>
    fs.readFileString(path.join(process.cwd(), "/problems/q-1", "file.txt")),
  ),
  e.map(String.trim),
  e.map(String.split("\n")),
  e.map(Array.map(String.split(del))),
  e.map(Array.map(Array.map((num) => UnOption(Number.parse(num))))),
  e.map(
    (arr) =>
      [
        Array.map(arr, (num) => UnOption(Array.head(num))),
        Array.map(arr, (num) => UnOption(Array.last(num))),
      ] as const,
  ),
  e.map((arr) =>
    Array.get(arr, 0).pipe(
      Option.map((first) =>
        Array.map(
          first,
          (each) =>
            each *
            Array.get(arr, 1).pipe(
              Option.map((second) => Array.filter(second, (x) => x === each)),
              Option.map(Array.length),
              Option.getOrThrow,
            ),
        ),
      ),
      Option.getOrThrow,
    ),
  ),
  e.map(Array.reduce(0, (acc, num) => acc + num)),
  e.map((data) => console.log(`Advent Day 1 Part 2:: The result is: ${data}`)),
);
