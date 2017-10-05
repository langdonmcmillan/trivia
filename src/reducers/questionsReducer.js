import { FETCH_QUESTIONS, RESET_QUESTIONS } from "../actions/types";

export default function(questions = [], action) {
    switch (action.type) {
        case FETCH_QUESTIONS:
            return action.data;
        case RESET_QUESTIONS:
            return [];
        default:
            return questions;
    }
}
