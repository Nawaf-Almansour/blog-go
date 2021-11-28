import {useParams} from "react-router";


export default function Movie() {
const id = useParams()
    return (
        <>

            <h2>Movie {id}</h2>

        </>
    )
}
