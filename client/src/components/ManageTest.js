import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ManageTest.css';
import SideNav from "./SideNav.js";

export default function ManageTest() {
  const [tests, setTests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTest, setEditingTest] = useState(null);

  useEffect(() => {
    function getTests() {
      axios.get('http://localhost:8070/test/')
        .then(res => {
          setTests(res.data);
        })
        .catch(err => {
          alert(err.message);
        });
    }
    

    getTests();
  }, []);

  const filteredTests = tests.filter(test =>
    test.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    new Date(test.date).toLocaleDateString().includes(searchTerm) ||
    test.testType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.price.toString().includes(searchTerm)
  );

  const handleEdit = test => {
    setEditingTest(test);
  };

  const handleDelete = test => {
    axios.delete(`http://localhost:8070/test/delete/${test._id}`)
      .then((res) => {
        alert(res.data.message);
        setTests(tests.filter(i => i._id !== test._id));
      })
      .catch(err => {
        alert(err.message);
      });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:8070/test/update/${editingTest._id}`, editingTest)
      .then(res => {
        alert(res.data.message);
        setEditingTest(null);
        setTests(tests.map(test => {
          if (test._id === editingTest._id) {
            return editingTest;
          } else {
            return test;
          }
        }));
      })
      .catch(err => {
        alert(err.message);
      });
  };

  const handleCancelEdit = () => {
    setEditingTest(null);
  };

  const handleChange = (e, field) => {
    const value = e.target.value;
    setEditingTest(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  return (
    <>
      <SideNav />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: "50px", marginLeft: "220px" }}>
        <h1 style={{ textAlign: 'center' }}>Manage Test</h1>
        <div style={{ margin: '20px 0px' }}>
          <label htmlFor="search">Search:</label>
          <input type="text" id="search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <table style={{ margin: '0 auto' }} className='table-mm'>
          <thead>
            <tr>
              <th>Test Name</th>
              <th>Test type</th>
              <th>Date</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTests.map((test) => (
              <tr key={test._id}>
                <td> {editingTest?._id === test._id ? (
                  <input type="text" value={editingTest?.testName} onChange={e => handleChange(e, 'testName')} />
                ) : (
                    test.testName
                  )}
                </td>
                <td>
                  {editingTest?._id === test._id ? (
                    <input type="text" value={editingTest?.testType} onChange={e => handleChange(e, 'testType')} />
                  ) : (
                      test.testType
                    )}
                </td>
                <td>
                  {editingTest?._id === test._id ? (
                    <input type="date" value={editingTest?.date} onChange={e => handleChange(e, 'date')} />
                  ) : (
                      new Date(test.date).toLocaleDateString()
                    )}
                </td>
                <td>
                  {editingTest?._id === test._id ? (
                    <input type="text" value={editingTest?.price} onChange={e => handleChange(e, 'price')} />
                  ) : (
                      test.price
                    )}
                </td>
                <td>
                  {editingTest?._id === test._id ? (
                    <>
                      <button className="update-btn" onClick={handleUpdate}>Update</button>
                      <button className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
                    </>
                  ) : (
                      <>
                        <button className="edit-btn" onClick={() => handleEdit(test)}>Edit</button>
                        <button className="delete-btn" onClick={() => handleDelete(test)}>Delete</button>
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
