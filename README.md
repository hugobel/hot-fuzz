## Hot Fuzz

This is a Fuzzy Match Algorithm project with a [React](https://reactjs.org/) based interface, the dataset is a collection of transactions with details as datetime, amount and CC information.

The purpose of this README file is to offer a walkthrough to the evolution of the application.

---

### SearchBox component

The input field for the user to enter its query, this will be the only element in the form as it automatically updates the results table.

Something to note on this implementation is that `SearchBox` does not hold a query state, instead its `onChange` method is debounced with [Lodash](https://lodash.com/) in order to only call an update on the `App` only when the user stopped typing and not on every keystroke.

![debouncedsearchboxgif]

[debouncedsearchboxgif]: https://s3.amazonaws.com/hugobeldemos/searchbox.gif "Debounced SearchBox"