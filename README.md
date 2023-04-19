# HAIKUS
This project is a tool for writing haikus easily. The client side features a responsive UI that counts the syllables in each word and line (using data from a custom API), and then breaks the text into lines of 5 7 and 5 syllables.  If each line has the correct number of sylables, the words are underlined in green. If not, no problem, click a word and a list of synonyms to choose from will be displayed. You can select a synonym to replace the original word! 

## Technologies used: 
- HTML5, CSS3, ES6
- Fetch and Axios
- Node.js, Express.js
- MongoDB, ReplitDB

## Features
1. Create a node.js server using Express.js
2. Use arrays/objects to store/retrieve info that is displayed in the app
    - haiku array is used to store objects with the word, syllables, and a list of synonyms.
3. Retrieve data from a 3rd party API and use it to display something in your app
    - WordsAPI is used to verify the input of each word, get a list of synonyms, and the number of syllables.
4. Analyze data that is stored in an array of objects
    - WordsAPI data is parsed to filter out any synonyms that are more than one word, and consolidate them into one array

## Instructions for review
1. Go to [Replit](https://replit.com/@drew-sarette/Haikus?v=1)
2. Click Run
3. Write a haiku!
4. to inspect code, click the "show code" <> button

## What I learned
I found using callbacks, promises, and async/await all useful in this project. For a simple Fetch call, async/await makes everything easy to read and understand. Because of the differences between commonJS using require and module.exports, as opposed to the ES syntax, I ended up going with Axios on the server because node-fetch was incompatible with commonJS. As a beginner, I found that using callbacks for the logic made it easier to handle different outcomes since I could more easily see what functions would be called. I understand that chaining promises would ultimately be a better solution, and will be using those in the future.

## Credits
- dcode Using Async/Await with the Fetch API https://youtu.be/Yp9KIcSKTNo
- web dev simplified  Learn Express JS In 35 Minutes https://youtu.be/SccSCuHhOw0
- Paul Sherrif JS REST APIs: Getting Started https://www.pluralsight.com/courses/javascript-rest-apis-getting-started