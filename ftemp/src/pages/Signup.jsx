import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../context/DataProvider";

export const Signup = () => {
  const { setUser, errors, setErrors } = useDataContext();

  const refName=useRef();
  const refEmail = useRef();
  const refPassword = useRef();

  const navigate = useNavigate();

  const onSignupSubmit = async (e) => {
    e.preventDefault();

    // const result = await signupApi(
    //   nameRef.current.value,
    //   emailRef.current.value,
    //   passwordRef.current.value
    // );
    // if (result.error) {
    //   return setErrors(result.error);
    // }
    // console.log(result);
    // setErrors("")
    // setUser(result)

    // navigate('/dashboard');
  };

  return (
    <div className="login">
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
