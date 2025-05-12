import React, { useEffect } from 'react';
import { initDB } from '../services/db';

// Initialize the database when the app starts
const ImageManager: React.FC = () => {
  useEffect(() => {
    // Initialize the database when the component mounts
    const setupDatabase = async () => {
      try {
        await initDB();
        console.log('Database initialized successfully');
      } catch (error) {
        console.error('Failed to initialize database:', error);
      }
    };

    setupDatabase();
  }, []);

  // This is a utility component that doesn't render anything visible
  return null;
};

export default ImageManager;
