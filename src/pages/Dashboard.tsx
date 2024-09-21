import React, { useState } from 'react';
import axios from 'axios';
import AdminDashboard from '../components/AdminDashboard';

const Dashboard: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Convertir archivo a Base64
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);  // Convierte el archivo a Base64
      reader.onload = () => resolve(reader.result as string);  // Resuelve con el resultado en Base64
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Crear una URL para la previsualización

      // Convertir archivo a Base64
      try {
        const base64 = await convertToBase64(file);
        setSelectedFile(base64 as any); // Guardar el archivo en Base64 en el estado
      } catch (error) {
        console.error('Error al convertir el archivo a Base64:', error);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const payload = {
      is_active: true,
      ad_type: 'banner',
      priority: 1,
      image_base64: selectedFile,  // Base64 de la imagen
    };

    try {
      await axios.post('https://api.contigosanmarcos.com/notifications', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Archivo subido con éxito!');
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      alert('Falló la subida del archivo.');
    }
  };

  return (
    <div className="dashboard-container" style={{ padding: '1rem' }}>
    <h2>Admin Dashboard</h2>
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 2 }}>
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
