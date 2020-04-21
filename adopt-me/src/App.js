import React from 'react';
import {
    render
} from 'react-dom';
import Pet from './Pet';

const App = () => {
    return React.createElement(
        "div", {
            id: "something-important"
        },
        [
            React.createElement("h1", {}, "Adopt Me!"),
            React.createElement(Pet, {
                name: "Luna",
                animal: "Dog",
                breed: "Retriever"
            }),
            React.createElement(Pet, {
                name: "Thomas",
                animal: "Cat",
                breed: "Mixed"
            }),
            React.createElement(Pet, {
                name: "Mithu",
                animal: "Bird",
                breed: "Parrot"
            })
        ]
    );
};

render(React.createElement(App), document.getElementById("root"));