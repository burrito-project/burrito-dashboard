import React, { useState } from 'react';
import axios from 'axios';
import AdminDashboard from '../components/AdminDashboard';

const Dashboard: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Create a URL for the selected file
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await axios.post('YOUR_SERVER_UPLOAD_ENDPOINT', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file.');
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
