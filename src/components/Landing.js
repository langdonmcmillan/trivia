import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

const Landing = () => {
    return (
        <div>
            <div className="divider" />
            <div className="section">
                <div className="center-align">
                    <Link to={"/new"}>
                        <div className="ui center aligned segment">
                            <Button primary>New Game</Button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Landing;
