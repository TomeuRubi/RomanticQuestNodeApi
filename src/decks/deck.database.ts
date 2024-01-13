import Deck from "./deck.model";

export class DeckDao {

    static async findAll(): Promise<Deck[]> {
        return Deck.findAll();
    }

    static async findOne(id: string): Promise<Deck | null> {
        return Deck.findByPk(id);
    }

    static async create(deckData: Deck): Promise<Deck | null> {
        return deckData.save();
    }

    static async findByEmail(email: string): Promise<null | Deck> {
        return Deck.findOne({ where: { email } });;
    }

    static async update(id: string, updateValues: Deck): Promise<Deck | null> {
        return updateValues.update(id, updateValues);
    }

    static async remove(id: string): Promise<null | void> {
        Deck.findByPk(id).then(data => data?.destroy);
    }
}