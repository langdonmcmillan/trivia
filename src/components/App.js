import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Container } from "semantic-ui-react";
import Header from "./Header";
import Landing from "./Landing";
import NewGame from "./NewGame";
import Game from "./Game";
import GameResult from "./GameResult";

class App extends Component {
    render() {
        return (
            <Container>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/new" component={NewGame} />
                        <Route path="/game" component={Game} />
                        <Route path="/result" component={GameResult} />
                    </div>
                </BrowserRouter>
            </Container>
        );
    }
}

export default connect(null, actions)(App);
