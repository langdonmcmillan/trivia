import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const Header = () => {
    return (
        <Menu inverted>
            <Link to="/">
                <Menu.Item>Trivia!</Menu.Item>
            </Link>
        </Menu>
    );
};

export default Header;
