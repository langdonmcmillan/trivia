import { SET_GAME_SETTINGS } from "../actions/types";

export default function(settings = {}, action) {
    switch (action.type) {
        case SET_GAME_SETTINGS:
            return action.data;
        default:
            return settings;
    }
}
