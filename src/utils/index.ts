export const wait = (interval = 300) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });

export const justRetrunValue = async (input: unknown) => {
  return input;
};
