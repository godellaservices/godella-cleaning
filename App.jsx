import { useState } from 'react';

export default function App() {
  const [quote, setQuote] = useState(null);
  const [form, setForm] = useState({ rooms: '', squareFootage: '', cleaningType: '' });

  const calculateQuote = () => {
    const basePrice = 120;
    const rooms = parseInt(form.rooms || '0');
    const sqft = parseInt(form.squareFootage || '0');
    const type = form.cleaningType;

    let price = basePrice;
    if (rooms > 3) price += (rooms - 3) * 15;
    if (sqft > 1200) price += ((sqft - 1200) / 100) * 5;
    if (type === 'deep') price *= 1.5;

    setQuote(`One-time ${type === 'deep' ? 'Deep Clean' : 'Standard Clean'}: $${price.toFixed(2)}`);
  };

  const discount = (rate) => quote ? `$${(parseFloat(quote.split('$')[1]) * rate).toFixed(2)}` : '$0.00';

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#FAF8F6', minHeight: '100vh', color: '#1E3A5F' }}>
      <header style={{ padding: '1rem', textAlign: 'center', background: '#FAF8F6', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Godella Services</h1>
      </header>
      <main style={{ padding: '2rem', maxWidth: '720px', margin: 'auto' }}>
        <section style={{ background: '#E7EBF0', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
          <h2 style={{ color: '#E2954F' }}>Get an Instant Quote</h2>
          <input placeholder="Square Footage" type="number" onChange={e => setForm({ ...form, squareFootage: e.target.value })} /><br />
          <input placeholder="# of bedrooms" type="number" onChange={e => setForm({ ...form, rooms: e.target.value })} /><br />
          <select onChange={e => setForm({ ...form, cleaningType: e.target.value })}>
            <option value="">Select Cleaning Type</option>
            <option value="standard">Standard Clean</option>
            <option value="deep">Deep Clean</option>
          </select><br />
          <button onClick={calculateQuote} style={{ marginTop: '1rem', backgroundColor: '#E2954F', color: 'white', padding: '0.5rem 1rem' }}>Calculate</button>
          {quote && <p style={{ marginTop: '1rem' }}>{quote}</p>}
        </section>
        <section style={{ background: '#FAF8F6', padding: '1.5rem', borderRadius: '12px' }}>
          <h2 style={{ color: '#E2954F' }}>Membership Plans</h2>
          <ul>
            <li>Weekly - Save 20% - {discount(0.8)}</li>
            <li>Biweekly - Save 10% - {discount(0.9)}</li>
            <li>Monthly - Standard Rate - {discount(1)}</li>
          </ul>
        </section>
        <section style={{ background: '#1E3A5F', color: 'white', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', marginTop: '2rem' }}>
          <h3>Why Choose Us?</h3>
          <p style={{ color: '#E7EBF0' }}>Locally owned, detail-oriented, and committed to quality. Godella Services delivers exceptional service with a modern, stylish touch.</p>
        </section>
      </main>
      <footer style={{ background: '#1E3A5F', color: 'white', padding: '1rem', textAlign: 'center' }}>
        &copy; {new Date().getFullYear()} Godella Services | Pensacola, FL
      </footer>
    </div>
  );
}