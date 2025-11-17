import { useState } from "react";

const Login = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  return (
    <>
      <div className="main">
        <h2>Login</h2>
        <div>
          <p>Hello</p>
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(username);
            }}
          >
            <p>
              <span>What would you like to be called? &nbsp;</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input type="submit" />
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
