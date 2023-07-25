`TODO: Add a nice screenshot of the app!`

# Class 42B final project

This is the final project for the HackYourFuture curriculum we did as a class using the MERN stack by following the agile methodology with our team and a group of mentors. A quick guide to what we built:

> TODO: HYS is an innovative e-commerce platform that celebrates the beauty of handmade and artistic products. Our primary focus is to connect talented artisans with discerning customers who appreciate the uniqueness and craftsmanship of such items. We firmly believe that every piece tells a story, and through our platform, we aim to promote creativity, support local artisans, and bring exceptional products to a global audience.

Our platform features four distinct categories: Home and Living, Jewelry, Art and Collectibles and Personal Gifts.
To bring this project to life, we utilized a variety of cutting-edge technologies. The core of our application is built on React, providing a seamless and interactive user experience. We leveraged MongoDB as our database, ensuring efficient data management and storage.
Payment integration is a crucial aspect of any e-commerce platform, and we have implemented the Stripe library to handle secure and hassle-free transactions. Additionally, we utilized the Axios library for smooth communication between the front-end and back-end. To streamline our design process, we employed Figma, a powerful tool for creating wireframes and designing visually appealing interfaces.

`[Click here for the Demo version](https://c42-team-b.herokuapp.com/)`

## 1. Setup

First, to setup all the directories run the following in the main directory:

`npm install`

`npm run setup`

The first command will install `cypress` and some small libraries needed for running the rest of the commands. The second will go into the `client` and `server` directories and set those up to be ran.

In the `client` and `server` directory there are two `.env.example` files. Create a copy and rename that to `.env`. Then follow the instructions in those files to fill in the right values.

To run the app in dev mode you can run the following command in the main directory:

`npm run dev`

## 2. Code structure

```
client
├── public
└── src
|   └── __tests__
|   └── __testUtils__
|   └── assets
|   └── components
|       └── __tests__
|       └── CheckoutPage
|           └── PersonalInformationForm.css
|           └── PersonalInformationForm.jsx
|           └── ShippingMethod.css
|           └── ShippingMethod.jsx
|       └── Footer
|           └── Footer.css
|           └── Footer.jsx
|       └── HomePageComponents
|           └── LandingPage.css
|           └── LandingPage.jsx
|           └── LatestArrivals.css
|           └── LatestArrivals.jsx
|       └── NavBar
|           └── Categories.jsx
|           └── MobileNav.jsx
|           └── Nav.css
|           └── Nav.jsx
|           └── Nav.tastid.js
|           └── navUtils.js
|       └── SearchResult
|           └── SearchResult.css
|           └── SearchResult.jsx
|       └── Input.jsx
|   └── contexts
|       └── productsList.js
|   └── constants
|       └── CartContext.js
|       └── GlobalContext.js
|       └── CartContext.js
|       └── ProductContext.js
|       └── UserContext.js
|       └── WishListContext.js
|   └── hooks
|       └── __tests__
|       └── useFetch.js
|   └── pages
|       └── Cart
|       └── Checkout
|       └── Home
|       └── Login
|       └── OrderHistory
|       └── Product
|       └── ProductDetails
|       └── SignUp
|       └── User
|       └── UserProfilePage
|       └── WishList
|   └── util
|       └── __tests__
|       └── createTestIdFilePath.js
|   App.css
|   App.jsx
|   AppWrapper.jsx
|   index.jsx
└── .env
cypress
|   └── fixtures
|   └── integration
|   └── plugins
|   └── support
server
└── src
    └── __tests__
    └── __testUtils__
    └── controllers
        └── categories.js
        └── getOrderHistory.js
        └── login.js
        └── order.js
        └── product.js
        └── signup.js
        └── updateUser.js
        └── user.js
    └── db
        └── connectDB.js
    └── models
        └── Categories.js
        └── Order.js
        └── Product.js
        └── User.js
        └── Users.js
    └── routes
        └── categories.js
        └── login.js
        └── order.js
        └── payment.js
        └── product.js
        └── signup.js
        └── updateUser.js
        └── User.js
    └── util
        └── __tests__
        └── logging.js
        └── validateAllowedFields.js
        └── validateErrorMessage.js
    app.js
    index.js
    testRouter.js
└── .env
```

