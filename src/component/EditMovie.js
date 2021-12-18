import {useEffect, useState} from "react";
import Input from "./form-components/Input";
import TextArea from "./form-components/TextArea";
import Select from "./form-components/Select";
import "./EditMovie.css";


export default function EditMovie(props) {
    const [movie, setMovie] = useState(
        {id: 0, title: "", description: "", release_date: "", mpaa_rating: "", runtime: "", rating: ""});
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState([]);


    const mpaaOptions = [
        {value: 'G', id: "G"},
        {value: 'PG', id: "PG"},
        {value: 'PG14', id: "PG14"},
        {value: 'R', id: "R"},
        {value: 'NC17', id: "NC17"}]
    const id = props.match.params.id

    useEffect(() => {
        getMovies()

    }, []);

    const getMovies = () => {
        if (id > 0) {
            fetch("http://localhost:4000/v1/movie/" + id)
                .then((res) => {
                    if (res.status !== 200) {
                        let err = new Error("Invalid response code: " + res.status);
                        setError(err)
                    }
                    return res.json()
                })
                .then((json) => {
                    const releaseDate = new Date(json.movie.release_date);
                    // setMovie(json.movie)
                    setMovie({
                        id: id,
                        title: json.movie.title,
                        description: json.movie.description,
                        release_date: releaseDate.toISOString().split("T")[0],
                        mpaa_rating: json.movie.mpaa_rating,
                        runtime: json.movie.rating,
                        rating: json.movie.description,
                    })
                    setIsLoaded(true)
                })
                .catch((err) => {
                    setIsLoaded(true)
                    // setError(err)
                });
        } else {
           setIsLoaded(true)
        }
    }
    const postMovie = (movie) => {
        let errors = [];
        if(movie.title === ""){errors.push("title")}
        if(movie.description === ""){errors.push("description")}
        if(movie.release_date === ""){errors.push("release_date")}
        if(movie.mpaa_rating === ""){errors.push("mpaa_rating")}
        if(movie.runtime === ""){errors.push("runtime")}
        if(movie.rating === ""){errors.push("rating")}
        setErrors(errors)
        if (errors.length > 0){return false}

            const req = {
            method: 'POST',
            body :  JSON.stringify(movie)
        }
        fetch("http://localhost:4000/v1/admin/editmovie", req)
            .then((res) => res.json())

    }

    const hasError = (key) => {
return errors.indexOf(key) !== -1;
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

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const data = new FormData(evt.target)
        const payload = Object.fromEntries(data.entries())
        postMovie(payload)
    };

    if (error) {
        return (<p>Error : {error.message}</p>)
    } else if (!isLoaded) {
        return (<p>Loading...</p>)
    } else {
        return (
            <>
                <h2>Edit Movie</h2>
                <hr/>
                <form onSubmit={handleSubmit}>
                    <Input
                        title={"Title"}
                        className={hasError("title") ? "is-invalid" : ""}
                        type={"text"}
                        name={'title'}
                        value={movie.title}
                        handleChange={handleChange}
                        placeholder={'Title'}
                        errorDiv={hasError("title") ? "text-danger" : "d-none"}
                        errorMsg={"Please enter a title"}
                    />
                    <Input
                        title={" Release date"}
                        className={hasError("release_date") ? "is-invalid" : ""}
                        type={"date"}
                        name={'release_date'}
                        value={movie.release_date}
                        handleChange={handleChange}
                        placeholder={' Release date'}
                        errorDiv={hasError("release_date") ? "text-danger" : "d-none"}
                        errorMsg={"Please enter a Release date"}
                    />
                    <Input
                        title={"Runtime"}
                        className={hasError("runtime") ? "is-invalid" : ""}
                        type={"text"}
                        name={'runtime'}
                        value={movie.runtime}
                        handleChange={handleChange}
                        placeholder={'Runtime'}
                        errorDiv={hasError("runtime") ? "text-danger" : "d-none"}
                        errorMsg={"Please enter a runtime"}
                    />
                    <Select
                        title={"MPAA Rating"}
                        className={hasError("mpaa_rating") ? "is-invalid" : ""}
                        name={'mpaa_rating'}
                        value={movie.rating}
                        handleChange={handleChange}
                        placeholder={'Choose...'}
                        options={mpaaOptions}
                        errorDiv={hasError("mpaa_rating") ? "text-danger" : "d-none"}
                        errorMsg={"Please enter a mpaa rating"}
                    />
                    <Input
                        title={"Rating"}
                        className={hasError("rating") ? "is-invalid" : ""}
                        type={"text"}
                        name={'rating'}
                        value={movie.rating}
                        handleChange={handleChange}
                        placeholder={'Rating'}
                        errorDiv={hasError("rating") ? "text-danger" : "d-none"}
                        errorMsg={"Please enter a rating"}
                    />
                    <TextArea
                        title={"Description"}
                        className={hasError("description") ? "is-invalid" : ""}
                        name={'description'}
                        rows={3}
                        value={movie.description}
                        handleChange={handleChange}
                        errorDiv={hasError("description") ? "text-danger" : "d-none"}
                        errorMsg={"Please enter a description"}
                    />
                    <hr/>
                    <button on className="btn btn-primary">Save</button>
                </form>
                <div className="mb-3">
                    <pre>{JSON.stringify(movie, null, 3)}</pre>
                </div>
            </>
        )
    }
}
