import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const URI = 'http://localhost:8000'
    const [selectedStorage, setSelectedStorage] = useState(null);
    const [fileName, setFileName] = useState('');
    const [fileContent, setFileContent] = useState('');
    const [response, setResponse] = useState(null);
    const handleStorageChange = (storageType) => {
        setSelectedStorage(storageType);
    };
    const handleFileNameChange = (event) => {
        setFileName(event.target.value);
    };
    const handleFileContentChange = (event) => {
        setFileContent(event.target.value);
    };
    const handleGetFiles = async () => {
        try {
            const response = await axios.get(`${URI}/api/${selectedStorage}`);
            setResponse(response.data);
        } catch (error) {
            console.error('Error fetching files:', error);
            setResponse({ mensaje: 'Error' });
        }
    };
    const handleStore = async () => {
        try {
            const response = await axios.post(`${URI}/api/${selectedStorage}`, {
                filename: fileName,
                content: fileContent,
            });
            setResponse(response.data);
        } catch (error) {
            console.error('Error storing file:', error);
            setResponse({ mensaje: 'Error' });
        }
    };
    const handleShow = async () => {
        try {
            const response = await axios.get(`${URI}/api/${selectedStorage}/${fileName}`);
            setResponse(response.data);
        } catch (error) {
            console.error('Error fetching file:', error);
            setResponse({ mensaje: 'Error' });
        }
    };
    const handleUpdate = async () => {
        try {
            const response = await axios.put(`${URI}/api/${selectedStorage}/${fileName}`, {
                content: fileContent,
            });
            setResponse(response.data);
        } catch (error) {
            console.error('Error updating file:', error);
            setResponse({ mensaje: 'Error' });
        }
    };
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${URI}/api/${selectedStorage}/${fileName}`);
            setResponse(response.data);
        } catch (error) {
            console.error('Error deleting file:', error);
            setResponse({ mensaje: 'Error' });
        }
    };
    return (
        <div className="App">
            <h1>Práctica 2</h1>
            <div className="menu">
                <button
                    className={`menu-button ${selectedStorage === 'hello' ? 'active' : ''}`}
                    onClick={() => handleStorageChange('hello')}
                >
                    Class Storage
                </button>
                <button
                    className={`menu-button ${selectedStorage === 'json' ? 'active' : ''}`}
                    onClick={() => handleStorageChange('json')}
                >
                    JSON
                </button>
                <button
                    className={`menu-button ${selectedStorage === 'csv' ? 'active' : ''}`}
                    onClick={() => handleStorageChange('csv')}
                >
                    CSV
                </button>
            </div>
            <div className="input-container">
                <div className="input-group">
                    <input
                        type="text"
                        id="filename"
                        placeholder="File"
                        value={fileName}
                        onChange={handleFileNameChange}
                    />
                </div>
                <div className="input-group">
                    <textarea
                        id="content"
                        placeholder="Content"
                        value={fileContent}
                        onChange={handleFileContentChange}
                    />
                </div>
            </div>
            <div className="button-group">
                <button onClick={handleGetFiles}>Get Files</button>
                <button onClick={handleStore}>Store</button>
                <button onClick={handleShow}>Show</button>
                <button onClick={handleUpdate}>Update</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
            <div className="response-card">
                <label>Response:</label>
                {response && (
                    <pre className='response-content'>{JSON.stringify(response, null, 2)}</pre>
                )}
            </div>
        </div>
    );
}
export default App;