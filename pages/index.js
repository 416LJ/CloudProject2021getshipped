import { useState } from "react"
import withSession from "../lib/withSession";
import SiteLayout from '../components/SiteLayout'

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");
  const params = { props: {} };

  if (user) {
    res.setHeader("location", "/dashboard");
    res.statusCode = 302;
    res.end();
    return params;
  }

  return params;
});

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleInput = setState => event => setState(event.target.value);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await fetch("/api/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
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
      <h3>Login</h3>
      <form onSubmit={login}>
        <input placeholder="Email Address" value={email} onChange={handleInput(setEmail)} />
        <input type="password" placeholder="Password" value={password} onChange={handleInput(setPassword)} />
        <button type="submit">Submit</button>
      </form>
      <p>Don't have an account? <a href="/sign-up">Sign Up</a></p>
    </SiteLayout>
  )
}
