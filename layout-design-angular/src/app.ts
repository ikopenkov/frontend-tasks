import './index.html';
import * as angular from 'angular';
import GamesService from './games.service';
import MainComponent from './components/main/main.component';
import { GamesListComponent } from './components/games-list/games-list.component';
import { CartComponent } from './components/cart/cart.component';
import { gamesPrice } from './filters';
import 'angular-click-outside';

angular
    .module('app', ['tw.directives.clickOutside'])
    .service('GamesService', GamesService)
    .component('main', new MainComponent())
    .component('gamesList', new GamesListComponent())
    .component('cart', new CartComponent())
    .filter('gamesPrice', gamesPrice);
