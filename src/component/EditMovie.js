import {useEffect, useState} from "react";


export default function EditMovie() {
    const [movie, setMovie] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getMovies()

    }, []);

    const getMovies = () => {
    }

    const handleChange = (evt) => {
        let value = evt.target.value;
        let name = evt.target.name;
        setMovie((prevState) => ({
            movie: {
                ...prevState.movie,
                [name]: value,
            }
        }))
    }


    return (
        <>
            <h2>Edit Movie</h2>
            <hr/>
            <form method="post">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={movie.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="release_date" className="form-label">
                        Release date
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="release_date"
                        name="release_date"
                        value={movie.release_date}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="runtime" className="form-label">
                        Runtime
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="runtime"
                        name="runtime"
                        value={movie.runtime}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="mpaa_rating" className="form-label">
                        MPAA Rating
                    </label>
                    <select name="mpaa_rating" id="mpaa_rating"
                            value={movie.mpaa_rating} className="form-select"
                            onChange={handleChange}>
                        <option className="form-select">Choose...</option>
                        <option className="form-select" value="G">G</option>
                        <option className="form-select" value="PG">PG</option>
                        <option className="form-select" value="PG14">PG14</option>
                        <option className="form-select" value="R">R</option>
                        <option className="form-select" value="NC17">NC17</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="rating" className="form-label">
                        Rating
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="rating"
                        name="rating"
                        value={movie.rating}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows="3"
                        value={movie.description}
                        onChange={handleChange}
                    />
                </div>
                <hr/>
                <button className="btn btn-primary">Save</button>
            </form>
            <div className="mb-3">
                <pre>{JSON.stringify(movie, null,3)}</pre>
            </div>

            </>
    )
}
