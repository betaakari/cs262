--
-- This SQL script builds a monopoly database, deleting any pre-existing version.
--
-- @author kvlinden
-- @version Summer, 2015 (extended for in-progress games)
--

-- Drop previous versions of the tables if they they exist, in reverse order of foreign keys.
DROP TABLE IF EXISTS PlayerProperty;
DROP TABLE IF EXISTS Property;
DROP TABLE IF EXISTS PlayerGame;
DROP TABLE IF EXISTS Game;
DROP TABLE IF EXISTS Player;

-- Create the schema.

CREATE TABLE Game (
    ID SERIAL PRIMARY KEY,
    time TIMESTAMP NOT NULL,
    isFinished BOOLEAN DEFAULT FALSE
);

CREATE TABLE Player (
    ID SERIAL PRIMARY KEY, 
    emailAddress VARCHAR(50) NOT NULL,
    name VARCHAR(50)
);

CREATE TABLE PlayerGame (
    gameID INTEGER NOT NULL REFERENCES Game(ID), 
    playerID INTEGER NOT NULL REFERENCES Player(ID),
    score INTEGER NOT NULL,
    cash INTEGER NOT NULL,
    position INTEGER NOT NULL,
    PRIMARY KEY (gameID, playerID)
);

CREATE TABLE Property (
    ID SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    purchaseCost INTEGER NOT NULL,
    baseRent INTEGER NOT NULL,
    colorGroup VARCHAR(50),
    boardIndex INTEGER NOT NULL
);

CREATE TABLE PlayerProperty (
    gameID INTEGER NOT NULL REFERENCES Game(ID),
    playerID INTEGER NOT NULL REFERENCES Player(ID),
    propertyID INTEGER NOT NULL REFERENCES Property(ID),
    houses INTEGER NOT NULL DEFAULT 0,
    hotels INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (gameID, propertyID)
);

-- Allow users to select data from the tables.
GRANT SELECT ON Game TO PUBLIC;
GRANT SELECT ON Player TO PUBLIC;
GRANT SELECT ON PlayerGame TO PUBLIC;
GRANT SELECT ON Property TO PUBLIC;
GRANT SELECT ON PlayerProperty TO PUBLIC;

-- Add sample records.

-- One sample game (ID will be 1 because of SERIAL and this being the first insert)
INSERT INTO Game (time, isFinished)
VALUES ('2006-06-27 08:00:00', FALSE);

-- Sample players (IDs will be 1, 2, 3 in this order)
INSERT INTO Player (emailAddress, name) VALUES
    ('me@calvin.edu', 'Me'),
    ('king@gmail.edu', 'The King'),
    ('dog@gmail.edu', 'Dogbreath');

-- Sample properties (IDs will be 1, 2, 3 in this order)
INSERT INTO Property (name, purchaseCost, baseRent, colorGroup, boardIndex) VALUES
    ('Mediterranean Avenue', 60, 2, 'Brown', 1),
    ('Baltic Avenue', 60, 4, 'Brown', 3),
    ('Boardwalk', 400, 50, 'Dark Blue', 39);

-- Sample PlayerGame rows for game 1
-- All players start with $1500; positions are board indexes (0 = GO)
INSERT INTO PlayerGame (gameID, playerID, score, cash, position) VALUES
    (1, 1, 0,    1500, 0),
    (1, 2, 0,    1500, 0),
    (1, 3, 2350, 1500, 5);

-- Sample PlayerProperty rows
-- Give properties to players in game 1 with some houses/hotels
INSERT INTO PlayerProperty (gameID, playerID, propertyID, houses, hotels) VALUES
    (1, 1, 1, 0, 0),  -- Me owns Mediterranean Avenue, no houses/hotels
    (1, 2, 2, 1, 0),  -- The King owns Baltic Avenue, 1 house
    (1, 3, 3, 0, 1);  -- Dogbreath owns Boardwalk, 1 hotel
