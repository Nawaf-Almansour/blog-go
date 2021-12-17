import {useParams} from "react-router";
import {useEffect, useState} from "react";


export default function OneMovie() {
    const [movie, setMovie] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getMovies()

    }, []);

    const getMovies = () => {
        fetch("http://localhost:4000/v1/movie/1")
            .then((res) => {
                if (res.status !== 200) {
                    let err = new Error("Invalid response code: " + res.status);
                    setError(err)
                }
                return res.json()
            })
            .then((json) => {
                setMovie(json.movie);
                setIsLoaded(true)
            })
            .catch((err) => {
                setIsLoaded(true)
                // setError(err)
            });
    }

    return (
        <>

            <h2>Movie: {movie.title} {movie.year}</h2>

            <table className="table table-compact table-striped">
                <thead></thead>
                <tbody>
                <tr>
                    <td>
                        <strong>Title:</strong>
                    </td>
                    <td>{movie.title}</td>
                </tr>
                </tbody>
            </table>

        </>
    )
}