### 2.1 Client structure

- `public` || public facing client code
- `__tests__` || any `jest` tests for specific components will be in a `__tests__` folder on the same level
- `__testUtils__` || any code that is only being used in the tests is put in the `__testUtils__` folder to separate that away from the rest of the code
- `components` || all of our shared components that are used over multiple pages
- `hooks` || all of our custom hooks
- `pages` || the page components of our app, any routing will go between these components
- `pages/components` || components used specifically on those pages
- `util` || any utility functions that can be used anywhere on the client side
- `index.jsx` || the start point of the client

### 2.2 Cypress structure

- `fixtures` || any data/files that `cypress` needs can be placed here
- `integration` || all of our tests are in here, separated in folders based on the pages in our app
- `plugins` || any plugins for our `cypress` configuration can be placed here
- `support` || custom commands and other support files for `cypress` can be placed here

### 2.3 Server structure

- `__tests__` || any `jest` tests for the api endpoints as that is our testing strategy for the backend
- `__testUtils__` || any code that is only being used in the tests is put in the `__testUtils__` folder to separate that away from the rest of the code
- `controllers` || all of our controller functions that interact with the database
- `db` || all of our configuration for the database
- `models` || all of our `mongoose` models will be placed here
- `routes` || code to match up the API with our controllers
- `util` || any utility functions that can be used anywhere on the server side
- `index.js` || the start point of the server

## 3. Stack / external libraries

The base stack of the app is a MERN stack (Mongoose, Express, React, Node). Next to that we make use of the following extras:

### 3.1 Configuration libraries

- `dotenv` || To load the .env variables into the process environment. See [docs](https://www.npmjs.com/package/dotenv)
- `webpack` / `html-webpack-plugin` || To bundle our React app and create a static app to host. See [docs](https://webpack.js.org/)
- `husky` || To run our tests and linter before committing. See [docs](https://typicode.github.io/husky/#/)
- `eslint` || To check our code. We have different configurations for frontend and backend. You can check out the configuration in the `.eslintrc.(c)js` files in the respective `client` and `server` folders. See [docs](https://eslint.org/)
- `prettier` || To automatically format our code. See [docs](https://prettier.io/)
- `concurrently` || To run commands in parallel. See [docs](https://github.com/open-cli-tools/concurrently#readme)

For more information on how these work together including the automatic deployment to heroku, have a look at our detailed [DEV](./DEV.md) file.

### 3.2 Client-side libraries

- `@testing-library/*` || We use React Testing Library to write all of our tests. See [docs](https://testing-library.com/docs/react-testing-library/intro/)
- `jest` || To run our tests and coverage. See [docs](https://jestjs.io/)
- `jest-fetch-mock` || To mock out the backend for our testing purposes. See [docs](https://github.com/jefflau/jest-fetch-mock#readme)
- `prop-types` || To type-check our components. See [docs](https://github.com/facebook/prop-types)

### 3.3 Server-side libraries

- `nodemon` || To automatically restart the server when in development mode. See [docs](https://nodemon.io/)
- `jest` || To run our tests and coverage. See [docs](https://jestjs.io/)
- `supertest` || To more easily test our endpoints. See [docs](https://github.com/visionmedia/supertest#readme)
- `mongodb-memory-server` || To mock out our database in our backend tests. See [docs](https://github.com/nodkz/mongodb-memory-server)
- `cors` || To open up our API. See [docs](https://github.com/expressjs/cors#readme)
- `mongoose` || To add schemas to our database. See [docs](https://mongoosejs.com/)
