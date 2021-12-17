import {useEffect, useState} from "react";
import {Link} from "react-router-dom";


export default function Movies() {
    const [movies, setMovies] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        getMovies()

    }, []);

    const getMovies = () => {
        fetch("http://localhost:4000/v1/movies")
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

    return (
        <>

            <h2>Movies</h2>
            {error ? (
                <h2>Error : {error.message}</h2>
            ) : !isLoaded ? (
                    <h2>Loading ...</h2>
                ) :
                <ul>
                    {movies.map((m) => (
                        <li key={m.id}>
                            <Link to={`/movie/${m.id}`}>
                                {m.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            }
        </>
    )
}
