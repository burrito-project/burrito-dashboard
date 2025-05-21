import React, { useState } from 'react';
import axios from 'axios';
import AdminDashboard from '../components/AdminDashboard';
import '../index.css';

const Dashboard: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [base64File, setBase64File] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Convertir archivo a Base64
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));

      // Convertir archivo a Base64
      try {
        const base64 = await convertToBase64(file);
        setBase64File(base64);
      } catch (error) {
        console.error('Error al convertir el archivo a Base64:', error);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !base64File) return;

    const payload = {
      is_active: true,
      ad_type: 'banner',
      priority: 1,
      ad_content: null,
      image_base64: base64File,  // Base64 de la imagen
    };

    try {
      const token = localStorage.getItem('token');
      await axios.post('https://api.burritosanmarcos.com/panel/notifications', payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      });
      window.location.reload();
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      alert('Necesitas iniciar sesión primero');
    }
  };

  return (
    <div className="dashboard-container" style={{ padding: '1rem' }}>
    <h2>Banners</h2>
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 2}}>
        <AdminDashboard />
        </div>
        <div style={{ flex: 1, marginLeft: '2rem' }}>
        <input type="file" onChange={handleFileChange} />
        {previewUrl && (
            <div>
            <img src={previewUrl} alt="Preview" style={{ marginTop: '1rem', maxWidth: '100%', maxHeight: '300px' }} />
            </div>
        )}
        <button onClick={handleUpload} style={{ marginTop: '1rem' }}>Subir</button>
        </div>
    </div>
    </div>
  );
};

export default Dashboard;
