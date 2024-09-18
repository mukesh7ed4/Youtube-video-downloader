import { useState } from 'react';
import axios from 'axios';
import './App.css'; // Assuming you create a simple CSS file for styling

export default function App() {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    if (!url) {
      setMessage('Please enter a valid URL');
      return;
    }

    const confirmDownload = window.confirm("Do you want to download the video?");
    if (!confirmDownload) return;

    setIsLoading(true);
    setMessage('');

    try {
      const response = await axios.post(`http://localhost:5000/download/youtube`, { url });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error downloading the video: ' + (error.response?.data?.error || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Video Downloader</h1>
      <div>
        <input
          type="url"
          placeholder="Enter YouTube URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <button
        onClick={handleDownload}
        disabled={isLoading}
      >
        {isLoading ? 'Downloading...' : 'Download Video'}
      </button>
      {message && <p className={message.includes('Error') ? 'error' : 'success'}>{message}</p>}
    </div>
  );
}
