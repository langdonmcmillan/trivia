import * as types from "../actions/types";

export default function(current = 0, action) {
    switch (action.type) {
        case types.INCREMENT_CURRENT_QUESTION:
            return current + 1;
        case types.RESET_CURRENT_QUESTION:
            return 0;
        default:
            return current;
    }
}
