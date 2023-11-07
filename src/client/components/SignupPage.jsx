import React, { useState } from 'react';

function SignupPage() {
    // State variables to store user input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedHouse, setSelectedHouse] = useState('');

    // Function to handle form submission
    const handleSignup = (e) => {
      e.preventDefault();
      // signup logic here, like sending a request to an API
      console.log('Signup data:', { email, password, selectedHouse });
    };

    return (
      <>
        <div style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto'  }}>
          <h2>Create an Account</h2>
          <form onSubmit={handleSignup}>
          <div style={{ marginBottom: '10px' }}>
              <label htmlFor="email" style={{ display: 'block' }}>Email:&nbsp;</label>
              <input
                type="email"
                id="email"
                placeholder="email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="password" style={{ display: 'block' }}>Password:</label>
              <input
                type="password"
                placeholder="create a password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="confirmPassword" style={{ display: 'block' }}>Confirm Password:</label>
              <input
                type="password"
                placeholder="retype your password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '10px' }}>Choose a House:</label>
              <div>
                <label>
                  <input
                    type="radio"
                    value="Gryffindor"
                    checked={selectedHouse === 'Gryffindor'}
                    onChange={() => setSelectedHouse('Gryffindor')}
                  />
                  Gryffindor
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    value="Hufflepuff"
                    checked={selectedHouse === 'Hufflepuff'}
                    onChange={() => setSelectedHouse('Hufflepuff')}
                  />
                  Hufflepuff
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    value="Ravenclaw"
                    checked={selectedHouse === 'Ravenclaw'}
                    onChange={() => setSelectedHouse('Ravenclaw')}
                  />
                  Ravenclaw
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    value="Slytherin"
                    checked={selectedHouse === 'Slytherin'}
                    onChange={() => setSelectedHouse('Slytherin')}
                  />
                  Slytherin
                </label>
              </div>
            </div>

            <button className='signup' type="submit">SIGN UP</button>
          </form>
        </div>
      </>
    );
}

export default SignupPage;