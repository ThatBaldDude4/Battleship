# UI / Rendering 

- This project uses controller.view to decide what to render
- controller.view acts as a label for the current game state
- main `render()` function reads view and calls the apporitate helper functions based off views value
- UI functions should render DOM elements only. They should not decide game rules or mutate core game state.

## render
- Takes payload object as argument
- Payload structure expect to look like: {players, root, view}
- Based off view calls apporiate helper function and passes down players/root as needed
- returns nothing

## createBoard
- Takes "board" 2d array as argument
- Loops over array, then loops over inner array
- Builds html string for each item in array
- Innermost array item expected to look like: {ship: null/ship, isHit: true/false}
- Checks wether each item has a ship / what value isHit is based off said value change what class name gets added to the html string
- Used to turn 2d array in DOM elements used for UI
- Returns HTML string

## renderPlayersBoards
- Takes a players object and a root html node as arguments
- uses `createBoard()` to get html string
- Queries the document for the `#player1-ships` and `#player2-ships` containers.
- Sets each query containers innerHTML to html string from `createBoard()`
- Returns nothing

## renderHome
- Takes a root html node argument
- Sets roots innerHTML to form
- Form is for choosing player type (ie human or computer)
- returns nothing

## renderShipPlacement
- Takes players object as argument
- Query's document for player1-ships & player2-ships container
- If player object in players has a playerType equal to "human" build ships html and append to player ship container
- This adds the "ships" as DOM elements used for visual and drag and drop purposes
- returns nothing

## renderWinner
- Takes root HTML node argument
- Sets roots innerHTML to a <h1> string
- Still in development
- returns nothing