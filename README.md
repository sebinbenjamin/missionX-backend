# Sample Node project structure

There is no recommended project structure at all for node.js projects. It varies extremely based on the project. However, this repo contains a basic folder structure which could be modified/refactored as the project progresses.

There are definitely many things you can do better or in a more efficient way, but we'll start with this one.

## Structure used

We have the following structure currently.

```
|--src
|  |-config
|  |-constants
|  |-controllers
|  |-middlewares
|  |-routes
|  |-utils
|  |-models
```

## Heroku Deployment Steps (Optional)

1.  Create an account with https://www.heroku.com/
2.  Download and install the Heroku CLI https://devcenter.heroku.com/articles/heroku-cli#download-and-install

        npm install -g heroku
        heroku --version

3.  Run `heroku login` to authenticate the CLI tool
4.  Go to the React project folder and type `heroku create missionx-demo-app-name` command.
5.  Check to see if the Heroku remote is added using `git remote -v`. If not, run `heroku git:remote -a missionx-demo-app-name` to add a remote for heroku.
6.  Add node version to `package.json`.
        "engines": {
          "node": "12.x"
        }
7.  Add environment variable to Heroku https://devcenter.heroku.com/articles/config-vars  
8.  Commit the changes and run `git push heroku master` to deploy changes to Heroku whenever required.
    If you're on a non-master branch, you need to run `git push heroku currentBranchName:master`
9.  Run `heroku logs --tail` to debug any issues.

## References

Heroku Deployment - https://devcenter.heroku.com/categories/deployment

https://dev.to/santypk4/bulletproof-node-js-project-architecture-4epf

https://dev.to/juliest88/how-to-build-rest-api-with-nodejs-express-and-mysql-31jk
