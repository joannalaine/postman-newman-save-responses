# Save Postman responses to file

## Concepts:

1. For a Postman collection that iterates over a data file, access the values in the data file for each iteration.
2. Save the response body for each iteration to a separate file.

## Description:

This utility uses [Newman](https://learning.postman.com/docs/collections/using-newman-cli/command-line-integration-with-newman/) to run an exported [Postman](https://learning.postman.com/docs/introduction/overview/) collection ( [apod-collection.json](apod-collection.json) ), with a [data file](https://learning.postman.com/docs/collections/running-collections/working-with-data-files/) ( [dates.csv](dates.csv) ), to send requests to the [Astronomy Picture of the Day API](https://api.nasa.gov/), and write the JSON response body to file for each request. To generate the filenames, it pulls values from the data file for each iteration.  
_What the collection does_: For each date in the data file, request the corresponding Astronomy Picture of the Day.

## Requirements:

Node.js: https://nodejs.org  
Newman: https://www.npmjs.com/package/newman  
(Optional) NASA API Key: https://api.nasa.gov

### To run from project root

Install dependencies:  
`npm install`

Run collection:  
`node save-responses.js`

## Learning Resources:

[Postman: How to Write Files to Disk?](https://medium.com/apis-with-valentine/postman-how-to-write-files-to-disk-5ee398624a42)
