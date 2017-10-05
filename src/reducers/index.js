import { combineReducers } from "redux";
import settingsReducer from "./settingsReducer";
import questionsReducer from "./questionsReducer";
import currentQuestionReducer from "./currentQuestionReducer";
import scoreReducer from "./scoreReducer";

export default combineReducers({
    settings: settingsReducer,
    questions: questionsReducer,
    currentQuestion: currentQuestionReducer,
    score: scoreReducer
});
