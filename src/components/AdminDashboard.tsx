import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import '../index.css';

const AdminDashboard: React.FC = () => {
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // State for loading spinner
  const [error, setError] = useState<string | null>(null); // State for error handling

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true); // Start loading
        const token = localStorage.getItem('token');
        const response = await axios.get('https://api.contigosanmarcos.com/panel/notifications', {
          headers: {
            'Authorization': `${token}`,
          },
        });
        if (Array.isArray(response.data)) {
          setAds(response.data);
        } else {
          console.error('Unexpected data format:', response.data);
          setError('Unexpected data format received from the server.');
        }
      } catch (error) {
        console.error('Error fetching ads:', error);
        setError('Error fetching ads. Please log in to manage the banners.');
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  const handleDelete = async (index: number) => {
    if (!window.confirm('Are you sure you want to delete this ad?')) {
      return;
    }

    const adToDelete = ads[index];
    const response = await fetch(`https://api.contigosanmarcos.com/panel/notifications/${adToDelete.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `${localStorage.getItem('token')}`,
      }
    });
  
    if (response.ok) {
      setAds((prevAds) => prevAds.filter((_, i) => i !== index));
      alert(`Se borró con éxito el banner`);
    } else {
      alert(`Necesitas iniciar sesión primero`);
    }
  };

  return (
    <div className="admin-dashboard">
      {loading ? (
        <p>Loading ads...</p> // Display loading message
      ) : error ? (
        <p className="error-message">{error}</p> // Display error message if any
      ) : (
        <div className="ad-list">
          {ads.length > 0 ? (
            ads.map((ad, index) => (
              <div key={ad.id} className={`ad ad-item ${ad.ad_type}`}>
                {ad.ad_type === 'banner' ? (
                  <div className="ad-banner">
                    {ad.image_url && <img src={ad.image_url} alt={ad.ad_title} />}
                  </div>
                ) : (
                  <div className="ad-post">
                    {ad.image_url && (
                      <div className="ad-post-image">
                        <img src={ad.image_url} alt={ad.ad_title} />
                      </div>
                    )}
                    {ad.ad_title && <h3>{ad.ad_title}</h3>}
                    {ad.ad_content && <p>{ad.ad_content}</p>}
                    {ad.target_url && (
                      <a href={ad.target_url} target="_blank" rel="noopener noreferrer">
                        More Info
                      </a>
                    )}
                  </div>
                )}
                <div className="ad-controls">
                  <button
                    className="icon-button delete-button"
                    onClick={() => handleDelete(index)}
                    style={{ color: 'red' }}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No ads available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
