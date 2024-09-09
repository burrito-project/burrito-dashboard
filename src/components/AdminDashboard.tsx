import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const AdminDashboard: React.FC = () => {
  const [ads, setAds] = useState<any[]>([]); // Initialize ads as an empty array

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get('https://api.contigosanmarcos.com/notifications');
        if (Array.isArray(response.data)) {
          setAds(response.data);
        } else {
          console.error('Unexpected data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };

    fetchAds();
  }, []);

  const settings = {
    vertical: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="admin-dashboard">
      <div className="carousel">
        <Slider {...settings}>
          {ads.length > 0 ? (
            ads.map((ad, index) => (
              <div key={index} className={`ad ad-slide ${ad.ad_type}`}>
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
              </div>
            ))
          ) : (
            <p>No ads available.</p>
          )}
        </Slider>
      </div>
    </div>
  );
};

export default AdminDashboard;
