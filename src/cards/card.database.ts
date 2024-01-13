import Card from "./card.model";

export class CardDao {

    static async findAll(): Promise<Card[]> {
        return Card.findAll();
    }

    static async findOne(id: string): Promise<Card | null> {
        return Card.findByPk(id);
    }

    static async create(cardData: Card): Promise<Card | null> {
        return cardData.save();
    }

    static async findByEmail(email: string): Promise<null | Card> {
        return Card.findOne({ where: { email } });
    }

    static async update(id: string, updateValues: Card): Promise<Card | null> {
        return updateValues.update(id, updateValues);
    }

    static async remove(id: string): Promise<null | void> {
        Card.findByPk(id).then(data => data?.destroy);
    }
}