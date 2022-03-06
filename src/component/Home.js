import React from "react";

import Ticket from "./../images/movie_tickets.jpg"
import "./Home.css"

export default function Home() {
    return (
        <>
            <div className="text-center">
                <h2>Home</h2>
                <hr/>
                <img src={Ticket} alt="movie ticket"/>
                <hr/>
                <div className="tickets"></div>
            </div>
        </>
    )
}
