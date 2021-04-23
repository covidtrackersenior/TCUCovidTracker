
export const countyValues = (data, value) => {
  const percents = [];
  const { counties } = data.state;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < counties.length; i++) {
    percents.push(counties[i].stats[0][value]);
  }
  // eslint-disable-next-line prefer-spread
  const min = Math.min.apply(Math, percents);
  // eslint-disable-next-line prefer-spread
  const max = Math.max.apply(Math, percents);
  const diff = max - min;
  const interval = diff / 4;
  return [min, min + interval, min + interval * 2, min + interval * 3, max];
};

export const stateValues = (data, value) => {
  const percents = [];
  const { states } = data;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < states.length; i++) {
    if (states[i].name !== "District of Columbia")
      percents.push(states[i].stats[0][value]);
  }
  // eslint-disable-next-line prefer-spread
  const min = Math.min.apply(Math, percents);
  // eslint-disable-next-line prefer-spread
  const max = Math.max.apply(Math, percents);
  const diff = max - min;
  const interval = diff / 4;
  return [min, min + interval, min + interval * 2, min + interval * 3, max];
};

