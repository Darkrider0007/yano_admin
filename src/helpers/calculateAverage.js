export const calculateAverage = (data, key) => {
  if (!data || data.length === 0) {
    return 0;
  }

  const filteredData = data.filter((entry) => {
    const entryDate = new Date(entry.createdAt);
    const today = new Date();
    const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));
    return entryDate >= thirtyDaysAgo;
  });

  if (filteredData.length === 0) {
    return 0;
  }

  const sum = filteredData.reduce((total, item) => total + item[key], 0);
  return sum / filteredData.length || 0;
};
