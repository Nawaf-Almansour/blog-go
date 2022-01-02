import {useEffect, useState} from "react";
import Input from "./form-components/Input";
import TextArea from "./form-components/TextArea";
import Select from "./form-components/Select";
import "./EditMovie.css";
import Alert from "./ui-components/Alert";
import Link from "react-router-dom/es/Link";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';


export default function EditMovie(props) {
    const [movie, setMovie] = useState(
        {id: 0, title: "", description: "", release_date: "", mpaa_rating: "", runtime: "", rating: ""});
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState([]);
    const [alert, setAlert] = useState([{type:"d-none", message:""}]);


    const mpaaOptions = [
        {value: 'G', id: "G"},
        {value: 'PG', id: "PG"},
        {value: 'PG14', id: "PG14"},
        {value: 'R', id: "R"},
        {value: 'NC17', id: "NC17"}]
    const id = props.match.params.id

    useEffect(() => {
        if (props.jwt === ""){
            props.history.push({
                pathname: "/login"
            });
            return;

        }
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
                        id: json.movie.id,
                        title: json.movie.title,
                        description: json.movie.description,
                        release_date: releaseDate.toISOString().split("T")[0],
                        mpaa_rating: json.movie.mpaa_rating,
                        runtime: json.movie.rating,
                        rating: json.movie.description,
                    })
                    console.log(movie)
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
    const postMovie = (payloadMovie) => {
        let errors = [];
        if(payloadMovie.title === ""){errors.push("title")}
        if(payloadMovie.description === ""){errors.push("description")}
        if(payloadMovie.release_date === ""){errors.push("release_date")}
        if(payloadMovie.mpaa_rating === ""){errors.push("mpaa_rating")}
        if(payloadMovie.runtime === ""){errors.push("runtime")}
        if(payloadMovie.rating === ""){errors.push("rating")}
        setErrors(errors)
        if (errors.length > 0){return false}
const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + props.jwt)
            const requestOptions = {
            method: 'POST',
            body :  JSON.stringify(payloadMovie),
            headers: myHeaders
        }
        fetch("http://localhost:4000/v1/admin/editmovie", requestOptions)
            .then((res) => res.json())
            .then(data => {
                if (data.error){
                    setAlert({type: 'alert-danger', message:data.error.message})
                } else {
                    setAlert({type: 'alert-success', message:"Changes saved !"})
                }
            }).catch(err => console.error(err))

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
        console.log(payload)
        postMovie(payload)
    };

    const handleDeleteMovie = (evt) => {
        confirmAlert({
            title: `Delete Movie: ${movie.title}`,
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {deleteMovie()}
                },
                {
                    label: 'No',
                    onClick: () => {
                    }
                }
            ]
        });
    }
    const deleteMovie = () => {
        fetch("http://localhost:4000/v1/admin/deletemovie/" + movie.id , { method: "GET"})
            .then((res) => res.json())
            .then(data => {
                if (data.error){
                    setAlert({type: 'alert-danger', message:data.error.message})
                } else {
                    // setAlert({type: 'alert-success', message:"Changes saved !"})
                    props.history.push({pathname:"/admin"})
                }
            }).catch(err => console.error(err))
    };



    if (error) {
        return (<p>Error : {error.message}</p>)
    } else if (!isLoaded) {
        return (<p>Loading...</p>)
    } else {
        return (
            <>
                <h2>Edit Movie</h2>
                <Alert
                alertType={alert.type}
                alertMessage={alert.message}
                />
                <hr/>
                <form onSubmit={handleSubmit}>
                    <input
                        type="hidden"
                        name="id"
                        id="id"
                        value={movie.id}
                        onChange={handleChange}
                    />
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
                    <Link to={"/admin"} className={"btn btn-warning ms-1"}> Cancel</Link>
                    {movie.id > 0 && (
                    <a href="#!" onClick={() => handleDeleteMovie()} className="btn btn-danger ms-1">Delete</a>
                    )}
                </form>
                {/*<div className="mb-3">*/}
                {/*    <pre>{JSON.stringify(movie, null, 3)}</pre>*/}
                {/*</div>*/}
            </>
        )
    }
}
