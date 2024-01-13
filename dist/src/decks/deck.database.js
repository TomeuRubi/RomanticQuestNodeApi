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
exports.DeckDao = void 0;
const deck_model_1 = __importDefault(require("./deck.model"));
class DeckDao {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return deck_model_1.default.findAll();
        });
    }
    static findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return deck_model_1.default.findByPk(id);
        });
    }
    static create(deckData) {
        return __awaiter(this, void 0, void 0, function* () {
            return deckData.save();
        });
    }
    static findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return deck_model_1.default.findOne({ where: { email } });
            ;
        });
    }
    static update(id, updateValues) {
        return __awaiter(this, void 0, void 0, function* () {
            return updateValues.update(id, updateValues);
        });
    }
    static remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            deck_model_1.default.findByPk(id).then(data => data === null || data === void 0 ? void 0 : data.destroy);
        });
    }
}
exports.DeckDao = DeckDao;
