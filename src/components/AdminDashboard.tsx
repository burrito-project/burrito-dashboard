import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import '../index.css';

const AdminDashboard: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
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
          setNotifications(response.data);
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

    const adToDelete = notifications[index];
    const response = await fetch(`https://api.contigosanmarcos.com/panel/notifications/${adToDelete.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `${localStorage.getItem('token')}`,
      }
    });
  
    if (response.ok) {
      setNotifications((prevNotifications) => prevNotifications.filter((_, i) => i !== index));
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
        <div className="notification-list">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div key={notification.id} className={`notification notification-item ${notification.ad_type}`}>
                {notification.ad_type === 'banner' ? (
                  <div className="notification-banner">
                    {notification.image_url && <img src={notification.image_url} alt={notification.ad_title} />}
                  </div>
                ) : (
                  <div className="notification-post">
                    {notification.image_url && (
                      <div className="ad-post-image">
                        <img src={notification.image_url} alt={notification.ad_title} />
                      </div>
                    )}
                    {notification.ad_title && <h3>{notification.ad_title}</h3>}
                    {notification.ad_content && <p>{notification.ad_content}</p>}
                    {notification.target_url && (
                      <a href={notification.target_url} target="_blank" rel="noopener noreferrer">
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
            <p>No notifications available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
