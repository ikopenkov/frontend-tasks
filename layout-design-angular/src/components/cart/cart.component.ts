import GamesService, { Game } from '../../games.service';
const template = require('./cart.html');
const css = require('./cart.css');
const cartIcon = require('./assets/cart-ico.png');

export class CartComponent implements ng.IComponentOptions {
    public controller = CartController;
    public template = template;
}

export class CartController implements ng.IComponentController {
    public static $inject = ['GamesService'];

    public games: Game[];
    public opened = false;
    public css = css;
    public cartIcon = cartIcon;

    constructor(public gamesService: GamesService) {
        this.games = gamesService.getAll();

        // have a trouble to use filters here like this:
        // this.gamesInCart = filterFilter(this.games, { inCart: true });
        // if I do this - variable is filtered but only once on init and it not updated on some item property inCart changed
    }

    public addToCart(game: Game) {
        this.gamesService.addToCart(game);
    }

    public removeFromCart(game: Game) {
        this.gamesService.removeFromCart(game);
    }

    public clearCart() {
        this.games
            .filter(({ inCart }) => inCart)
            .forEach(game => this.gamesService.removeFromCart(game));
    }

    public switchCart(opened: boolean = !this.opened) {
        this.opened = opened;
    }
}
