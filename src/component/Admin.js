import {useEffect, useState} from "react";
import {Link} from "react-router-dom";


export default function Admin() {
    const [movies, setMovies] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getMovies()

    }, []);

    const getMovies = () => {
        fetch("http://localhost:4000/v1/movies")
            .then((response) => {
                if (response.status !== 200) {
                    let err = new Error("Invalid response code: " + response.status);
                    setError(err)
                }
                return response.json();
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
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <p>Loading...</p>;
    } else {
        return (
            <>
                <h2>Manage Catalogue</h2>
                <hr/>
                <div className="list-group">
                    {movies.map((m) => (
                        <Link
                            key={m.id}
                            className="list-group-item list-group-item-action"
                            to={`/admin/movie/${m.id}`}
                        >
                            {m.title}
                        </Link>
                    ))}
                </div>
            </>
        )
    }
}
