import { Path } from "@effect/platform";
import { FileSystem } from "@effect/platform/FileSystem";
import { Effect, String, Array, Option, Number, flow, pipe } from "effect";
import { UnOption } from "../../utils";
import { first } from "effect/GroupBy";

export const adventD5 = Effect.all([FileSystem, Path.Path]).pipe(
  Effect.flatMap(([fs, path]) =>
    fs.readFileString(path.join(process.cwd(), "/problems/q-5", "file.txt")),
  ),
  Effect.map(String.trim),
  Effect.map(String.split("\n\n")),
  Effect.map(Array.map(String.split("\n"))),
  Effect.map((arr) => ({
    rules: UnOption(
      Array.head(arr).pipe(
        Option.map(Array.map(String.split("|"))),
        Option.map(
          Array.map(
            (el) =>
              [
                UnOption(
                  Array.get(el, 0).pipe(Option.map(Number.parse), UnOption),
                ),
                UnOption(
                  Array.get(el, 1).pipe(Option.map(Number.parse), UnOption),
                ),
              ] as const,
          ),
        ),
      ),
    ),
    updates: UnOption(
      Array.last(arr).pipe(
        Option.map(Array.map(String.split(","))),
        Option.map(Array.map(Array.map((el) => UnOption(Number.parse(el))))),
      ),
    ),
  })),
  Effect.map(({ updates, rules }) =>
    pipe(
      Array.filter(updates, (update) =>
        pipe(
          update,
          Array.map((page) =>
            pipe(
              Array.filter(rules, (rule) => Array.contains(rule, page)),
              (filteredRules) => ({
                whereFirst: pipe(
                  Array.filter(filteredRules, (rule) => rule[0] === page),
                  Array.map((rule) => rule[1]),
                ),
                whereSecond: pipe(
                  Array.filter(filteredRules, (rule) => rule[1] === page),
                  Array.map((rule) => rule[0]),
                ),
                before: Array.splitWhere(update, (n) => n === page)[0],
                after: pipe(
                  Array.splitWhere(update, (n) => n === page)[1],
                  (arr) => arr.slice(1),
                ),
              }),
              (rules) => {
                return (
                  pipe(
                    Array.intersection(rules.whereFirst, rules.before),
                    Array.length,
                    (len) => len === 0,
                  ) &&
                  pipe(
                    Array.intersection(rules.whereSecond, rules.after),
                    Array.length,
                    (len) => len === 0,
                  )
                );
              },
            ),
          ),
          Array.every((x) => !!x),
        ),
      ),
      // middle point of array
      Array.map((x) => ({
        len: Array.length(x),
        arr: x,
      })),
      Array.map((x) => pipe(Array.get(x.arr, Math.floor(x.len / 2)), UnOption)),
      Array.reduce(0, (a, b) => a + b),
    ),
  ),
  Effect.map(console.log),
);
