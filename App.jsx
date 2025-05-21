import { useState } from 'react';

export default function App() {
  const [quote, setQuote] = useState(null);
  const [form, setForm] = useState({ rooms: '', squareFootage: '', cleaningType: '', frequency: '' });

  const calculateQuote = () => {
    const basePrice = 120;
    const roomCount = parseInt(form.rooms || '0');
    const squareFootage = parseInt(form.squareFootage || '0');
    const cleaningType = form.cleaningType;

    let adjustedPrice = basePrice;
    if (roomCount > 3) adjustedPrice += (roomCount - 3) * 15;
    if (squareFootage > 1200) adjustedPrice += ((squareFootage - 1200) / 100) * 5;
    if (cleaningType === 'deep') adjustedPrice *= 1.5;

    setQuote(`One-time ${cleaningType === 'deep' ? 'Deep Clean' : 'Standard Clean'}: $${adjustedPrice.toFixed(2)}`);
  };

  const getDiscounted = (rate) => {
    if (!quote) return '0.00';
    const base = parseFloat(quote.split('$')[1]);
    return (base * rate).toFixed(2);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', background: '#FAF8F6', color: '#1E3A5F', minHeight: '100vh' }}>
      <header style={{ background: '#FAF8F6', padding: '1rem', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Godella Services</h1>
      </header>
      <main style={{ padding: '2rem', maxWidth: '720px', margin: '0 auto' }}>
        <section style={{ background: '#E7EBF0', padding: '1.5rem', borderRadius: '0.75rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#E2954F', fontSize: '1.25rem', marginBottom: '1rem' }}>Get an Instant Quote</h2>
          <input placeholder="Square Footage" type="number" onChange={e => setForm({ ...form, squareFootage: e.target.value })} /><br />
          <input placeholder="# of bedrooms" type="number" onChange={e => setForm({ ...form, rooms: e.target.value })} /><br />
          <select onChange={e => setForm({ ...form, cleaningType: e.target.value })}>
            <option value="">Select Cleaning Type</option>
            <option value="standard">Standard Clean</option>
            <option value="deep">Deep Clean</option>
          </select><br />
          <button onClick={calculateQuote} style={{ marginTop: '1rem', backgroundColor: '#E2954F', color: '#fff', padding: '0.5rem 1rem' }}>Calculate</button>
          {quote && <p style={{ marginTop: '1rem' }}>{quote}</p>}
        </section>
        <section style={{ background: '#FAF8F6', padding: '1.5rem', borderRadius: '0.75rem' }}>
          <h2 style={{ color: '#E2954F', fontSize: '1.25rem', marginBottom: '1rem' }}>Membership Plans</h2>
          <ul>
            <li>Weekly - Save 20% - ${getDiscounted(0.8)} per visit</li>
            <li>Biweekly - Save 10% - ${getDiscounted(0.9)} per visit</li>
            <li>Monthly - Standard Rate - ${getDiscounted(1.0)} per visit</li>
          </ul>
        </section>
        <section style={{ background: '#1E3A5F', color: 'white', padding: '1.5rem', borderRadius: '0.75rem', marginTop: '2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.25rem' }}>Why Choose Us?</h2>
          <p style={{ color: '#E7EBF0' }}>Locally owned, detail-oriented, and committed to quality. Godella Services delivers exceptional service with a modern, stylish touch.</p>
        </section>
      </main>
      <footer style={{ background: '#1E3A5F', color: 'white', textAlign: 'center', padding: '1rem', marginTop: '3rem' }}>
        &copy; {new Date().getFullYear()} Godella Services | Pensacola, FL
      </footer>
    </div>
  );
}