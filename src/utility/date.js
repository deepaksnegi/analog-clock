const dateFormat = {
  weekday: "long",
  month: "long",
  day: "numeric",
};

export const formatDate = (date) => {
  return date.toLocaleDateString("en-US", dateFormat);
};
