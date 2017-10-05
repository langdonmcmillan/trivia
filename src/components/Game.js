import React, { Component } from "react";
import {
    Button,
    Segment,
    Divider,
    Message,
    Statistic,
    Icon
} from "semantic-ui-react";
import { bindActionCreators } from "redux";
import {
    fetchQuestions,
    updateScore,
    incrementCurrentQuestion
} from "../actions";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { AllHtmlEntities } from "html-entities";

const entities = new AllHtmlEntities();

const timeAvailable = 20000;

class Game extends Component {
    state = {
        selectedAnswer: "",
        timeRemaining: timeAvailable
    };
    componentDidMount() {
        if (
            this.props.settings == null ||
            Object.getOwnPropertyNames(this.props.settings).length === 0
        ) {
            this.props.history.push("/new");
            return;
        }
        this.props.fetchQuestions(this.props.settings);
        this.timer = setInterval(this.tick, 10);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.questions.length) {
            this.setState({
                timeRemaining: timeAvailable
            });
        }
    }
    tick = () => {
        const timeRemaining = this.state.timeRemaining;

        if (timeRemaining > 0 && this.state.selectedAnswer.length === 0) {
            this.setState({
                timeRemaining: this.state.timeRemaining - 10
            });
        } else if (this.state.selectedAnswer.length === 0) {
            this.setState({ selectedAnswer: "X" });
        }
    };
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    renderQuestion() {
        if (this.props.questions === null) return <NoQuestions />;
        if (this.props.questions.length === 0) return <LoadingMessage />;
        if (this.props.currentQuestion > 9) return <Redirect to="/result" />;
        return (
            <div>
                <Question
                    question={this.props.questions[this.props.currentQuestion]}
                    currentQuestion={this.props.currentQuestion}
                />
                <Answers
                    answers={
                        this.props.questions[this.props.currentQuestion].answers
                    }
                    handleClick={this.handleClick}
                    selectedAnswer={this.state.selectedAnswer}
                />
                <div className="ui center aligned segment">
                    <Segment>
                        <div>
                            Time remaining:{" "}
                            {(this.state.timeRemaining / 1000).toFixed(2)}
                        </div>
                        <div>
                            <ScoreCard score={this.props.score.toFixed(0)} />
                        </div>
                        <div>
                            {this.state.selectedAnswer.length > 0 && (
                                <Button
                                    fluid
                                    primary
                                    onClick={this.handleContinue}
                                >
                                    Continue
                                </Button>
                            )}
                        </div>
                    </Segment>
                </div>
            </div>
        );
    }
    handleContinue = () => {
        this.props.incrementCurrentQuestion();
        this.setState({
            selectedAnswer: "",
            timeRemaining: timeAvailable
        });
    };
    handleClick = (correct, answerLetter) => {
        const scoreToBeAdded =
            (timeAvailable - (timeAvailable - this.state.timeRemaining) / 2) /
            200;
        if (correct) this.props.updateScore(this.props.score + scoreToBeAdded);
        this.setState({ selectedAnswer: answerLetter });
    };
    render() {
        return <div>{this.renderQuestion()}</div>;
    }
}

const Question = props => {
    return (
        <Message>
            <Message.Header>
                Question {props.currentQuestion + 1}
            </Message.Header>
            <Message.Header>Category: {props.question.category}</Message.Header>
            <p>{entities.decode(props.question.text)}</p>
        </Message>
    );
};

const Answers = props => {
    let finalAnswers = [];
    for (let i = 0; i < props.answers.length; i++) {
        finalAnswers.push(
            <Answer
                key={i}
                answerLetter={props.answers[i].answerLetter}
                answerText={entities.decode(props.answers[i].text)}
                correct={props.answers[i].correct}
                handleClick={props.handleClick}
                selectedAnswer={props.selectedAnswer}
            />
        );
    }
    return <Message header="Answers" list={finalAnswers} />;
};

const Answer = props => {
    let colorSelection = null;
    if (props.selectedAnswer.length > 0 && props.correct) {
        colorSelection = "green";
    } else if (!props.correct && props.selectedAnswer === props.answerLetter) {
        colorSelection = "red";
    }
    return (
        <Segment inverted={colorSelection !== null} color={colorSelection}>
            <Button
                primary
                onClick={() =>
                    props.handleClick(props.correct, props.answerLetter)}
                disabled={props.selectedAnswer.length > 0}
            >
                {props.answerLetter}
            </Button>
            <Divider vertical />
            <span style={{ margin: "0 10px" }}>{props.answerText}</span>
        </Segment>
    );
};

const NoQuestions = () => {
    return (
        <div>
            <Message warning>
                <Message.Header>Not Enough Questions</Message.Header>
                <p>
                    There are not enough questions in this category! Please
                    start a new game.
                </p>
            </Message>
            <Link to={"/new"}>
                <div className="ui center aligned segment">
                    <Button primary>New Game</Button>
                </div>
            </Link>
        </div>
    );
};

const ScoreCard = props => {
    return <Statistic value={props.score || 0} label="Score" />;
};

const LoadingMessage = () => (
    <Message size="huge" icon>
        <Icon name="circle notched" loading />
        <Message.Header>Loading Questions</Message.Header>
    </Message>
);

const mapStateToProps = state => ({
    settings: state.settings,
    score: state.score,
    questions: state.questions,
    currentQuestion: state.currentQuestion
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        { fetchQuestions, updateScore, incrementCurrentQuestion },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Game);
