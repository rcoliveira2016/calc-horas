export function hasChangesObj<T extends Record<any, unknown>>(
  original: T,
  updated: T,
  ignoreProperties: (keyof T)[] = []
): boolean {
  const keys = Object.keys(original) as (keyof T)[];

  return keys
    .filter((key) => !ignoreProperties.includes(key))
    .some((key) => {
      const originalValue = original[key];
      const updatedValue = updated[key];

      if (originalValue instanceof Date && updatedValue instanceof Date) {
        return originalValue.getTime() !== updatedValue.getTime();
      }

      return originalValue !== updatedValue;
    });
}
