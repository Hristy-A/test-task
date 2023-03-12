# Test task

## To start the project follow the steps:
1. Check that actual [node.js](https://nodejs.org/en/) version installed
2. Open project root folder
3. Type `npm ci` in your terminal
4. To run project:
    
    __Development mode:__
    ```sh
    npm run dev
    ```
    This starts app in development mode, rebuilding assets on file changes. 

    __Production mode:__
    ```sh
    npm start
    ```
4.* If you received an error due to a busy port, type in terminal: `npx kill-port 3000`

## Other commands

- build project
    ```sh
    npm run build
    ```
- build project and open dependency info
    ```sh
    npm run build:analyze
    ```
- generate docs
    ```sh
    npm run doc
    ```

- generate docs and launch server for view (default http://localhost:3000)
  ```sh
  npm run doc:view
  ```
