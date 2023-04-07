import React from "react";
import {TimelineSectionsType} from "Containers/types/sections.type"

const TimelineSections = ({
    title,
    desc,
    children
}: TimelineSectionsType) => {

    return (
        <div className="timeline-sections py-24">
            <div className="head">
                <div className="title text-2xl md:text-7xl text-teal-500 font-semibold font-header">
                <h2>{title}</h2>
                </div>
                <div className="desc text-4xl font-semibold font-header my-10">
                {desc}
                </div>
            </div>
            <div className="content">
                {children}
            </div>
        </div>
    );
}

export default TimelineSections;