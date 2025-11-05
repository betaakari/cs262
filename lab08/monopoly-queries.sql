-- CS 262 - Lab 08
-- Monopoly Queries - Exercise 8.1 (single-table queries)

--------------------------------------------------------
-- 1. Retrieve a list of all the games,
--    ordered by date with the most recent game first.
--------------------------------------------------------
SELECT *
FROM Game
ORDER BY time DESC;

--------------------------------------------------------
-- 2. Retrieve all the games that occurred in the past week.
--------------------------------------------------------
SELECT *
FROM Game
WHERE time >= CURRENT_DATE - INTERVAL '7 days'
ORDER BY time DESC;

--------------------------------------------------------
-- 3. Retrieve a list of players who have (non-NULL) names.
--------------------------------------------------------
SELECT *
FROM Player
WHERE name IS NOT NULL;

--------------------------------------------------------
-- 4. Retrieve a list of IDs for players who have
--    some game score larger than 2000.
--------------------------------------------------------
SELECT DISTINCT playerID
FROM PlayerGame
WHERE score > 2000;

--------------------------------------------------------
-- 5. Retrieve a list of players who have GMail accounts.
--------------------------------------------------------
SELECT *
FROM Player
WHERE emailAddress ILIKE '%@gmail.com';

--------------------------------------------------------
-- Exercise 8.2 - Multi-table queries
--------------------------------------------------------

--------------------------------------------------------
-- 1. Retrieve all “The King”’s game scores in decreasing order.
--    Uses Player and PlayerGame tables.
--------------------------------------------------------
SELECT PG.score
FROM Player P
JOIN PlayerGame PG ON P.id = PG.playerID
WHERE P.name = 'The King'
ORDER BY PG.score DESC;

--------------------------------------------------------
-- 2. Retrieve the name of the winner of the game played on
--    2006-06-28 13:20:00.
--    Winner = player with the highest score in that game.
--------------------------------------------------------
SELECT P.name
FROM Game G
JOIN PlayerGame PG ON G.id = PG.gameID
JOIN Player P ON PG.playerID = P.id
WHERE G.time = '2006-06-28 13:20:00'
ORDER BY PG.score DESC
LIMIT 1;

--------------------------------------------------------
-- 3. What does the P1.ID < P2.ID clause do in a self-join query?
--
--    It prevents duplicate pairs and self-pairing:
--      - avoids matching a row with itself
--      - ensures each pair appears only once
--------------------------------------------------------

--------------------------------------------------------
-- 4. Realistic example of a self-join:
--
--    In an Employee table where each employee has a managerID,
--    you could join the table to itself to list each employee
--    along with their manager’s name:
--
--    SELECT E.name AS employee, M.name AS manager
--    FROM Employee E
--    JOIN Employee M ON E.managerID = M.id;
--------------------------------------------------------
