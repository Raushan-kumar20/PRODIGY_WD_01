import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { user } = React.useContext(AuthContext);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data);
      });
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`, { headers: { Authorization: localStorage.getItem('token') } });
    setProducts(products.filter(product => product._id !== id));
  };

  return (
    <div>
      <h1>Product List</h1>
      {user && <Link to="/add">Add Product</Link>}
      <ul>
        {products.map(product => (
          <li key={product._id}>
            <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px' }} />
            {product.name} - {product.description} - ${product.price}
            {user && (
              <>
                <Link to={`/edit/${product._id}`}>Edit</Link>
                <button onClick={() => handleDelete(product._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
