import { useReducer, useState } from 'react';
import styled from "@emotion/styled";
import { css } from "@emotion/css"
import SiteLayout from "../components/SiteLayout";
import withSession from "../lib/withSession";
import CountrySelect from '../components/CountrySelect';
import AddressInput from '../components/AddressInput';


export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");

  if (user === undefined) {
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  return { props: { user } };
});

const Label = styled.label`
  display: block;
  font-weight: bold;
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 5px;
`;

export default function Dashboard({ user }) {
  const [{
    error,
    loading,
    success
  }, dispatch] = useReducer((state, changes) => ({ ...state, ...changes }), {});

  const [email, setEmail] = useState()
  const [origin, setOrigin] = useState()
  const [destination, setDestination] = useState()
  const [length, setLength] = useState()
  const [width, setWidth] = useState()
  const [height, setHeight] = useState()
  const [weight, setWeight] = useState()

  const handleinput = setState => event => setState(event.target.value)

  const createShipment = async (e) => {
    e.preventDefault();
    dispatch({
      loading: true,
      error: false,
      success: null
    })
  
    try {
      const response = await fetch("/api/shipment", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ origin, destination, length, width, height, weight, email })
      });
      await response.json();
      dispatch({
        error: false,
        success: true
      })
    
    } catch(err) {
      dispatch({
        error: false,
        success: err.message
      })
    } finally {
      dispatch({ loading: false })
    }
  }

  return (
    <SiteLayout>
      Welcome, {user.name} <a href="/api/logout">Logout</a>
      <div>
        <h2 className={css`margin-top: 50px`}>Create Shipment</h2>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {success && <p>Shipment Created!</p>}
        <form onSubmit={createShipment}>
          <Label>Email Address:</Label>
          <input type="email" onChange={handleinput(setEmail)} required />

          <Label>Shipping Origin:</Label>
          <AddressInput onChange={setOrigin} />

          <Label>Shipping Destination:</Label>
          <AddressInput onChange={setDestination} />

          <Label>Parcel Length(cm):</Label>
          <input type="number" value={length} onChange={handleinput(setLength)} className="large" required />

          <Label>Parcel Width(cm):</Label>
          <input type="number" value={width} onChange={handleinput(setWidth)} className="large" step="0.1" required />

          <Label>Parcel Height(cm):</Label>
          <input type="number" value={height} onChange={handleinput(setHeight)} className="large" step="0.1" required />

          <Label>Parcel Weith(g):</Label>
          <input type="number" value={weight} onChange={handleinput(setWeight)} className="large" step="0.1" required />

          <button type="submit">Submit</button>
        </form>
      </div>
    </SiteLayout>
  );
}
