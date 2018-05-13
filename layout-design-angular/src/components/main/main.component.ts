const template = require('./main.html');
const logo = require('./assets/logo.png');
const mainImg = require('./assets/witcher.png');
const css = require('./main.css');

interface Scope extends ng.IScope {
    [key: string]: any
}

export default class MainComponent implements ng.IComponentOptions {
    public template = template;
    public controller = MainController;
}

export class MainController implements ng.IComponentController {
    public static $inject = ['$scope'];

    constructor(scope: Scope) {
        scope.css = css;
        scope.logo = logo;
        scope.mainImg = mainImg;
    }
}