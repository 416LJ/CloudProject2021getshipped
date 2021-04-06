import { useState, useEffect } from 'react';
import CountrySelect from './CountrySelect';

export default function AddressInput({ onChange }) {
  const [street1, setLine1] = useState("");
  const [street2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");

  useEffect(() => {
    onChange({ street1, street2, city, state, country, zip });
  }, [street1, street2, city, state, country, zip]);

  const handleInput = setState => event => setState(event.target.value);

  return (
    <>
      <input placeholder="Address Line 1" className="large" value={street1} onChange={handleInput(setLine1)} required />
      <input placeholder="Address Line 2" className="large" value={street2} onChange={handleInput(setLine2)} />
      <input placeholder="City" className="large" value={city} onChange={handleInput(setCity)} required />
      <input placeholder="State/Province" className="large" value={state} onChange={handleInput(setState)} required />
      <input placeholder="Zip/Postal Code" className="large" value={zip} onChange={handleInput(setZip)} required />
      <CountrySelect value={country} onChange={handleInput(setCountry)} />
    </>
  )
}
