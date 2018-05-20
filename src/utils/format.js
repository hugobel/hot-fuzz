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
** Converts a Human-Readable date string [dd-mm-yyyy]
** into a valid ISO date [yyyy-mm-dd]
** Input: 23-05-2018
** Output: 2018-05-23
*/
const hrToISO = hrDate => `${hrDate.slice(6)}-${hrDate.slice(3, 5)}-${hrDate.slice(0, 2)}`;

/*
** Converts an ISO date to be displayed on the transactions table.
** Input: 2018-06-15
** Output: 15/06/2018
*/
export const isoToHR = isoDate => `${isoDate.slice(8)}/${isoDate.slice(5, 7)}/${isoDate.slice(0, 4)}`;

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

export const currency = amount => usCurrency.format(amount);
// TODO: Add test cases for util functions
