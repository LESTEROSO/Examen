import React, { useState } from 'react';

const BlogComponent: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://api.vercel.app/blog'); 
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (Array.isArray(result)) {
        setData(result);
      } else {
        console.error('Unexpected data format:', result);
      }
    } catch (error: any) {
      setError(error.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Cargando...' : 'Cargar Blog'}
      </button>
      {error && <p>Error: {error}</p>}
      {data.length > 0 && (
        <div>
          {data.map((item) => (
            <div key={item.id}>
              <h2>{item.title}</h2>
              <p>{item.content}</p>
              <p><strong>Autor:</strong> {item.author}</p>
              <p><strong>Fecha:</strong> {item.date}</p>
              <p><strong>Categoría:</strong> {item.category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogComponent;
