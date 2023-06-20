// Import the required dependencies and styles
import "./login.scss";
import { Navigate, useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';

// Define the Login component
const Login = () => {
  // Initialize the navigate function from the React Router DOM
  const navigate = useNavigate();

  // Define state variables using the useState hook
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [success, setSuccess] = useState(false);
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make the axios POST request with user and pwd variables
      const response = await axios.post('https://rm-pubs-lpmp9.ondigitalocean.app/api/auth/signin', {
        user_phone: user,
        user_password: pwd
      });
  
      // Handle the response accordingly
      console.log(response.data); // Log the response data or perform any other actions
      if (response.status === 200) {
        setSuccess(true);
        localStorage.setItem('accessToken', response.data.accessToken);
      }
    } catch (error) {
      console.error(error); // Log any errors that occurred during the request
      document.getElementById('phone').classList.add('redInputError');
      document.getElementById('password').classList.add('redInputError');

    }

    setUser('');
    setPwd('');
  };

  // Render the JSX

  return (
    <>
      {success ? (
        navigate("/dashboard")
      ) : (
        <main className="login">
          <div className="container">
            <section className="wrapper">
              <div className="heading">
                <h1 className="text text-large">Sign In</h1>
              </div>
              <form onSubmit={handleSubmit} className="form">
                <div className={`input-control`}>
                  <label htmlFor="phone" className="input-label" hidden>
                    Phone
                  </label>
                  <input
                    className="input-field"
                    type="tel"
                    id="phone"
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    placeholder="Phone"
                  />
                </div>
                <div className={`input-control`}>
                  <label htmlFor="password" className="input-label" hidden>
                    Password
                  </label>
                  <input
                    className="input-field"
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    placeholder="Password"
                  />
                </div>
                <div className="input-control">
                  <button className="input-submit">Sign In</button>
                </div>
              </form>
            </section>
          </div>
        </main>
      )}
    </>
  );

};

export default Login;
