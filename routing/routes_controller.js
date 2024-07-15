/**
 * 1. "Routes" to forward the supported requests (and any information encoded in request URLs) to the appropriate controller functions.
 *
 * 2. Controller functions to get the requested data from the models, create an HTML page diplaying the data, and return it to the user to view in the browser.
 *
 * 3. Views (templates) used by the controllers to render the data.
 */

/**
 * ROUTER PRIMER
 * - A route is a section of Express code that associates an HTTP verb (GET, POST, PUT, DELETE, etc.), a URL path/pattern, and a function that is called to handle that patterm.
 *
 * - There are several ways to create routes.
 * - express.Router middleware as it allows us to group the route handlers for a particular part of a site together and access them using a common route-prefix. We'll keep all our library-related routes in a "catalog" module, and, if we add routes for handling user accounts or other functions, we can keep them grouped separately.
 */

// DEFINING AND USING SEPARATE ROUTE MODULES
/**
 * The code below provides a concrete example of how we can create a route module and then use it in an Express application.
 *
 * First we create routes for a wifki in a module named wiki.js. The code first imports the Express application object, uses it to get a 'Router' object and then adds couple of routes to it using the 'get()' method. Last of all the module exports the 'Router' object.
 */
//  wiki.js - Wiki route mdule.
const express = require("express");
const router = express.Router();

// Home page route.
router.get("/", (req, res) => {
  res.send("Wiki home page");
});

// About page route.
router.get("/about", (req, res) => {
  res.send("About this wiki");
});

module.exports = router;

/**
 * To use the router module in our main app file we first 'require()' the route module (wiki.js). We then call 'use()' on the Express Application to add the Router to the middleware handling path, specifying a URL path of 'wiki'.
 *
 * The two routes defined in our wiki route module are then accessible from /wiki/ and /wiki/about/
 */
const wiki = require("./wiki.js");
app.use("/wiki", wiki);

/**
 * ROUTE FUNCTIONS
 * - Our module above defines a couple of typical route functions. The "about" route (reproduced below) is defined using the "Router.get()" method, which responds only to HTTP GET requests. The first argument to this methid is the URL path while the second is a callback function that will be invoke if an HTTP GET request with the path is received.
 */
router.get("/about", (req, res) => {
  res.send("About this wiki");
});

/**
 * The callback takes three argumaents (usually named as shown: req, res, next), that will contain the HTTP Request object HTTP response, and the 'next' function in the middleware chain.
 *
 * The callback function here calls 'send()' on the response to return the string "About this wiki" when we receive a GET request with the path ('/about'). here are a number of other response methods for ending the request/response cycle. For example, you call res.json() to send a JSON response of res.sendFile() to send a file. The response mthods that we'll be using most ofthen as we build up the library is render(), which creates and returns HTML files using templates and data.
 */

/**
 * HTTP verbs
 * - The example routes above use the 'Router.get()' methods to respond to HTTP GET requests with a certain path.
 *
 * The 'Router' also provides route methods for all the other HTTP verbs, that are mostly used in exaclty the same way:
 * 1. post()
 * 2. put()
 * 3. delete()
 * 4. options()
 * 5. trace()
 * 6. copy()
 * 7. lock()
 * 8. mkcol()
 * 9. move()
 * 10. purge()
 * 11. propfind()
 * 12. proppatch()
 * 13. unclock()
 * 14. report
 * 15. mkactivity()
 * 16. checkout()
 * 17. merge()
 * 18. m-search()
 * 19. notify()
 * 20. subscribe()
 * 21. unsubscribe()
 * 22. patch()
 * 23. search()
 * 24. connect()
 *
 * For example, the code below behaves just like the previous /about route, but only responds to HTTP POST requests.
 */
router.post("/about", (req, res) => {
  res.send("About this wiki");
});

/**
 * ROUTE PATHS
 * - The route paths define the endpoints at which requests can be made. The examples we've seen so far have just been strings, and are used exactly as written:: '/', '/about', '/book', '/any-random.path'.
 *
 * - Route paths can also be string patterns. String patterns use a form of regular expression syntax to define patterns of endpoints that will be matched. The syntax is listed below(note that the hyphen(-) and the dot (.) are interpreted literally by string-based paths):
 *    a.) ? : The endpoint must have 0 or 1 of the preceding character (or group), e.g. a route path of '/ab?cd' will match endpoints 'acd' or 'abcd'
 *
 *    b.) + : The endpoint must have 1 or mote of the preceding character (or group), e.g. a roue path of '/ab+cd' will match endpoints 'abcd', 'abbcd', 'abbbcd', and so on.
 *
 *    c.) * : The endpoint may have an arbitrary string where the * character is placed. E.g. a route path of '/ab*cd' will match endpoints 'abcd', 'abXcd', 'abSOMErandomTEXTcd', and so on.
 *
 *    d.) () : Grouping match on a set of characters to perform another operation on, e.g. '/ab(cd)?e' will perform a ? -match on the group (cd) --- it will match 'abe' and 'abcde'.
 *
 * - The route paths can also be JavaScript regular expressions. For example, the route path below will match 'catfish' and 'dogfish', but not 'catflap', 'catfishhead', and so on. Note that the path for the regular expression uses regular expression syntax (it is not a quoted string as in the previous cases).
 */
