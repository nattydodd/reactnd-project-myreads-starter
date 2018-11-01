# MyReads Project

This project is built using React.js and bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

This "Book Tracking" app uses a book searching API which allows you to save books that you:
a) Want to Read
b) Are Currently Reading
c) Have Read Already

You can save these books onto your "shelves" in order to keep track for later. You can also move the books between shelves. For example, if you finish reading a book you can move it to "Read", or if you no longer "Want to Read" a book, you can remove it from your shelf completely.

To run the app locally:

* `npm install`

Start the development server with:

* `npm start`

Things I would improve if I had more time:

* Create a camelcasing function to make code more DRY and eliminate expicit passing of objects with 'title' and 'shelf'

* Add the search query to the params so if you leave the page and click the back-button, then your previous search history persists.

