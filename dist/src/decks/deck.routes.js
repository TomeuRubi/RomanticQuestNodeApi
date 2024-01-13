"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deckRouter = void 0;
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const deck_database_1 = require("./deck.database");
exports.deckRouter = express_1.default.Router();
exports.deckRouter.get("/decks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allDecks = yield deck_database_1.DeckDao.findAll();
        if (!allDecks) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ msg: `No decks at this time..` });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({ total_deck: allDecks.length, allDecks });
    }
    catch (error) {
        console.log(error);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}));
exports.deckRouter.get("/deck/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deck = yield deck_database_1.DeckDao.findOne(req.params.id);
        if (!deck) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: `Deck not found!` });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({ deck });
    }
    catch (error) {
        console.log(error);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}));
exports.deckRouter.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { deckname, email, password } = req.body;
        if (!deckname || !email || !password) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: `Please provide all the required parameters..` });
        }
        const deck = yield deck_database_1.DeckDao.findByEmail(email);
        if (deck) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: `This email has already been registered..` });
        }
        const newDeck = yield deck_database_1.DeckDao.create(req.body);
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({ newDeck });
    }
    catch (error) {
        console.log(error);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}));
exports.deckRouter.put('/deck/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { deckname, email, password } = req.body;
        const getDeck = yield deck_database_1.DeckDao.findOne(req.params.id);
        if (!deckname || !email || !password) {
            return res.status(401).json({ error: `Please provide all the required parameters..` });
        }
        if (!getDeck) {
            return res.status(404).json({ error: `No deck with id ${req.params.id}` });
        }
        const updateDeck = yield deck_database_1.DeckDao.update((req.params.id), req.body);
        return res.status(201).json({ updateDeck });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}));
exports.deckRouter.delete("/deck/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (req.params.id);
        const deck = yield deck_database_1.DeckDao.findOne(id);
        if (!deck) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: `Deck does not exist` });
        }
        yield deck_database_1.DeckDao.remove(id);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "Deck deleted" });
    }
    catch (error) {
        console.log(error);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}));
