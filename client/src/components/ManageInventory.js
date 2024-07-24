// ManageInventory.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ManageInventory.css';
import SideNav from "./SideNav";

export default function ManageInventory() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    function getInventoryItems() {
      axios.get('http://localhost:8070/inventory/')
        .then(res => {
          setInventoryItems(res.data);
          calculateTotalPrice(res.data);
        })
        .catch(err => {
          alert(err.message);
        });
    }

    getInventoryItems();
  }, []);

  const calculateTotalPrice = (items) => {
    let total = 0;
    items.forEach(item => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  };

  const filteredInventoryItems = inventoryItems.filter(item =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.quantity.toString().includes(searchTerm) ||
    item.price.toString().includes(searchTerm)
  );

  const handleEdit = item => {
    setEditingItem(item);
  };

  const handleDelete = item => {
    axios.delete(`http://localhost:8070/inventory/delete/${item._id}`)
      .then((res) => {
        alert(res.data.message);
        setInventoryItems(inventoryItems.filter(i => i._id !== item._id));
        calculateTotalPrice(inventoryItems.filter(i => i._id !== item._id));
      })
      .catch(err => {
        alert(err.message);
      });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:8070/inventory/update/${editingItem._id}`, editingItem)
      .then(res => {
        alert(res.data.message);
        setEditingItem(null);
        setInventoryItems(inventoryItems.map(item => {
          if (item._id === editingItem._id) {
            return editingItem;
          } else {
            return item;
          }
        }));
        calculateTotalPrice(inventoryItems);
      })
      .catch(err => {
        alert(err.message);
      });
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const handleChange = (e, field) => {
    const value = e.target.value;
    setEditingItem(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  return (
    <>
      <SideNav />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: "50px", marginLeft: "220px" }}>
        <h1 style={{ textAlign: 'center' }}>Manage Inventory</h1>
        <div style={{ margin: '20px 0px' }}>
          <label htmlFor="search">Search:</label>
          <input type="text" id="search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <div>
          <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
        </div>
        <table style={{ margin: '0 auto' }} className='table-mm'>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventoryItems.map((item) => (
              <tr key={item._id}>
                <td> {editingItem?._id === item._id ? (
                  <input type="text" value={editingItem?.itemName} onChange={e => handleChange(e, 'itemName')} />
                ) : (
                    item.itemName
                  )}
                </td>
                <td>
                  {editingItem?._id === item._id ? (
                    <input type="text" value={editingItem?.quantity} onChange={e => handleChange(e, 'quantity')} />
                  ) : (
                      item.quantity
                    )}
                </td>
                <td>
                  {editingItem?._id === item._id ? (
                    <input type="text" value={editingItem?.price} onChange={e => handleChange(e, 'price')} />
                  ) : (
                      item.price
                    )}
                </td>
                <td>
                  {editingItem?._id === item._id ? (
                    <>
                      <button className="update-btn" onClick={handleUpdate}>Update</button>
                      <button className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
                    </>
                  ) : (
                      <>
                        <button className="edit-btn" onClick={() => handleEdit(item)}>Edit</button>
                        <button className="delete-btn" onClick={() => handleDelete(item)}>Delete</button>
                      </>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
