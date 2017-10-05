import React, { Component } from "react";
import {
    Form,
    Dropdown,
    Button,
    Label,
    Segment,
    Divider,
    Message,
    Input
} from "semantic-ui-react";
import { bindActionCreators } from "redux";
import {
    setGameSettings,
    resetCurrentQuestion,
    resetScore,
    resetQuestions
} from "../actions";
import { connect } from "react-redux";

const categories = [
    { key: "1", text: "Animals", value: "27" },
    { key: "2", text: "Art", value: "25" },
    { key: "3", text: "Books", value: "10" },
    { key: "4", text: "Film", value: "11" },
    { key: "5", text: "General", value: "9" },
    { key: "6", text: "Geography", value: "22" },
    { key: "7", text: "History", value: "23" },
    { key: "8", text: "Music", value: "12" },
    { key: "9", text: "Mythology", value: "20" },
    { key: "10", text: "Politics", value: "24" },
    { key: "11", text: "Science", value: "17::18::19::30" },
    { key: "12", text: "Sports", value: "21" },
    { key: "13", text: "Television", value: "14" },
    { key: "14", text: "Video Games", value: "15" }
];

class NewGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name || "",
            difficulty: this.props.difficulty || "medium",
            categories: this.props.categories || [],
            hasError: false
        };
    }
    componentDidMount() {
        this.props.resetCurrentQuestion();
        this.props.resetScore();
        this.props.resetQuestions();
    }
    handleNameChange = (e, { value }) => {
        this.setState({ name: value });
    };

    handleDifficultyChange = (e, { value }) => {
        this.setState({ difficulty: value });
    };

    handleCategoryChange = (e, { value }) => {
        this.setState({ categories: value });
    };

    handleCategoryButton = all => {
        let selectedCategories = all
            ? categories.map(category => category.value)
            : [];
        this.setState({ categories: selectedCategories });
    };

    handleSubmit = () => {
        var error = false;
        if (!this.state.name.length || !this.state.categories.length) {
            error = true;
            this.setState({ hasError: true });
        }
        this.setState({ hasError: error });
        if (!error) {
            const { hasError, ...settings } = this.state;
            this.props.setGameSettings(settings);
            this.props.history.push("/game");
        }
    };
    render() {
        return (
            <Form>
                <Segment>
                    <Label attached="top" size="large">
                        Name
                    </Label>
                    <Form.Field
                        control={Input}
                        value={this.state.name}
                        onChange={this.handleNameChange}
                        placeholder="Name"
                        error={!this.state.name.length && this.state.hasError}
                    />
                    <Message
                        error
                        visible={!this.state.name.length && this.state.hasError}
                    >
                        Name is required
                    </Message>
                </Segment>
                <Segment>
                    <Label attached="top" size="large">
                        Difficulty
                    </Label>
                    <Form.Radio
                        label="Easy"
                        value="easy"
                        checked={this.state.difficulty === "easy"}
                        onChange={this.handleDifficultyChange}
                    />
                    <Form.Radio
                        label="Medium"
                        value="medium"
                        checked={this.state.difficulty === "medium"}
                        onChange={this.handleDifficultyChange}
                    />
                    <Form.Radio
                        label="Hard"
                        value="hard"
                        checked={this.state.difficulty === "hard"}
                        onChange={this.handleDifficultyChange}
                    />
                </Segment>
                <Segment>
                    <Label size="large" attached="top">
                        Categories
                    </Label>
                    <Dropdown
                        placeholder="Categories"
                        fluid
                        multiple
                        selection
                        error={
                            !this.state.categories.length && this.state.hasError
                        }
                        value={this.state.categories || []}
                        onChange={this.handleCategoryChange}
                        options={categories}
                    />
                    <Message
                        error
                        visible={
                            !this.state.categories.length && this.state.hasError
                        }
                    >
                        At least one category is required
                    </Message>
                    <Divider hidden />
                    <Button.Group attached="bottom">
                        <Button
                            basic
                            color="green"
                            onClick={() => this.handleCategoryButton(true)}
                        >
                            Select All
                        </Button>
                        <Button
                            basic
                            color="red"
                            onClick={() => this.handleCategoryButton(false)}
                        >
                            Remove All
                        </Button>
                    </Button.Group>
                </Segment>
                <Button fluid primary onClick={this.handleSubmit}>
                    Play
                </Button>
            </Form>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.settings,
    score: state.score,
    currentQuestion: state.currentQuestion
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        { setGameSettings, resetScore, resetCurrentQuestion, resetQuestions },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(NewGame);
