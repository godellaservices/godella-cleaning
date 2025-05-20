import { useState } from 'react';

function CleaningServiceSite() {
  const [quote, setQuote] = useState(null);
  const [form, setForm] = useState({ rooms: '', squareFootage: '', cleaningType: '', frequency: '' });

  const calculateQuote = () => {
    const basePrice = 150;
    const roomCount = parseInt(form.rooms || '0');
    const squareFootage = parseInt(form.squareFootage || '0');
    const cleaningType = form.cleaningType;

    let adjustedPrice = basePrice;

    if (roomCount > 3) {
      adjustedPrice += (roomCount - 3) * 20;
    }

    if (squareFootage > 1200) {
      const extraSqFt = squareFootage - 1200;
      adjustedPrice += (extraSqFt / 200) * 15;
    }

    if (cleaningType === 'deep') {
      adjustedPrice *= 1.5;
    }

    setQuote(`One-time ${cleaningType === 'deep' ? 'Deep Clean' : 'Standard Clean'}: $${adjustedPrice.toFixed(2)}`);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1 style={{ color: '#E2954F' }}>Godella Services</h1>
      <h2>Get an Instant Quote</h2>
      <input placeholder="Square Footage" type="number" onChange={e => setForm({ ...form, squareFootage: e.target.value })} /><br />
      <input placeholder="# of bedrooms" type="number" onChange={e => setForm({ ...form, rooms: e.target.value })} /><br />
      <select onChange={e => setForm({ ...form, cleaningType: e.target.value })}>
        <option value="">Select Cleaning Type</option>
        <option value="standard">Standard Clean</option>
        <option value="deep">Deep Clean</option>
      </select><br />
      <button onClick={calculateQuote}>Calculate</button>
      {quote && <p>{quote}</p>}
    </div>
  );
}

export default CleaningServiceSite;
