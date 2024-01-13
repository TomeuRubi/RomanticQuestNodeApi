import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Deck from './deck.model';
import { DeckDao } from "./deck.database";

export const deckRouter = express.Router()

deckRouter.get("/decks", async (req: Request, res: Response) => {
    try {
        const allDecks: Deck[] = await DeckDao.findAll()

        if (!allDecks) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: `No decks at this time..` })
        }

        return res.status(StatusCodes.OK).json({ total_deck: allDecks.length, allDecks })
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
})

deckRouter.get("/deck/:id", async (req: Request, res: Response) => {
    try {
        const deck: Deck | null = await DeckDao.findOne(req.params.id)

        if (!deck) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: `Deck not found!` })
        }

        return res.status(StatusCodes.OK).json({ deck })
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
})

deckRouter.post("/register", async (req: Request, res: Response) => {
    try {
        const { deckname, email, password } = req.body

        if (!deckname || !email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: `Please provide all the required parameters..` })
        }

        const deck = await DeckDao.findByEmail(email)

        if (deck) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: `This email has already been registered..` })
        }

        const newDeck = await DeckDao.create(req.body)

        return res.status(StatusCodes.CREATED).json({ newDeck })

    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
})

deckRouter.put('/deck/:id', async (req: Request, res: Response) => {

    try {

        const { deckname, email, password } = req.body

        const getDeck = await DeckDao.findOne(req.params.id)

        if (!deckname || !email || !password) {
            return res.status(401).json({ error: `Please provide all the required parameters..` })
        }

        if (!getDeck) {
            return res.status(404).json({ error: `No deck with id ${req.params.id}` })
        }

        const updateDeck = await DeckDao.update((req.params.id), req.body)

        return res.status(201).json({ updateDeck })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }
})

deckRouter.delete("/deck/:id", async (req: Request, res: Response) => {
    try {
        const id = (req.params.id)

        const deck = await DeckDao.findOne(id)

        if (!deck) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: `Deck does not exist` })
        }

        await DeckDao.remove(id)

        return res.status(StatusCodes.OK).json({ msg: "Deck deleted" })
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
})