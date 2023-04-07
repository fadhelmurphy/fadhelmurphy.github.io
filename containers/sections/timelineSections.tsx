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
                <div className="title text-2xl md:text-3xl text-teal-500 font-semibold font-header">
                <h2>{title}</h2>
                </div>
                <div className="desc text-4xl font-semibold font-header my-6">
                {desc}
                </div>
            </div>
            <div className="content my-24">
                {children}
            </div>
        </div>
    );
}

export default TimelineSections;