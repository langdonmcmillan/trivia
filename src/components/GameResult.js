import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
    Button,
    Segment,
    Divider,
    Message,
    Statistic
} from "semantic-ui-react";
import { bindActionCreators } from "redux";
import { fetchQuestions, resetScore, resetCurrentQuestion } from "../actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
class GameResult extends Component {
    renderContent() {
        if (this.props.currentQuestion < 9) return <Redirect to="/" />;
        return (
            <div className="ui center aligned segment">
                <Message size="huge">
                    <Message.Header className="center">
                        {renderMessage(this.props)}
                    </Message.Header>
                    <Statistic
                        value={this.props.score.toFixed(0)}
                        label="Score"
                    />
                </Message>
                <Link to={"/new"}>
                    <div className="ui center aligned segment">
                        <Button primary>New Game</Button>
                    </div>
                </Link>
            </div>
        );
    }
    render() {
        return this.renderContent();
    }
}

const renderMessage = props => {
    let message = "";
    if (props.score > 800) {
        message = `Great Job, ${props.settings.name}!`;
    } else if (props.score > 600) {
        message = `Nice Job, ${props.settings.name}!`;
    } else if (props.score > 400) {
        message = `I think you can do better, ${props.settings.name}!`;
    } else if (props.score > 200) {
        message = `Trivia isn't for everyone, ${props.settings.name}...`;
    } else {
        message = `I hope this was just for testing, ${props.settings.name}...`;
    }
    return message;
};

const mapStateToProps = state => ({
    settings: state.settings,
    score: state.score,
    currentQuestion: state.currentQuestion
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        { fetchQuestions, resetScore, resetCurrentQuestion },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(GameResult);
