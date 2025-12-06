import React, { useEffect, useState } from 'react';

const Levels = () => {
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/levels/')
      .then(response => response.json())
      .then(data => setLevels(data))
      .catch(error => console.error('Error fetching levels:', error));
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 8px 32px rgba(44,62,80,0.1)', padding: 32 }}>
      <h1 style={{ color: '#764ba2', textAlign: 'center', marginBottom: 24 }}>Levels</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {levels.map(level => (
          <li key={level.id} style={{ padding: 12, borderBottom: '1px solid #eee', color: '#333' }}>
            <strong>{level.name}</strong>: {level.description}
          </li>
        ))}
        {levels.length === 0 && <li style={{ color: '#888', textAlign: 'center' }}>No levels found.</li>}
      </ul>
    </div>
  );
};

export default Levels; 