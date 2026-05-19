# Battleship Project

A browser-based Battleship game built with vanilla JavaScript, HTML, and CSS. The project supports human and computer players, drag-and-drop ship placement, and a simple smarter AI that targets nearby cells after a successful hit.

[Battleship Demo](https://thatbalddude4.github.io/Battleship/)

## Features
- Human vs Human, Human vs Computer, and Computer vs Computer
- Drag and drop ship placement
- Smart Ai (hunts adjacent cells after a hit)

## AI Simulation
- Built script to run 1000 virtual games
- Compared fully random vs Smart Ai
- Smart Ai won ~68-72% of games (player 1 had slight advantage)

## How to Run
- Any local development server should work. I used VS Code with Live Server.
1. Clone Repo
2. Open project folder in VSCode
3. Install live server if you don't have it
4. Right click index.html -> Open with Live Server
5. It'll open in your browser

## Built with
- Vanilla JS
- HTML & CSS

## Design Goal
- Main design goal was to practice delegation and seperation of concerns

### Achieved by:
- controller: stores the current game state, including players, phase, winner, and placement direction
- dispatcher/actions (modifies controller and handles user input) 
- events (Gets user input, passes parsed input to dispatcher, can't touch render or controller)
- render (Builds and deploys DOM, not allowed to touch actions or controller)

## Learned
- Practiced the Drag and Drop API for interactive ship placement.
- Applied a controller/actions/render architecture at a larger scale than my previous projects.
- Learned how quickly UI state, game state, and user input can become tangled without clear boundaries.
