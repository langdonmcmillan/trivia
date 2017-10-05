import * as types from "../actions/types";

export default function(settings = 0, action) {
    switch (action.type) {
        case types.UPDATE_SCORE:
            return action.data;
        case types.RESET_SCORE:
            return 0;
        default:
            return settings;
    }
}
