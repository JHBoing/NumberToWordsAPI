# NumberToWordsAPI
This is an API that returns the words equivalent to a given number between -99999 and 99999. 

## Requirements

To get this app up and running you need to have both Node.js and npm installed in your system. Or you can run its Dockerfile to run it on a Docker container.

## Installation - Local Machine

To install this app:
- Clone or download this repository;
- Run **npm install** to install dependencies; 
- Use **node index.js** to start the app.

## Installation - Docker

If you choose to use Docker to run this project, you just need to create an image from the Dockerfile and start it with a port of your choosing. 

> docker run -p <chosenPort>:3000 <chosenImageName>

## API Reference

There is only a single API endpoint:

> /:number

In which the route parameter is a number between -99999 and 99999.

For example, if you use the following route:

> localhost:3000/5000

The expected result is:

```
{
    extenso: "5 mil"
}
```

## Running Tests

After installing dependencies you can run tests using:
> npm test