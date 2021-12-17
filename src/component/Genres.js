import {useEffect, useState} from "react";
import {Link} from "react-router-dom";



export default function Genres() {
    const [genres, setGenres] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
    getGenres()

}, []);

const getGenres = () => {
    fetch("http://localhost:4000/v1/genres")
        .then((res) => {
            if (res.status !== 200) {
                let err = new Error("Invalid response code: " + res.status);
                setError(err)
            }
            return res.json()
        })
        .then((json) => {
            setGenres(json.genres);
            setIsLoaded(true)
        })
        .catch((err) => {
            setIsLoaded(true)
            // setError(err)
        });
}

    if (error) {
        return (<p>Error : {error.message}</p>)
    } else if (!isLoaded) {
        return (<p>Loading...</p>)
    } else {
        return (
            <>
                <h2>Genres</h2>
<ul>
    {genres.map((m) =>(
        <li key={m.id}>
            <Link to={`/genre/${m.id}`}>
                {m.genre_name}
            </Link>
        </li>
    ))}
</ul>
            </>
        )
    }
}
