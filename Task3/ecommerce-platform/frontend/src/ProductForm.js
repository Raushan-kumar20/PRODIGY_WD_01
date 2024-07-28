import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = React.useContext(AuthContext);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/products/${id}`)
        .then(response => {
          const { name, description, price, image } = response.data;
          setName(name);
          setDescription(description);
          setPrice(price);
          setImage(image);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = { name, description, price, image };
    if (id) {
      await axios.put(`http://localhost:5000/api/products/${id}`, product, { headers: { Authorization: localStorage.getItem('token') } });
    } else {
      await axios.post('http://localhost:5000/api/products', product, { headers: { Authorization: localStorage.getItem('token') } });
    }
    navigate('/');
  };

  if (!user) return <p>You need to be logged in to manage products.</p>;

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
      <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" required />
      <button type="submit">{id ? 'Update' : 'Add'} Product</button>
    </form>
  );
};

export default ProductForm;
