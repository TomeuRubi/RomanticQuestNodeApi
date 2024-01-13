import User from "./user.model";
import bcrypt from "bcryptjs";

export class UserDao {

    static async findAll(): Promise<User[]> {
        return User.findAll();
    }

    static async findOne(id: string): Promise<User | null> {
        return User.findByPk(id);
    }

    static async create(userData: User): Promise<User | null> {
        return userData.save();
    }

    static async findByEmail(email: string): Promise<null | User> {
        return User.findOne({ where: { email } });;
    }

    static async comparePassword(email: string, supplied_password: string): Promise<null | User> {

        const user = await this.findByEmail(email)
        if(user!.password) {
            const decryptPassword = await bcrypt.compare(supplied_password, user!.password);

            if (!decryptPassword) {
                return null;
            }
        } else {
            return null;
        }

        return user
    }

    static async update(id: string, updateValues: User): Promise<User | null> {
        return updateValues.update(id, updateValues);
    }

    static async remove(id: string): Promise<null | void> {
        User.findByPk(id).then(data => data?.destroy);
    }
}