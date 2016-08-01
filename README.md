## Itunes Search Application

[Live Demo](https://rnosov.github.io/ItunesSearch/)

##Spec

As a user
I want to be able perform a search query about an artist, album or song
So that I can see a list of artists, albums and/or songs related to my query

Given I am using the search form
When I conduct a search
Then I should be able to see the results returning matching Artists, Albums, and/or Songs
And it should limited to 10 items at a time
And when I scroll down, another 10 items should be revealed.

Given I am using the search form
When I conduct a search
And there are no results
Then I should be notified that there are no results

Given I have a list of results
When I 'favourite' an artist, song or album
Then the favourited item should appear in another list (favourites section).

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs the application

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm test`

Runs tests

### Deploy to GitHub Pages

>Note: this feature is available with `react-scripts@0.2.0` and higher.

First, open your `package.json` and add a `homepage` field.
It could look like this:

```js
{
  "name": "my-app",
  "homepage": "http://myusername.github.io/my-app",
  // ...
}
```

Now, whenever you run `npm run build`, you will see a cheat sheet with a sequence of commands to deploy to GitHub pages:

```sh
git checkout -B gh-pages
git add -f build
git commit -am "Rebuild website"
git push origin :gh-pages
git subtree push --prefix build origin gh-pages
git checkout -
```

You may copy and paste them, or put them into a custom shell script. You may also customize them for another hosting provider.

### License

Copyright © 2016 Roman Nosov. This source code is licensed under the MIT license.
