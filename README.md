# Battleship Project

[Battleship Demo](https://thatbalddude4.github.io/Battleship/)

## Features
- Human v Human, Human V Computer, or Computer v Computer
- Drag and drop ship placement
- Smart Ai (hunts adjacent cells after a hit)

## AI Simulation
- Built script to run 1000 virtual games
- Compared fully random vs Smart Ai
- Smart Ai won ~%68-72 of games (player 1 had slight advantage)

## How to Run
- Note any servers/code editor works
1. Clone Repo
2. Open project folder in VSCode
3. Install [live server]() if you don't have it
4. Right click index.html -> Open with Live Server
5. It'll open in your browser

## Built with
- Vanilla JS
- HTML & CSS

## Design Goal
- Main design goal was to practice delegation and seperation of concerns

### Achieved by:
- controller (source of truth, can't touch anything, is purely a source of truth) 
- dispatcher/actions (modifies controller and handles user input) 
- events (Gets user input, passes parsed input to dispatcher, can't touch render or controller)
- render (Builds and deploys DOM, not allowed to touch actions or controller)

## Learned
- Learned Drag and Drop API (for ship placement)
- Project built on patterns i have used in smaller apps but at a larger complexity
