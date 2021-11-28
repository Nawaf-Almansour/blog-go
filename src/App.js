import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  return (
      <Router>
    <div className="container">
      <div className="row">
        <h1 className="mt-3"> GO watch a  movie</h1>
        <hr className="mb-3"/>
      </div>
      <div className="row">
        <div className="col-md-2">
       <nav>
         <ul>
           <li className="list-group-item">
             <Link  path="/" to="/">Home</Link>
           </li>
           <li className="list-group-item">
               <Link  path="/movies" to="/movies">Movies</Link>
           </li>
           <li className="list-group-item">
               <Link  path="/admin" to="/admin">Manage Catalogue</Link>
           </li>

         </ul>
       </nav>
        </div>
        <div className="col-md-10">
        <Switch>
            <Route path="/movies">
                <Movies/>
            </Route>
            <Route path="/admin">
                <Admin/>
            </Route>
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
function Home() {
    return <h2>Home</h2>
}
function Admin() {
    return <h2>Admin</h2>
}
function Movies() {
    return <h2>Movies</h2>
}

