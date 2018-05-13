import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Root from 'containers/root/root';

const reactContainer = document.createElement('div');
reactContainer.className = 'app';
document.body.appendChild(reactContainer);

ReactDOM.render(
    <Root />,
    reactContainer,
);
