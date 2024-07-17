import { useEffect, useState } from 'react';
import React from React;
import axios from 'axios';

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get('/api/getSchools');
        setSchools(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSchools();
  }, []);

  return (
    <div className="school-list">
      {schools.map(school => (
        <div key={school.id} className="school-card">
          <img src={`/schoolImages/${school.image}`} alt={school.name} />
          <h2>{school.name}</h2>
          <p>{school.address}</p>
          <p>{school.city}</p>
        </div>
      ))}
      <style jsx>{`
        .school-list {
          display: flex;
          flex-wrap: wrap;
        }
        .school-card {
          border: 1px solid #ccc;
          margin: 10px;
          padding: 10px;
          width: calc(33.333% - 20px);
        }
        .school-card img {
          max-width: 100%;
          height: auto;
        }
      `}</style>
    </div>
  );
}