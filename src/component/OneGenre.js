import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";


export default function OneGenre(props) {
    const [genreName, setGenreName] = useState(String);
    const [movies, setMovies] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getMovies()
        setGenreName(props.location.genreName)
    }, []);

    const getMovies = () => {
        fetch("http://localhost:4000/v1/movies/" + props.match.params.id)
            .then((res) => {
                if (res.status !== 200) {
                    let err = new Error("Invalid response code: " + res.status);
                    setError(err)
                }
                return res.json()
            })
            .then((json) => {
                setMovies(json.movies);
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
                <h2>Genres: {genreName}</h2>
                <div className="list-group">
                    {movies.map((m) => (
                        <Link
                            key={m.id}
                            className="list-group-item list-group-item-action"
                            to={`/movie/${m.id}`}>
                            {m.title}
                        </Link>
                    ))}
                </div>
            </>
        )
    }
}
