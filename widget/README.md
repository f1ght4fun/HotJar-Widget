# Widget

This is the funnel widget.

Entry point is `/src/index.js`.

## Third Party Libs

- Concurrently (https://www.npmjs.com/package/concurrently) - to be able to start npm scripts in parallel
- Angular Framework (https://angular.io/)
- Angular Material (https://material.angular.io/) - Material Angular Components
- Angular Flex Layout (https://github.com/angular/flex-layout) - Flexbox Angular Directives
- Ngx WebStorage (https://www.npmjs.com/package/ngx-webstorage) - Saving State
- Lodash-ES (https://www.npmjs.com/package/lodash-es) - JS Helper Functions

## Starting up

Install dependencies:

    cd ./widget && npm install
    cd ./widget/src/angular-widget && npm install

## Unit Testing Angular Widget

    cd ./widget/src/angular-widget && ng test --code-coverage

## Running solution with widget:

### Option 1

    a) npm start-ang
       This will serve angular widget on http://localhost:4200 to be able to inject dist artefacts into website as widget
    b)  npm start-websrv
        This will start a web server on [http://localhost:3001](http://localhost:3001)

### Option 2

    npm start
        This will concurrently start both serving Angular widget on 4200 port and static website from web server on 3001
        (Please wait until both servers are up and running)

## Features/Improvements/TODOs

- Replace reading and injecting dist angular artefacts with custom web component (https://angular.io/guide/elements)
- Use SCSS mixins and CSS-Var to beautify and theme css
