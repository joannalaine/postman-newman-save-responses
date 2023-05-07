const newman = require("newman"),
  fs = require("fs"),
  path = require("path"),
  prettier = require("prettier");

// Create a folder to store the response files
const dir = path.join(__dirname, "responses");
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

let responseBody;

// Request an API key from https://api.nasa.gov/#signUp, or use their rate-limited demo key
let apiKey;
if (process.env.APOD_KEY) {
  apiKey = process.env.APOD_KEY;
} else {
  apiKey = "DEMO_KEY";
}

newman
  .run({
    collection: require("./apod-collection.json"),
    reporters: "cli",
    iterationData: "./dates.csv",
    envVar: [{ key: "APOD_KEY", value: `${apiKey}` }],
  })
  .on("request", function (error, args) {
    if (error) {
      console.error(error);
    } else {
      // Store the response body for later
      responseBody = prettier.format(String(args.response.stream), { parser: "json" });
    }
  })
  // After the test step (even if you don't have any tests defined),
  //   the iteration data becomes available in the run summary object
  .on("test", function (error, args) {
    // Get the value from the data record for the current iteration by its key
    let iterationMonth = args.executions[0].result.data.month;
    // Generate a filename using the iteration data value
    const filepath = `./responses/${iterationMonth}.json`;
    // Write the response body to the file
    fs.writeFile(filepath, responseBody, function (error) {
      if (error) {
        console.error(error);
      }
    });
  });
