import React from "react";
import {CircularProgressbar} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function CircularProgressBarVote({value}) {
    return (
        <CircularProgressbar
            value={value}
            text={`${value}%`}
            strokeWidth={10}
            styles={{
                root: {
                    width: "100%",
                },
                path: {
                    stroke: "#18e21b",
                    strokeLinecap: "butt",
                    transition: "stroke-dashoffset 0.5s ease 0s",
                },
                trail: {
                    stroke: "rgb(32,69,41)",
                    strokeLinecap: "butt",
                },
                text: {
                    fill: "black",
                    fontSize: "24px",
                    dominantBaseline: "middle",
                    textAnchor: "middle",
                    fontWeight: "bolder"
                },
            }}
        />
    );
}

export default CircularProgressBarVote;
