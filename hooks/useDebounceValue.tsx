import { useState } from "react";
import { useDebounce } from "./useDebounce";

export default function useDebounceValue(defaultValue: string, delay: number) {
  const [value, setValue] = useState(defaultValue);
  const [debouncedValue, setDebouncedValue] = useState("");

  const debouncing = useDebounce((str: string) => {
    setDebouncedValue(str);
  }, delay);

  const setValueByDebouncing = (str:string) => {
    setValue(str);
    debouncing(str);
  }

  return { value, debouncedValue, setValueByDebouncing };
}
