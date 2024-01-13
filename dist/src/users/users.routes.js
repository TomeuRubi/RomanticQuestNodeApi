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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const user_database_1 = require("./user.database");
exports.userRouter = express_1.default.Router();
exports.userRouter.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield user_database_1.UserDao.findAll();
        if (!allUsers) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ msg: `No users at this time..` });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({ total_user: allUsers.length, allUsers });
    }
    catch (error) {
        console.log(error);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}));
exports.userRouter.get("/user/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_database_1.UserDao.findOne(req.params.id);
        if (!user) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: `User not found!` });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({ user });
    }
    catch (error) {
        console.log(error);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}));
exports.userRouter.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: `Please provide all the required parameters..` });
        }
        const user = yield user_database_1.UserDao.findByEmail(email);
        if (user) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: `This email has already been registered..` });
        }
        const newUser = yield user_database_1.UserDao.create(req.body);
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({ newUser });
    }
    catch (error) {
        console.log(error);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}));
exports.userRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: "Please provide all the required parameters.." });
        }
        const user = yield user_database_1.UserDao.findByEmail(email);
        if (!user) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: "No user exists with the email provided.." });
        }
        const comparePassword = yield user_database_1.UserDao.comparePassword(email, password);
        if (!comparePassword) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: `Incorrect Password!` });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({ user });
    }
    catch (error) {
        console.log(error);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}));
exports.userRouter.put('/user/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const getUser = yield user_database_1.UserDao.findOne(req.params.id);
        if (!username || !email || !password) {
            return res.status(401).json({ error: `Please provide all the required parameters..` });
        }
        if (!getUser) {
            return res.status(404).json({ error: `No user with id ${req.params.id}` });
        }
        const updateUser = yield user_database_1.UserDao.update((req.params.id), req.body);
        return res.status(201).json({ updateUser });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}));
exports.userRouter.delete("/user/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (req.params.id);
        const user = yield user_database_1.UserDao.findOne(id);
        if (!user) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: `User does not exist` });
        }
        yield user_database_1.UserDao.remove(id);
        return res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "User deleted" });
    }
    catch (error) {
        console.log(error);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}));
