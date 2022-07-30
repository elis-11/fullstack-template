import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../context/DataProvider";
import { signupApi } from "../helpers/apiCalls";
import '../styles/Auth.scss';


export const Signup = () => {
  const { errors, setErrors } = useDataContext();

  const refName = useRef();
  const refEmail = useRef();
  const refPassword = useRef();

  const navigate = useNavigate();

  const onSignupSubmit = async (e) => {
    e.preventDefault();

    const name = refName.current.value;
    const email = refEmail.current.value;
    const password = refPassword.current.value;

    if (!name || !email || !password) {
      return setErrors("Something went wrong! Try again!");
    }

    const result = await signupApi(name, email, password);
    console.log(result);

    if (result.error) {
      return setErrors(result.error);
    }
    setErrors("");
    navigate("/");

    // console.log("Login at API"); 
  };

  return (
    <div className="Signup">
      <h2>Signup</h2>
      <form onSubmit={onSignupSubmit}>
        <div>
          <input
            type="text"
            ref={refName}
            defaultValue={"elis"}
            placeholder="Name"
          />
        </div>
        <div>
          <input
            type="text"
            ref={refEmail}
            defaultValue={"elis@gmail.com"}
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            ref={refPassword}
            defaultValue="elis"
            placeholder="Password"
          />
        </div>
        <button type="submit">Signup</button>
      </form>
      <div className="errors">{errors}</div>
    </div>
  );
};
