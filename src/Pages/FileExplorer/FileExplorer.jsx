import React, { useState } from 'react';
import './FileExplorer.css';
import { assets } from '../../assets/assets';

const FileExplorer = () => {
    const [files, setFiles] = useState([
        { name: 'ProjectPlan.pdf' },
        { name: 'DesignMockups.zip' },
        { name: 'Requirements.docx' },
    ]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [sortType, setSortType] = useState('name'); // Default sorting by name
    const [sortDirection, setSortDirection] = useState('asc'); // Default ascending order

    const handleFileUpload = (event) => {
        const uploaded = Array.from(event.target.files).map(file => ({ name: file.name }));
        setUploadedFiles([...uploadedFiles, ...uploaded]);
    };

    const handleUploadClick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = handleFileUpload;
        input.click();
    };

    const allFiles = [...files, ...uploadedFiles];

    const handleSort = (type) => {
        if (type === sortType) {
            // Toggle sorting direction if sorting by the same type
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // Set new sort type and default to ascending order
            setSortType(type);
            setSortDirection('asc');
        }
    };

    const sortedFiles = allFiles.sort((a, b) => {
        const aValue = a[sortType].toUpperCase();
        const bValue = b[sortType].toUpperCase();
        if (sortDirection === 'asc') {
            return aValue.localeCompare(bValue);
        } else {
            return bValue.localeCompare(aValue);
        }
    });

    return (
        <div className="file-explorer">
            <div className="header">
                <h1>File Explorer</h1>
            </div>
            <div className="explorer-content">
                <div className="sorting-options">
                    <button onClick={() => handleSort('name')}>
                        {sortType === 'name' ? (sortDirection === 'asc' ? 'Name ↑' : 'Name ↓') : 'Sort by Name'}
                    </button>
                    {/* Add more sorting options here */}
                </div>
                <div className="folders-and-files">
                    <div className="folder">
                        <div className="folder-icon">
                            <img src={assets.documents_icon} alt="Folder Icon" />
                        </div>
                        <p>Documents</p>
                    </div>
                    <div className="folder">
                        <div className="folder-icon">
                            <img src={assets.images_icon} alt="Folder Icon" />
                        </div>
                        <p>Images</p>
                    </div>
                    <div className="folder">
                        <div className="folder-icon">
                            <img src={assets.videos_icon} alt="Folder Icon" />
                        </div>
                        <p>Videos</p>
                    </div>
                    {sortedFiles.map((file, index) => (
                        <div key={index} className="file">
                            <div className="file-icon">
                                <img src={assets.projects_icon} alt="File Icon" />
                            </div>
                            <p>{file.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="upload-section">
                <button onClick={handleUploadClick}>Upload Files</button>
            </div>
        </div>
    );
};

export default FileExplorer;
