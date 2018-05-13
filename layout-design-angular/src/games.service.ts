const asscr = require('./assets/asscr.png');
const deponia = require('./assets/deponia.png');
const nwn = require('./assets/nwn.png');
const oddworld = require('./assets/oddworld.png');
const settlers2 = require('./assets/settlers2.png');

const GAMES: Game[] = [
    {
        name: 'Oddworld: Stranger\'s Wrath',
        img: oddworld,
        price: 9.99,
        discount: 0.5,
    },
    {
        name: 'Chaos on Deponia',
        img: deponia,
        owned: true,
    },
    {
        name: 'The Settlers 2: Gold Edition',
        img: settlers2,
        price: 5.99,
    },
    {
        name: 'Neverwinter nights',
        img: nwn,
        price: 4.99,
        discount: 0.5,
    },
    {
        name: "Assasin's creed: Director\'s Cut",
        img: asscr,
        price: 9.99,
    },
];

export type Game = {
    name: string;
    img: string;
    price?: number;
    discount?: number;
    owned?: boolean;
    inCart?: boolean;
};

export default class GamesService {
    private games: Game[] = GAMES;

    public getAll(): Game[] {
        return this.games;
    }

    public addToCart(game: Game) {
        game.inCart = true;
    }

    public removeFromCart(game: Game) {
        game.inCart = false;
    }
}
