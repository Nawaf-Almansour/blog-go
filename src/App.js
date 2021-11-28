 
function App() {
  return (
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
             <a href="/">Home</a>
           </li>
           <li className="list-group-item">
             <a href="/movies">Movies</a>
           </li>
           <li className="list-group-item">
             <a href="/admin">Manage Catalogue</a>
           </li>

         </ul>
       </nav>
        </div>
        <div className="col-md-10">

        </div>
      </div>
    </div>
  );
}

export default App;
