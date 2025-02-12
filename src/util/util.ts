export const formatNumber = (n: number) => {
  return (
    (n >= 0 ? "" : "-") +
    "$" +
    Math.abs(n).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
};
