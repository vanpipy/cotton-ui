export const wait = (interval = 300) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });

export const justRetrunValue = async (input: unknown) => {
  return input;
};

export const convertKeyAsValue = (obj: Record<string, any>, mapping: Record<string, any>) => {
  const keys = Object.keys(mapping);

  if (keys.length) {
    return keys.reduce((result, key) => {
      result[mapping[key]] = obj[key];
      return result;
    }, {} as Record<string, unknown>);
  }

  return obj;
};
