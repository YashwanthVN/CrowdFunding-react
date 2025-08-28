import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import logo from '../assets/venture_forge.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../components/LoginPage.css';

const currentYear = new Date().getFullYear();

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAuth = async () => {
    if (!email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success('User registered successfully');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('User logged in successfully');
      }
    } catch (error) {
      toast.error(getErrorMsg(error.message));
    } finally {
      setLoading(false);
    }
  };

  const getErrorMsg = (message) => {
    if (message.includes('auth/weak-password')) return 'Password is too weak.';
    if (message.includes('auth/email-already-in-use')) return 'Email already in use.';
    if (message.includes('auth/wrong-password')) return 'Invalid email or password.';
    return 'An error occurred. Please try again.';
  };

  return (
    <div className="login-page">
      <div className="form-logo">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <div className="form-container">
        <h2 className="form-title">{isSignUp ? 'Create your account' : 'Sign in'}</h2>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <input
          type="email"
          placeholder="Email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="input-group">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="toggle-button"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <button
          onClick={handleAuth}
          className={`auth-button ${loading ? 'loading' : ''}`}
          disabled={loading}
        >
          {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
        </button>

        <div className="toggle-link">
          <button onClick={() => setIsSignUp(!isSignUp)} className="link-text">
            {isSignUp ? 'Already have an account? Sign in' : 'Create account'}
          </button>
        </div>
      </div>

      <footer className="footer">
        <p>&copy; {currentYear} VentureForge. All rights reserved.</p>
      </footer>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
