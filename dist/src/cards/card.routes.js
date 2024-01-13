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
exports.cardRouter = void 0;
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const card_database_1 = require("./card.database");
exports.cardRouter = express_1.default.Router();
exports.cardRouter.get("/cards", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCards = yield card_database_1.CardDao.findAll();
        if (!allCards) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ msg: `No cards at this time..` });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({ total_card: allCards.length, allCards });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}));
exports.cardRouter.get("/card/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const card = yield card_database_1.CardDao.findOne(req.params.id);
        if (!card) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: `Card not found!` });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({ card });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}));
exports.cardRouter.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cardname, email, password } = req.body;
        if (!cardname || !email || !password) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: `Please provide all the required parameters..` });
        }
        const card = yield card_database_1.CardDao.findByEmail(email);
        if (card) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: `This email has already been registered..` });
        }
        const newCard = yield card_database_1.CardDao.create(req.body);
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({ newCard });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}));
exports.cardRouter.put('/card/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cardname, email, password } = req.body;
        const getCard = yield card_database_1.CardDao.findOne(req.params.id);
        if (!cardname || !email || !password) {
            return res.status(401).json({ error: `Please provide all the required parameters..` });
        }
        if (!getCard) {
            return res.status(404).json({ error: `No card with id ${req.params.id}` });
        }
        const updateCard = yield card_database_1.CardDao.update((req.params.id), req.body);
        return res.status(201).json({ updateCard });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}));
exports.cardRouter.delete("/card/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (req.params.id);
        const card = yield card_database_1.CardDao.findOne(id);
        if (!card) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: `Card does not exist` });
        }
        yield card_database_1.CardDao.remove(id);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "Card deleted" });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}));
