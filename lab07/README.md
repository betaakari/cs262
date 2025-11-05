This sample Monopoly database and set of queries is used in Calvin College
CS 262 [lab 7](https://cs.calvin.edu/courses/cs/262/kvlinden/07is/lab.html).

# Lab 07 — Relational Databases (CS 262)

This lab creates and tests relational databases using PostgreSQL.

## Files

- **monopoly.sql** — Builds the Monopoly database schema and adds sample data.  
  Extended to include in-progress game information (cash, properties, houses, hotels, and positions).
- **monopoly-queries.sql** — Sample SQL queries to test the Monopoly database.
- **spj.sql** — Builds the Supplier–Parts–Jobs (SPJ) database schema.
- **spj-queries.sql** — Sample queries for the SPJ database.
- **README.md** — Describes the purpose of this lab and its files.

## Notes
- The Monopoly database was successfully built and tested in PostgreSQL using `psql`.
- `\dt` confirms all five tables (Game, Player, PlayerGame, Property, PlayerProperty) were created.
- No Expo or app code was required for this lab.

## Exercise 7.1 — Extended Monopoly Schema Design

To support saving Monopoly games in progress, the database schema was extended as follows:

**Schema**
Player(ID, emailAddress, name)
Game(ID, time, isFinished)
PlayerGame(gameID, playerID, score, cash, position)
Property(ID, name, purchaseCost, baseRent, colorGroup, boardIndex)
PlayerProperty(gameID, playerID, propertyID, houses, hotels)

scss
Copy code

**Relationships**
- PlayerGame(gameID) → Game(ID)
- PlayerGame(playerID) → Player(ID)
- PlayerProperty(gameID) → Game(ID)
- PlayerProperty(playerID) → Player(ID)
- PlayerProperty(propertyID) → Property(ID)

This design tracks each player’s cash, position, and owned properties (with houses and hotels) so that games in progress can be saved and resumed.
