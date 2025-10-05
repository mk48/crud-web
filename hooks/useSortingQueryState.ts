import { useQueryState } from "nuqs";
import type { SortingState } from "@tanstack/react-table";

export function useSortingQueryState() {
  const [sorting, setSorting] = useQueryState<SortingState>("sort", {
    defaultValue: [],
    parse: (value): SortingState => {
      try {
        const parsed = JSON.parse(value ?? "[]");
        // Ensure it’s an array of { id, desc }
        if (Array.isArray(parsed) && parsed.every((x) => typeof x.id === "string")) {
          return parsed as SortingState;
        }
        console.log("malformed sorting", parsed);
      } catch (ex) {
        // ignore malformed JSON
        console.error(ex);
      }
      return [];
    },
    serialize: (value): string => {
      try {
        return JSON.stringify(value ?? []);
      } catch {
        return "[]";
      }
    },
  });

  return [sorting, setSorting] as const;
}
