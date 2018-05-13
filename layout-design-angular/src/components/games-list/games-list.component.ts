const template = require('./games-list.html');
const css = require('./games-list.css');
import GamesService, { Game } from '../../games.service';

export class GamesListComponent implements ng.IComponentOptions {
    public controller = GamesListController;
    public template = template;
}

export class GamesListController implements ng.IComponentController {
    public static $inject = ['GamesService'];

    public games: Game[];
    public css = css;

    constructor(public gamesService: GamesService) {
      this.games = gamesService.getAll();
    }

    public addToCart(game: Game) {
        this.gamesService.addToCart(game);
    }

    public removeFromCart(game: Game) {
        this.gamesService.removeFromCart(game);
    }
}
