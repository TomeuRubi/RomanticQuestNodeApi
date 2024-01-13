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
exports.UserDao = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserDao {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.default.findAll();
        });
    }
    static findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.default.findByPk(id);
        });
    }
    static create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            return userData.save();
        });
    }
    static findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.default.findOne({ where: { email } });
            ;
        });
    }
    static comparePassword(email, supplied_password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findByEmail(email);
            if (user.password) {
                const decryptPassword = yield bcryptjs_1.default.compare(supplied_password, user.password);
                if (!decryptPassword) {
                    return null;
                }
            }
            else {
                return null;
            }
            return user;
        });
    }
    static update(id, updateValues) {
        return __awaiter(this, void 0, void 0, function* () {
            return updateValues.update(id, updateValues);
        });
    }
    static remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            user_model_1.default.findByPk(id).then(data => data === null || data === void 0 ? void 0 : data.destroy);
        });
    }
}
exports.UserDao = UserDao;
