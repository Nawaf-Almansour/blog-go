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
        const req = {
            method: 'POST',
            body :  JSON.stringify(movie)
        }
        fetch("http://localhost:4000/v1/admin/editmovie", req)
            .then((res) => res.json())
            .then(data => {
                console.log(data)
            })

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
                        type={"text"}
                        name={'title'}
                        value={movie.title}
                        handleChange={handleChange}
                        placeholder={'Title'}
                    />
                    <Input
                        title={" Release date"}
                        type={"date"}
                        name={'release_date'}
                        value={movie.release_date}
                        handleChange={handleChange}
                        placeholder={' Release date'}
                    />
                    <Input
                        title={"Runtime"}
                        type={"text"}
                        name={'runtime'}
                        value={movie.runtime}
                        handleChange={handleChange}
                        placeholder={'Runtime'}
                    />
                    <Select
                        title={"MPAA Rating"}
                        name={'mpaa_rating'}
                        value={movie.rating}
                        handleChange={handleChange}
                        placeholder={'Choose...'}
                        options={mpaaOptions}
                    />
                    <Input
                        title={"Rating"}
                        type={"text"}
                        name={'rating'}
                        value={movie.rating}
                        handleChange={handleChange}
                        placeholder={'Rating'}
                    />
                    <TextArea
                        title={"Description"}
                        name={'description'}
                        rows={3}
                        value={movie.description}
                        handleChange={handleChange}
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
