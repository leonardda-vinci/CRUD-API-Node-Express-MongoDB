/**
 * In Express.js, routing methods like 'app.get()', 'app.post()'. etc., can indeed accept multiple callback functions as arguments. This feature allows you to modularize your code and execute different functions in sequence for a particular route.
 */

// When you define a route with multiple callbacks:
app.get("/example", (req, res, next) => {
  console.log("First callback function");
  next();
}),
  (req, res, next) => {
    console.log("Second callback function");
    next();
  },
  (req, res, next) => {
    console.log("Final callback function");
    res.send("Response sent from the final callback");
  };

/**
 * 1. First callback function: It receives 'req', 'res', and 'next' as parameters. 'next' is a function provided by Express.js to pass control to the next middleware function. Here, after logging a message, 'next()' is called to move to the next middleware function
 *
 * 2. Second callback function: It follows the same pattern. It receives 'req', 'res', and 'next', logs a message, and then calls 'next()' to move to the next middleware.
 *
 * 3. Final callback function: This is the last function in the chain. It receives 'req', and 'res' only (because it's the final response handler). Here, it logs a message and sends a response back to the client using 'res.send()'.
 */

// Example: Let's put this in context with a more practical example
const express = require("express");
const app = express();

// Middleware functions
function middlewareOne(req, res, next) {
  console.log("Middleware One");
  next();
}

function middlewareTwo(req, res, next) {
  console.log("Middleware Two");
  next();
}

function finalHandler(req, res) {
  console.log("Final Handler");
  res.send("Hello from Express!");
}

app.get("/example", middlewareOne, middlewareTwo, finalHandler);

app.list(3000, () => {
  console.log("Server is running on http://localhost:3000");
});


/**
 * Explanation of the Example:
 * 1. Middleware One: Logs "Middleware One" and then calls 'next()' to pass control to the next middleware.
 * 
 * 2. Middleware Two: Logs "Middleware Two" and then calls 'next()' to pass control to the final handler.
 * 
 * 3. Final Handler: Logs "Final Handler" and sends a response "Hello from Express!" to the client.
 * 
 * 
 * WHY USE MULTIPLE CALLBACKS?
 * - Using multiple callbacks allows you to break down complex request hadnling into smaller, more manageable pieces. Each middleware function can handle specific aspects of the request or perform cerain checks before passing control to the next function. This promotes modularization, code reusability, and makes your codebase easier to maintan and understand. 
 * 
 * In summary, when defining routes in Express.js, you can pass multiple callback functions. Each function receives 'req', 'res', and 'next' parameters. The 'next()' function is crucial form passing control from one middleware function to the next, ultimately leading to the final response handler.
 */