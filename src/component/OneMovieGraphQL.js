import React, {useEffect, useState} from "react";

export default function OneMovie(props) {
    const [movie, setMovie] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // const getMovies = () => {
        //     return fetch("http://localhost:4000/v1/movie/" + props.match.params.id)
        //         .then((res) => {
        //             if (res.status !== 200) {
        //                 let err = new Error("Invalid response code: " + res.status);
        //                 setError(err)
        //             }
        //             return res.json()
        //         })
        //         .then((json) => {
        //             setMovie(json.movie);
        //             setIsLoaded(true)
        //         })
        //         .catch((err) => {
        //             setIsLoaded(true)
        //             // setError(err)
        //         });
        // };
        // getMovies();

        fetchMovies();

    }, [props.match.params.id]);

    const fetchMovies = () => {
        const payload = `
        {
          movie(id: ${props.match.params.id}) { 
              id
              title
              runtime
              year
              description
              release_date
              rating
              mpaa_rating
          }
    }
        `

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json")


        const requestOptions = {
            method: "POST",
            body: payload,
            headers: myHeaders,
        }
        fetch("http://localhost:4000/v1/graphql", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setMovie(data.data.movie)
                setIsLoaded(true)
            }) .catch((err) => {
            console.log(err)
        });
    }

    if (movie.genres) {
        movie.genres = Object.values(movie.genres);
    } else {
        movie.genres = [];
    }
    if (error) {
        return (<p>Error : {error.message}</p>)
    } else if (!isLoaded) {
        return (<p>Loading...</p>)
    } else {
        return (
            <>
                <h2>Movie: {movie.title} {movie.year}</h2>
                <div className="float-start">
                    <small>Rating: {movie.mpaa_rating}</small>
                </div>
                <div className="float-end">
                    {movie.genres.map((m, index) => (
                        <span className="badge bg-secondary me-1">
                            {m}
                        </span>
                    ))}
                </div>
                <div className="clearfix"></div>
                <hr/>
                <table className="table table-compact table-striped">
                    <thead></thead>
                    <tbody>
                    <tr>
                        <td>
                            <strong>Title:</strong>
                        </td>
                        <td>{movie.title}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Description:</strong>
                        </td>
                        <td>{movie.description}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Run time:</strong>
                        </td>
                        <td>{movie.runtime} minutes</td>
                    </tr>
                    </tbody>
                </table>
            </>
        )
    }
}
