export function truncateNumber(number: number) {
  const minBeforeAbbreviation = 0.000001;
  const minWithTwoDecimalPlaces = 0.01;

  if (number < minBeforeAbbreviation) {
    const countNulls = Number(number.toString().split('e-')[1]);

    return number.toFixed(countNulls + 1);
  }

  if (number < minWithTwoDecimalPlaces) {
    const firstNonNullValue = number
      .toString()
      .replace(/[.]/, '')
      .split('')
      .findIndex((item) => +item > 0);

    return number.toString().slice(0, firstNonNullValue + 3);
  }

  return number.toFixed(2);
}

export function getRandomIntInclusive(min: number, max: number) {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);

  return Math.floor(Math.random() * (maxFloor - minCeil + 1) + minCeil);
}
