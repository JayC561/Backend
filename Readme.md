## This is the backend repository of the project (also contains the production build of frontend)

### The Process
Firstly, I parsed the CSV file and saved that file into a .json file using fs (file system) library in node. when the file was parsed, I added the code for API. In the API, for every first request the server evaluate it, saves the output into a variable and sends the data to frontend and for every subsequent requests the server sends the cached copy of data.

#### Libraries used:
- [csv-parser](https://www.npmjs.com/package/csv-parser)
- [express](https://www.npmjs.com/package/express)
- [cors](https://www.npmjs.com/package/cors)

#### csv-parser
csv-parser was used to parse csv file into JavaScript objects which can be easily used in the application

#### express.js
express.js was used to make API and send JSON data according to the route

#### cors
cors package was used a middleware in express.js to enable cross-origin requests
