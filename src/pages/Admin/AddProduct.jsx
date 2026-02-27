import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminContext from '../../context/AdminContext';
import Button from '../../components/common/Button';

function AddProduct() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    images: '',
  });
  const [error, setError] = useState('');
  const { token } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock, 10),
        images: form.images ? form.images.split(',').map((u) => u.trim()) : [],
      };
      await axios.post('/api/products', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/admin/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Add failed');
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label>Price</label>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label>Category</label>
          <input name="category" value={form.category} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label>Stock</label>
          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <label>Images (comma separated URLs)</label>
          <input name="images" value={form.images} onChange={handleChange} />
        </div>
        <Button type="submit" variant="primary" size="md">
          Save
        </Button>
      </form>
    </div>
  );
}

export default AddProduct;