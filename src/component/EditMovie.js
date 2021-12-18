import {useEffect, useState} from "react";
import Input from "./form-components/Input";
import TextArea from "./form-components/TextArea";
import Select from "./form-components/Select";


export default function EditMovie() {
    const [movie, setMovie] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    const mpaaOptions = [
        {value: 'G', id: "G"},
        {value: 'PG', id: "PG"},
        {value: 'PG14', id: "PG14"},
        {value: 'R', id: "R"},
        {value: 'NC17', id: "NC17"}]

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
                    type={"text"}
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
                {/*<div className="mb-3">*/}
                {/*    <label htmlFor="mpaa_rating" className="form-label">*/}
                {/*        MPAA Rating*/}
                {/*    </label>*/}
                {/*    <select name="mpaa_rating" id="mpaa_rating"*/}
                {/*            value={movie.mpaa_rating} className="form-select"*/}
                {/*            onChange={handleChange}>*/}
                {/*        <option className="form-select">Choose...</option>*/}
                {/*        <option className="form-select" value="G">G</option>*/}
                {/*        <option className="form-select" value="PG">PG</option>*/}
                {/*        <option className="form-select" value="PG14">PG14</option>*/}
                {/*        <option className="form-select" value="R">R</option>*/}
                {/*        <option className="form-select" value="NC17">NC17</option>*/}
                {/*    </select>*/}
                {/*</div>*/}
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
                <button className="btn btn-primary">Save</button>
            </form>
            <div className="mb-3">
                <pre>{JSON.stringify(movie, null, 3)}</pre>
            </div>

        </>
    )
}
