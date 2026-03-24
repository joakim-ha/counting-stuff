export const isEquals = (countables, newBirdName) => {
  const normalizedBirdName = newBirdName.trim().toLowerCase();
  return countables.some(
    (bird) => bird.name.trim().toLowerCase() === normalizedBirdName,
  );
};
