import { useState } from "react"
import SiteLayout from '../components/SiteLayout'

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const handleInput = setState => event => setState(event.target.value);

  const signUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/sign-up", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name })
      });
      await response.json();
      window.location = "/dashboard";
    } catch(err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return "Loading...";

  return (
    <SiteLayout>
      <h3>Sign Up</h3>
      <p>{error && `Failure: ${error}`}</p>
      <form onSubmit={signUp}>
        <input placeholder="Full Name" value={name} onChange={handleInput(setName)} required />
        <input placeholder="Email Address" value={email} onChange={handleInput(setEmail)} required />
        <input type="password" placeholder="Password" value={password} onChange={handleInput(setPassword)} required />
        <button type="submit">Submit</button>
      </form>
      <p>Already have an account? <a href="/">Login</a></p>
    </SiteLayout>
  )
}