app.get(/.*fish$/, (req, res) => {
  // code blocks
});

/**
 * Route parameters
 * - are named URL segments used to capture values at specific positions in the URL. The named segments are prefixed with a colon and then the name (E.g., /:your_parameter_name/). The captured values are stored in the 'req.params' object using the parameter names as keys (E.g., req.params.your_parameter_name).
 *
 * So for example, consider a URL encoded to contain information about users and books:
 * 'http://localhost:3000/users/34/books/8989'. We can extract this information as shown below, with the 'userId' and 'bookId' path parameters:
 */
app.get("/users/:userId/books/:bookId", (req, res) => {
  // Access userId via: req.params.userId
  // Access bookId via: req.params.bookId
  res.send(req.params);
});

/**
 * HANDLING ERRORS IN THE ROUTE FUNCTIONS
 * - The route functions shown earler all have arguments req and res, which respresent the request and response, respectively. Route functions are also called with a third argument 'next', which can be used to pass errors to the Express middleware chain.
 *
 * - The code below shows how this works, using the example of a database query that takes a callback function, and returns either an error 'err' or some results.
 *
 * - If 'err' is returned, 'next' is called with 'err' as the value in its first parameter (eventually the error propagetes to our global error handling code). On success the desired data is returned and then used in the response.
 */
router.get("/about", (req, res, next) => {
  About.find({}).exec((err, queryResults) => {
    if (err) {
      return next(err);
    }
    // Successful, so render
    res.render("about_view", {
      title: "About",
      list: queryResults,
    });
  });
});

/**
 * HANDLING EXCEPTIONS IN ROUTE FUNCTIONS
 * - The previous section shows how Express expect route functions to return errors. The framework us designed for use with asynchronous functions that take a callback function (with an error and result argument), which is called when the operation completes. That's a problem because later on we will be making Mongoose database queries that use Promise-based APIs, and which may throw exceptions in our route functions (rather that returning errors in a callback).
 *
 * - In order for the framework to properly handle exceptions, they must be caught, and then forwarded as errors as shown in the previous sections.
 *
 * - Re-imagining the simple example from the previous section with 'About.find().exec()' as a database query that returns a promise, we might write the route funtion insidee a 'try...catch' block like this:
 */
exports.get("/about", async (req, res, next) => {
  try {
    const successfulResult = await About.find({}).exec();
    res.render("about_view", {
      title: "About",
      list: successfulResult,
    });
  } catch (err) {
    return next(err);
  }
});

/**
 * That's quite a lot of boilerplate code to add to every function. express-async-handler defines a wrapper function that hide the 'try...catch' block and the code to forward the error. The same example is now very simple, because we only need to write code for the case where we assume success:
 */
// Import the module
const asyncHandler = require("express-async-handler");
exports.get(
  "/about",
  asyncHandle(async (req, res, next) => {
    const successfulResult = await About.find({}).exec();
    res.render("about_view", {
      title: "About",
      list: successfulResult,
    });
  })
);



/**
 * ROUTES NEEDED FOR THE LOCALLIBRARY
 * - The URLs that we're ultimately going to need for our pages are listed below, where object is replaced by the name of each of our models (book, bookinstance, genre, author), objects is the plural of object, and id is the unique instance field(_id) that is given to each Mongoose model instance by default.
 * 
 *      a.) catalog/ - The home/index page.
 *      b.) catalog/<object>/ - The list of all books, bookinstances, genres, or 
 *          authors (e.g. /catalog/books/, /catalog/genres/, etc.)
 *      c.) catalog/<object>/<id> - The detail page for a specific book, bookinstance,
 *          genre, or author (e.g. /catalog/book/create).
 *      d.) catalog/<object>/<id>/update - The form to update a spcific book, bookinstance, genre, or author with the given _id field value (e.g. /catalog/book/584493c1f4887f06c0e67d37/update).
 */
