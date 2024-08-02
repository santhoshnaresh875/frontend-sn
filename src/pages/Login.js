import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


function App() {
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        navigate("/cart")
      ) : (
        <pre>{(formValues, undefined )}</pre>
      )}

      <form onSubmit={handleSubmit} className="body">
        <h1 className="login">Login Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label className="la">Username</label>
            <input
            className="input1"
              type="text"
              name="username"
              placeholder="Username"
              autoComplete="one-time"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.username}</p>
          <div className="field">
            <label className="email">Email</label>
            <input
            className="input2"
              type="text"
              name="email"
              placeholder="Email"
              autoComplete="one-time"
              value={formValues.email}
              onChange={handleChange}

            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label className="la">Password</label>
            <input
            className="input3"
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="one-time"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>
          <button className="fluid ui button blue submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;