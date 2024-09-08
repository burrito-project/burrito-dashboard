import React, { useState } from 'react';
import axios from 'axios';

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
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>
      <input type="file" onChange={handleFileChange} />
      {previewUrl && (
        <div>
          <img src={previewUrl} alt="Preview" style={{ marginTop: '1rem', maxWidth: '100%', maxHeight: '400px' }} />
        </div>
      )}
      <button onClick={handleUpload}>Subir</button>
    </div>
  );
};

export default Dashboard;
