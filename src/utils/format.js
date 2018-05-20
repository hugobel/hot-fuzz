/*
** Uses the JavaSript native number format to convert
** a number into its currency representation.
*/
const usCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

/*
** Transforms the input removing characters that are NaN
** input: $b289.906
** output: 289.91
*/
const numericValue = (input) => {
  const NaNPattern = /[^0-9.-]+/g;
  const strAmount = input.toString();
  return parseFloat(strAmount.replace(NaNPattern, ''));
};

/*
** Converts a Human-Readable date string [dd-mm-yyyy]
** into a valid ISO date [yyyy-mm-dd]
** Input: 23-05-2018
** Output: 2018-05-23
*/
export const hrToISO = (hrDate) => {
  const [day, month, year] = hrDate.split(/[/|-]/);
  if (year.length !== 4) throw new Error('Invalid date format. Use full year for dates.');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

/*
** Converts an ISO date to be displayed on the transactions table.
** Input: 2018-06-15
** Output: 15/06/2018
*/
export const isoToHR = (isoDate) => {
  const [year, month, day] = isoDate.split('-');
  return `${day}/${month}/${year}`;
};

/*
** Takes a datetime string and splits it into an object
** containing date and time
** Input: 19-02-2017T9:44
** Output: { date: [Object], time: 09:44 }
*/
export const splitDatetime = (datetime) => {
  const [date, time] = datetime.split('T');
  const isoDate = hrToISO(date);

  return {
    date: isoDate,
    time: time.padStart(5, '0'),
  };
};

/*
** Calls for a numeric value of the input
** and creates an formatted instance of the amount
*/
export const currency = amount => usCurrency.format(numericValue(amount));
