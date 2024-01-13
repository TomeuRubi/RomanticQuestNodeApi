import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Card from './card.model';
import { CardDao } from "./card.database";

export const cardRouter = express.Router()

cardRouter.get("/cards", async (req: Request, res: Response) => {
    try {
        const allCards: Card[] = await CardDao.findAll()

        if (!allCards) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: `No cards at this time..` })
        }

        return res.status(StatusCodes.OK).json({ total_card: allCards.length, allCards })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
    }
});

cardRouter.get("/card/:id", async (req: Request, res: Response) => {
    try {
        const card: Card | null = await CardDao.findOne(req.params.id)

        if (!card) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: `Card not found!` })
        }

        return res.status(StatusCodes.OK).json({ card })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
    }
});

cardRouter.post("/register", async (req: Request, res: Response) => {
    try {
        const { cardname, email, password } = req.body

        if (!cardname || !email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: `Please provide all the required parameters..` })
        }

        const card = await CardDao.findByEmail(email)

        if (card) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: `This email has already been registered..` })
        }

        const newCard = await CardDao.create(req.body)

        return res.status(StatusCodes.CREATED).json({ newCard })

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
    }
});


cardRouter.put('/card/:id', async (req: Request, res: Response) => {

    try {

        const { cardname, email, password } = req.body

        const getCard = await CardDao.findOne(req.params.id)

        if (!cardname || !email || !password) {
            return res.status(401).json({ error: `Please provide all the required parameters..` })
        }

        if (!getCard) {
            return res.status(404).json({ error: `No card with id ${req.params.id}` })
        }

        const updateCard = await CardDao.update((req.params.id), req.body)

        return res.status(201).json({ updateCard })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }
});

cardRouter.delete("/card/:id", async (req: Request, res: Response) => {
    try {
        const id = (req.params.id)

        const card = await CardDao.findOne(id)

        if (!card) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: `Card does not exist` })
        }

        await CardDao.remove(id)

        return res.status(StatusCodes.OK).json({ msg: "Card deleted" })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
    }
});