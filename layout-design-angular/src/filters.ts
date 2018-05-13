import { Game } from './games.service';
export const gamesPrice = function() {
    return function(games: Game[]) {
        return games.reduce((sum, { price = 0 }) => sum + price, 0);
    };
};