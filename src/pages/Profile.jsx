import { useState } from 'react';
import Button from '../components/common/Button';
import './Profile.css';

function Profile() {
  const [section, setSection] = useState('overview');

  const renderContent = () => {
    switch (section) {
      case 'overview':
        return <OverviewSection />;
      case 'orders':
        return <OrdersSection />;
      case 'wishlist':
        return <WishlistSection />;
      case 'addresses':
        return <AddressesSection />;
      case 'payments':
        return <PaymentsSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return null;
    }
  };

  const handleLogout = () => {
    // TODO: perform logout action
    alert('Logged out');
  };

  return (
    <main className="profile-page">
      <div className="container profile-page__dashboard">
        <aside className="profile-page__sidebar">
          <nav>
            <ul>
              <li
                className={section === 'overview' ? 'active' : ''}
                onClick={() => setSection('overview')}
              >
                Overview
              </li>
              <li
                className={section === 'orders' ? 'active' : ''}
                onClick={() => setSection('orders')}
              >
                Orders
              </li>
              <li
                className={section === 'wishlist' ? 'active' : ''}
                onClick={() => setSection('wishlist')}
              >
                Wishlist
              </li>
              <li
                className={section === 'addresses' ? 'active' : ''}
                onClick={() => setSection('addresses')}
              >
                Addresses
              </li>
              <li
                className={section === 'payments' ? 'active' : ''}
                onClick={() => setSection('payments')}
              >
                Payments
              </li>
              <li
                className={section === 'settings' ? 'active' : ''}
                onClick={() => setSection('settings')}
              >
                Settings
              </li>
              <li className="logout" onClick={handleLogout}>
                Logout
              </li>
            </ul>
          </nav>
        </aside>
        <section className="profile-page__content">{renderContent()}</section>
      </div>
    </main>
  );
}

// ----- section components -----

function OverviewSection() {
  const [info, setInfo] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // save profile info
    console.log('saved', info);
  };

  return (
    <div className="profile-section">
      <h2>Basic Information</h2>
      <div className="profile-section__avatar">
        <img
          src="https://via.placeholder.com/120"
          alt="Profile"
          className="avatar-img"
        />
        <Button variant="outline" size="sm">
          Change
        </Button>
      </div>
      <form className="profile-section__form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={info.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={info.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={info.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label>Gender</label>
          <select
            name="gender"
            value={info.gender}
            onChange={handleChange}
          >
            <option value="">Prefer not to say</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-row">
          <label>Date of birth</label>
          <input
            type="date"
            name="dob"
            value={info.dob}
            onChange={handleChange}
          />
        </div>
        <Button type="submit" variant="primary" size="md">
          Save
        </Button>
      </form>
    </div>
  );
}

function OrdersSection() {
  // mock data
  const orders = [
    { id: '2345', date: '2025-12-01', status: 'Delivered', total: 79.99 },
    { id: '2346', date: '2026-01-15', status: 'Shipped', total: 159.49 },
  ];

  return (
    <div className="profile-section">
      <h2>Order History</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order #</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.date}</td>
              <td>{o.status}</td>
              <td>${o.total}</td>
              <td>
                <Button variant="outline" size="sm">
                  Track
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function WishlistSection() {
  const items = [
    { id: 'a1', name: 'Fancy Lamp' },
    { id: 'b2', name: 'Cozy Blanket' },
  ];

  return (
    <div className="profile-section">
      <h2>Saved Items</h2>
      <ul className="wishlist-list">
        {items.map((i) => (
          <li key={i.id}>{i.name}</li>
        ))}
      </ul>
    </div>
  );
}

function AddressesSection() {
  const [addresses, setAddresses] = useState([
    { id: '1', label: 'Home', line: '123 Main St', city: 'Metropolis' },
  ]);

  const addAddress = () => {
    const newAddr = {
      id: Date.now().toString(),
      label: 'New',
      line: '',
      city: '',
    };
    setAddresses((prev) => [...prev, newAddr]);
  };

  return (
    <div className="profile-section">
      <h2>Addresses</h2>
      <ul className="address-list">
        {addresses.map((a) => (
          <li key={a.id}>
            <div>
              <strong>{a.label}</strong> – {a.line}, {a.city}
            </div>
            <Button variant="outline" size="sm">
              Edit
            </Button>
            <Button variant="outline" size="sm" className="danger">
              Delete
            </Button>
            <Button variant="outline" size="sm">
              Select on map
            </Button>
          </li>
        ))}
      </ul>
      <Button variant="primary" size="md" onClick={addAddress}>
        Add Address
      </Button>
    </div>
  );
}

function PaymentsSection() {
  const cards = [
    { id: 'c1', masked: '**** **** **** 4242' },
  ];

  return (
    <div className="profile-section">
      <h2>Payment Methods</h2>
      <ul className="payment-list">
        {cards.map((c) => (
          <li key={c.id}>{c.masked}</li>
        ))}
      </ul>
      <div className="wallet-info">
        <p>UPI ID: user@bank</p>
        <p>Wallet balance: ₹0.00</p>
        <p>EMI eligibility: ₹5,000+</p>
      </div>
    </div>
  );
}

function SettingsSection() {
  return (
    <div className="profile-section">
      <h2>Settings</h2>
      <p>Account settings and preferences will appear here.</p>
    </div>
  );
}

export default Profile;