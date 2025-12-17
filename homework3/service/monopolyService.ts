/**
 * This module implements a REST-inspired web service for the Monopoly DB hosted
 * on PostgreSQL for Azure.
 */

import express from 'express';
import pgPromise from 'pg-promise';

// Import types for compile-time checking.
import type { Request, Response, NextFunction } from 'express';
import type { Player, PlayerInput } from './player.js';

// Set up the database
const db = pgPromise()({
    host: process.env.DB_SERVER,
    port: parseInt(process.env.DB_PORT as string) || 5432,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

// Configure the server and its routes
const app = express();
const port: number = parseInt(process.env.PORT as string) || 3000;
const router = express.Router();

router.use(express.json());

// ROUTES
router.get('/', readHello);

router.get('/players', readPlayers);
router.get('/players/:id', readPlayer);
router.post('/players', createPlayer);
router.put('/players/:id', updatePlayer);
router.delete('/players/:id', deletePlayer);

router.get('/games', readGames);

app.use(router);

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction): void => {
    console.error('Error:', err.message);
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, (): void => {
    console.log(`Listening on port ${port}`);
});

// UTILITIES

function returnDataOr404(response: Response, data: unknown): void {
    if (data == null) {
        response.sendStatus(404);
    } else {
        response.send(data);
    }
}

// ENDPOINTS

function readHello(_request: Request, response: Response): void {
    response.send('Hello, CS 262 Monopoly service!');
}

// PLAYERS

function readPlayers(_request: Request, response: Response, next: NextFunction): void {
    db.manyOrNone('SELECT * FROM Player')
        .then((data: Player[]) => response.send(data))
        .catch(next);
}

function readPlayer(request: Request, response: Response, next: NextFunction): void {
    db.oneOrNone('SELECT * FROM Player WHERE id=${id}', request.params)
        .then((data: Player | null) => returnDataOr404(response, data))
        .catch(next);
}

function createPlayer(request: Request, response: Response, next: NextFunction): void {
    db.one(
        'INSERT INTO Player(email, name) VALUES (${email}, ${name}) RETURNING id',
        request.body as PlayerInput
    )
        .then((data: { id: number }) => response.send(data))
        .catch(next);
}

function updatePlayer(request: Request, response: Response, next: NextFunction): void {
    db.oneOrNone(
        'UPDATE Player SET email=${body.email}, name=${body.name} WHERE id=${params.id} RETURNING id',
        { params: request.params, body: request.body as PlayerInput }
    )
        .then((data: { id: number } | null) => returnDataOr404(response, data))
        .catch(next);
}

function deletePlayer(request: Request, response: Response, next: NextFunction): void {
    db.tx((t) => {
        return t.none('DELETE FROM PlayerGame WHERE playerID=${id}', request.params)
            .then(() =>
                t.oneOrNone('DELETE FROM Player WHERE id=${id} RETURNING id', request.params)
            );
    })
        .then((data: { id: number } | null) => returnDataOr404(response, data))
        .catch(next);
}

// GAMES

function readGames(_request: Request, response: Response, next: NextFunction): void {
    db.manyOrNone('SELECT * FROM Game')
        .then((data) => response.send(data))
        .catch(next);
}
