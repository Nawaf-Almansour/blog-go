import React, {useEffect, useState} from "react";
import Input from './form-components/Input';
import {Link} from "react-router-dom";


export default function Genres() {
    const [movies, setMovies] = useState( [] );
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [alert, setAlert] = useState([{type:"d-none", message:""}]);


    const fetchMovies = () => {
        const payload = `
        {
          list { 
              id
              title
              runtime
              year
              description
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
                return Object.values(data.data.list);
            })
            .then((theList) => {
                setMovies(theList)
            }) .catch((err) => {
            console.log(err)
            setMovies([])
        })
    }


    const handleChange  =  (evt) => {
        let value = evt.target.value;
        setSearchTerm(value)
    }

    useEffect(() => {
        if (searchTerm.length > 0){
            performSearch()
        }else {
            fetchMovies()
        }
    }, [searchTerm])


    function performSearch()  {
        console.log(`searchTerm ------ ${searchTerm}`)
        const payload = `
        {
          search(titleContains: "${searchTerm}") {
              id
              title
              runtime
              year
              description
          }
    }
        `
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "POST",
            body: payload,
            headers: myHeaders,
        }

        fetch("http://localhost:4000/v1/graphql", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                return Object.values(data.data.search);
            })
            .then((theList) => {
                console.log(theList);
                if (theList.length > 0) {
                    setMovies(theList)
                } else {
                    setMovies([])
                }
            })
    }



    return(
        <>
            <h2>GraphQL</h2>
            <hr/>

            <Input
                title={"Search"}
                type={"text"}
                name={"search"}
                value={searchTerm}
                handleChange={handleChange}

            />

            {movies.length === 0 &&
                <h2> movies </h2>
                }
            <div className="list-group">
                {movies.map((m, index) => (
                    <Link key={index} className="list-group-item list-group-item-action"
                    to={`/moviesgraphql/${m.id}`}
                    >
                        <strong>{m.title}</strong>
                        <small>({m.year}) - {m.runtime} minutes</small>
                        <br/>
                        {m.description.slice(0, 80)}...
                    </Link>
                    ))}
            </div>
        </>
    )
}
