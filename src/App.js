import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Home from "./component/Home";
import Movies from "./component/Movies";
import Admin from "./component/Admin";
import OneMovie from "./component/OneMovie";
import Genres from "./component/Genres";
import OneGenre from "./component/OneGenre";
import EditMovie from "./component/EditMovie";
import Login from "./component/Login";
import GraphQL from "./component/GraphQL";
import OneMovieGraphQL from "./component/OneMovieGraphQL";

export default function App() {
    const [jwt, setJwt] = useState("")
    let loginLink

    useEffect(() => {
let t = window.localStorage.getItem("jwt")
        if (t){
            if (jwt === ""){
                setJwt(JSON.parse(t))
            }
        }

    }, []);
    const handleJWTChange = (jwt) => {
        setJwt(jwt)
    }
    const logout = () => {
        setJwt("");
        window.localStorage.removeItem("jwt")
    }

    if (jwt === "") {
        loginLink = <Link  to={"/login"}>Login</Link>
    } else {
        loginLink = <Link  to={"/logout"} onClick={logout}>Logout</Link>
    }

    return (
        <Router>
            <div className="container">
                <div className="row">
                    <div className="col mt-3">
                        <h1 className="mt-3"> GO watch a movie</h1>
                        <hr className="mb-3"/>
                    </div>
                    <div className="col mt-3 text-end">
                        {loginLink}
                        <hr className="mb-3"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <nav>
                            <ul>
                                <li className="list-group-item">
                                    <Link path="/" to="/">Home</Link>
                                </li>
                                <li className="list-group-item">
                                    <Link path="/movies" to="/movies">Movies</Link>
                                </li>
                                <li className="list-group-item">
                                    <Link to="/genres">Genres</Link>
                                </li>
                                { jwt !== "" &&
                                    <>
                                <li className="list-group-item">
                                    <Link to="/admin/movie/0">Add Movie</Link>
                                </li>
                                <li className="list-group-item">
                                    <Link path="/admin" to="/admin">Manage Catalogue</Link>
                                </li>
                                    </>
                                }
                                <li className="list-group-item">
                                    <Link path="/graphql" to="/graphql">Graphql</Link>

                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-md-10">
                        <Switch>
                            <Route path="/movie/:id" component={OneMovie}/>
                            <Route path="/moviesgraphql/:id" component={OneMovieGraphQL}/>

                            <Route path="/movies">
                                <Movies/>
                            </Route>
                            <Route path="/genre/:id" component={OneGenre}/>
                            <Route exact path="/genres">
                                <Genres/>
                            </Route>

                            <Route exact path="/graphql">
                                <GraphQL/>
                            </Route>

                            <Route exact path="/login" component={(props) => <Login {...props} handleJWTChange={handleJWTChange} />}/>


                            <Route path="/admin/movie/:id" component={(props) =>(
                                <EditMovie {...props} jwt={jwt}/>
                            )}/>
                            <Route path="/admin" component={(props) =>(
                                <Admin {...props} jwt={jwt} />
                                )}/>
                            <Route path="/">
                                <Home/>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    );
}
