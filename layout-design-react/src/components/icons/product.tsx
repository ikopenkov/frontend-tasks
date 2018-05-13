import * as React from 'react';

export default (props: React.HTMLAttributes<SVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        version="1.1"
        {...props}
    >
        <g id="surface1">
            <path d="M 1 3 L 1 15 L 49 15 L 49 3 Z M 3 17 L 3 48 L 47 48 L 47 17 Z M 17.5 20 L 32.5 20 C 33.882813 20 35 21.117188 35 22.5 C 35 23.882813 33.882813 25 32.5 25 L 17.5 25 C 16.117188 25 15 23.882813 15 22.5 C 15 21.117188 16.117188 20 17.5 20 Z " />
        </g>
    </svg>
);
