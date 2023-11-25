import React, { useState } from 'react';

function SignupPage({setToken,setUserId}) {
    // State variables to store user input
    const [name,setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedHouse, setSelectedHouse] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false);  

    const handleSignup = async (e) => {
      e.preventDefault();
      setErrorMessage('');
        // Check if password and confirmPassword match
  if (password !== confirmPassword) {
    setErrorMessage('Passwords do not match');
    return; // Prevent further execution of registration logic
  }

      try {
        const response = await fetch('/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name:`${name}`,
            email:  `${email}`,
            password:  `${password}`,
            house:  `${selectedHouse}`,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Registration successful!', data);
         
          setToken(data.token);
          setUserId(data.user.id);
          setIsRegistrationSuccessful(true);
  setSuccessMessage(`Registration successful! You have been sorted into ${selectedHouse}.`);
        } else {
          const errorMessage = await response.text();
          try {
            const errorObj = JSON.parse(errorMessage);
            setErrorMessage(errorObj.message); // Set error message state
          } catch (error) {
            setErrorMessage(errorMessage);
          }
        }
      } catch (error) {
        console.error('Error registering user:', error);
        setErrorMessage('Error registering user'); // Set error message state
      }
    };    

    return (
      <>
        <div style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto'  }}>
          <h2>Create an Account</h2>
          {errorMessage && <div style={{ color: '#9c1203', fontWeight: 600, marginBottom: '10px' }}>{errorMessage}</div>}
          
          {successMessage && <div style={{ color: 'green', fontWeight: 600, marginBottom: '10px' }}>{successMessage}</div>}
          
          <form onSubmit={handleSignup}>
          <div style={{ marginBottom: '10px' }}>
              <label htmlFor="textInput"style={{ display: 'block' }}>Name:&nbsp;</label>
              <input
                type="text"
                id="name"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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