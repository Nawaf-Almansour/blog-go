import {useEffect, useState} from "react";
import {Link} from "react-router-dom";


export default function Movies() {
    const [movies, setMovies] = useState([]);


    useEffect(() =>{
setMovies([{id: 1, title: "The Shawashank", runtime: 142},
                {id: 2, title: "The Gode", runtime: 142},
                {id: 3, title: "The Dark", runtime: 142},])
    },[movies]);
    return (
    <>

    <h2>Movies</h2>
        <ul>
            {movies.map((m) =>(
                <li key={m.id}>
                    <Link to={`/movie/${m.id}`}>
                        {m.title}
                    </Link>
                </li>
            ))}
        </ul>
</>
    )
}
