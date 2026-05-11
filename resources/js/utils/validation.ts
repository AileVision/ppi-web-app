export function getFieldError(errors: Record<string, any> | undefined, key: string): string | undefined {
  if (!errors) {
    return undefined;
  }

  const nested = key.split('.').reduce((current: any, part: string) => {
    if (current && typeof current === 'object' && part in current) {
      return current[part];
    }

    return undefined;
  }, errors);

  const resolved = nested ?? errors[key];

  if (Array.isArray(resolved)) {
    return resolved[0];
  }

  return typeof resolved === 'string' ? resolved : undefined;
}
