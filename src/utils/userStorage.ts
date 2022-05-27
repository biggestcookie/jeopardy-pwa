import { Storage } from "@capacitor/storage";

export async function getOrInitFromStorage<T>(
  key: string,
  initialValue: T
): Promise<T> {
  const shouldParse = typeof initialValue !== "string";

  const { value: existingValue } = await Storage.get({ key });

  if (!existingValue) {
    return initialValue;
  }

  return shouldParse ? JSON.parse(existingValue) : existingValue;
}
