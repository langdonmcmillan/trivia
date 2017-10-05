import * as types from "./types";
import axios from "axios";

export const setGameSettings = settings => {
    return dispatch => {
        dispatch({
            type: types.SET_GAME_SETTINGS,
            data: settings
        });
    };
};

export const fetchQuestions = settings => async dispatch => {
    const categories = _formatCategories(settings.categories);
    const rawQuestions = await _getQuestions(categories, settings.difficulty);

    const questions = rawQuestions.map(question => {
        return {
            text: question.question,
            category: question.category,
            answers: getAnswers(question)
        };
    });
    dispatch({
        type: types.FETCH_QUESTIONS,
        data: questions.length > 0 ? questions : null
    });
};

const getAnswers = question => {
    const correctAnswer = Object.assign(
        {},
        { text: question.correct_answer, correct: true }
    );
    const incorrectAnswers = question.incorrect_answers.map(answer =>
        Object.assign({}, { text: answer, correct: false })
    );
    const allAnswers = incorrectAnswers.concat(correctAnswer);
    const letters = ["A", "B", "C", "D"];
    const randomized = [].concat
        .apply([], allAnswers)
        .sort(() => 0.5 - Math.random());
    const finalAnswers = randomized.map((answer, i) => {
        return { ...answer, answerLetter: letters[i] };
    });
    return finalAnswers;
};

export const resetQuestions = () => {
    return dispatch =>
        dispatch({
            type: types.RESET_QUESTIONS
        });
};

const _formatCategories = categories => {
    const unformattedArrays = categories.map(category => {
        return category.split("::");
    });
    return [].concat.apply([], unformattedArrays);
};

const _getQuestions = async (categories, difficulty) => {
    const questions = await Promise.all(
        categories.map(category =>
            axios.get(
                `https://opentdb.com/api.php?amount=${Math.ceil(
                    30 / categories.length
                )}&difficulty=${difficulty}&type=multiple&category=${category}`
            )
        )
    );
    const randomized = [].concat
        .apply([], questions.map(q => q.data.results))
        .sort(() => 0.5 - Math.random());
    return randomized.slice(0, 10);
};

export const incrementCurrentQuestion = () => {
    return dispatch =>
        dispatch({
            type: types.INCREMENT_CURRENT_QUESTION
        });
};

export const resetCurrentQuestion = () => {
    return dispatch =>
        dispatch({
            type: types.RESET_CURRENT_QUESTION
        });
};

export const updateScore = value => {
    return dispatch => dispatch({ type: types.UPDATE_SCORE, data: value });
};

export const resetScore = value => {
    return dispatch => dispatch({ type: types.RESET_SCORE });
};
