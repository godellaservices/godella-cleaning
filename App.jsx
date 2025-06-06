import { useState } from 'react';
import './index.css';
import logo from './logo.png'; // Ensure this matches your actual image file name
import { calculateQuote, discount as applyDiscount } from './quoteUtils.js';

export default function App() {
  const [quote, setQuote] = useState(null);
  const [form, setForm] = useState({ rooms: '', squareFootage: '', cleaningType: '' });

  const handleCalculate = () => {
    const rooms = parseInt(form.rooms || '0');
    const sqft = parseInt(form.squareFootage || '0');
    const type = form.cleaningType;

    const price = calculateQuote({ rooms, squareFootage: sqft, cleaningType: type });
    setQuote(`One-time ${type === 'deep' ? 'Deep Clean' : 'Standard Clean'}: $${price.toFixed(2)}`);
  };

  const discount = (rate) => quote ? `$${applyDiscount(parseFloat(quote.split('$')[1]), rate).toFixed(2)}` : '$0.00';

  return (
    <div className="bg-neutral-50 min-h-screen text-gray-900">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <img src={logo} alt="Godella Cleaning Logo" className="h-12" />
        <h1 className="text-xl font-bold text-primary">Godella Cleaning Services</h1>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <section className="bg-secondary p-6 rounded-xl shadow mb-8">
          <h2 className="text-xl font-semibold mb-4 text-white">Get an Instant Quote</h2>
          <input className="input" placeholder="Square Footage" type="number" onChange={e => setForm({ ...form, squareFootage: e.target.value })} /><br />
          <input className="input mt-2" placeholder="# of bedrooms" type="number" onChange={e => setForm({ ...form, rooms: e.target.value })} /><br />
          <select className="input mt-2" onChange={e => setForm({ ...form, cleaningType: e.target.value })}>
            <option value="">Select Cleaning Type</option>
            <option value="standard">Standard Clean</option>
            <option value="deep">Deep Clean</option>
          </select><br />
          <button onClick={handleCalculate} className="mt-4 bg-accent text-white px-4 py-2 rounded">Calculate</button>
          {quote && <p className="mt-4 text-white">{quote}</p>}
        </section>

        <section className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-xl font-semibold text-primary mb-2">Membership Plans</h2>
          <ul className="list-disc pl-6">
            <li>Weekly - Save 20% - {discount(0.8)}</li>
            <li>Biweekly - Save 10% - {discount(0.9)}</li>
            <li>Monthly - Standard Rate - {discount(1)}</li>
          </ul>
        </section>

        <section className="bg-primary text-white p-6 rounded-xl shadow text-center">
          <h3 className="text-lg font-bold">Why Choose Godella?</h3>
          <p className="mt-2">Locally owned, detail-oriented, and committed to quality. Godella Services delivers exceptional cleaning with a modern, stylish touch.</p>
        </section>
      </main>

      <footer className="bg-gray-800 text-white text-center p-4 mt-8">
        &copy; {new Date().getFullYear()} Godella Services | Pensacola, FL
      </footer>
    </div>
  );
}
