## Hot Fuzz

This is a Fuzzy Match Algorithm exercise with a [React](https://reactjs.org/) based interface, the dataset is a collection of transactions with details as datetime, amount and CC information.

The purpose of this README file is to offer a walkthrough to the evolution of the application.

Demo: [Hot Fuzz](https://hugobel.github.io/hot-fuzz/)

---

### SearchBox

The input field for the user to enter its query, this will be the only element in the form as it automatically updates the results table.

Something to note on this implementation is that `SearchBox` does not hold a query state. 
Instead its `onChange` method is debounced with [Lodash](https://lodash.com/) in order to call an update on the application only when the user stopped typing.

![debouncedsearchboxgif]

---

### Transactions Table

The table with the results for the query, if the result set is empty it falls back to a `NonIdealState` message.

Some utilities were included in order to transform the incoming data, such as: 

+ Splitting datetime into date and time.
+ Ensuring that time is a 5 characters string, for example `9:40` should be `09:40`.
+ JavaScript native currency treatment for the amounts data.

---

### Ordering the transactions

The transaction results will always be ordered by date (other Fuzzy Matching implementations might order by relevance), following this feature the entries are sorted as soon as they are loaded, after that each filter should display the ordered elements, it is a set and forget sort.

Additionally the transactions are remapped and a condensed string property is appended to them, this is in order to set up the data once and query an optimized string multiple times.

---

### Filtering data

The `fuzzySearch` service is in charge of taking a query and:

+ Transform it into a [RegEx](http://regex.info/blog/2006-09-15/247) pattern.
+ Test it aganst every transaction.
+ Return an array of indices and types that reference the transactions collection.

The `condensed` property (a pipe-separated string) helps improving execution time of the regular expression. 
See: [String vs array RegEx comparison](https://jsperf.com/str-arr-match).

[debouncedsearchboxgif]: https://s3.amazonaws.com/hugobeldemos/searchbox.gif "Debounced SearchBox"
