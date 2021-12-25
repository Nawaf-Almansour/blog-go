import React, {useEffect, useState} from "react";
import Alert from "./ui-components/Alert";
import Input from "./form-components/Input";


export default function Login(props) {
    const [user, setUser] = useState({email: "", password: "" });

    const [error, setError] = useState(null);
    const [errors, setErrors] = useState([]);
    const [alert, setAlert] = useState([{type:"d-none", message:""}]);


  const  handleChange = (evt) => {
        let value = evt.target.value;
        let name = evt.target.name;
      setUser((prevState) => ({
          user: {
              ...prevState.user,
              [name]: value,
          }
      }))
    }
  const  handleSubmit = (evt) => {
        evt.preventDefault();
      const data = new FormData(evt.target)
      const payload = Object.fromEntries(data.entries())
      console.log(payload)
      postUser(payload)
    };

  const  hasError = (key) => {
        return errors.indexOf(key) !== -1;
    }

    const postUser = (user) => {
        let errors = [];
        if (user.email === "") {errors.push("email")}
        if (user.password === "") {errors.push("password")}
        setErrors(errors);

        if (errors.length > 0){return false}

        const req = {
            method: 'POST',
            body :  JSON.stringify(user)
        }
        fetch("http://localhost:4000/v1/signin", req)
            .then((res) => res.json())
            .then(data => {
                if (data.error){
                    setAlert({type: 'alert-danger', message:data.error.message})
                } else {
                    handleJWTChange(Object.values(data)[0]);
                    props.history.push({
                        pathname: "/admin",
                    })
                    setAlert({type: 'alert-success', message:"Login!"})
                }
            }).catch(err => console.error(err))
    }

    const handleJWTChange = (jwt) => {
        props.handleJWTChange(jwt)
    }

    return (
        <>
        <h2>Login</h2>
            <hr />
            <Alert
                alertType={alert.type}
                alertMessage={alert.message}
            />


            <form className="pt-3" onSubmit={handleSubmit}>
                <Input
                    title={"Email"}
                    type={"email"}
                    name={"email"}
                    handleChange={handleChange}
                    className={hasError("email") ? "is-invalid" : ""}
                    errorDiv={hasError("email") ? "text-danger" : "d-none"}
                    errorMsg={"Please enter a valid email address"}
                />

                <Input
                    title={"Password"}
                    type={"password"}
                    name={"password"}
                    handleChange={handleChange}
                    className={hasError("password") ? "is-invalid" : ""}
                    errorDiv={hasError("password") ? "text-danger" : "d-none"}
                    errorMsg={"Please enter a password"}
                />

                <hr />
                <button className="btn btn-primary">Login</button>
            </form>
            {/*<div className="mb-3">*/}
            {/*    <pre>{JSON.stringify(user, null, 3)}</pre>*/}
            {/*</div>*/}




        </>
    )
}
