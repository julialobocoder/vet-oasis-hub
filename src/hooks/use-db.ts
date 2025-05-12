import { useState, useEffect } from 'react';
import { loadSettings, saveSettings, loadImage, saveImage } from '../services/db';

// Custom hook for database operations
export function useDatabase() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [settings, setSettings] = useState<any>(null);

  // Load settings on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        const data = await loadSettings();
        setSettings(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load settings'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Function to update settings
  const updateSettings = async (newSettings: any) => {
    try {
      setIsLoading(true);
      await saveSettings(newSettings);
      setSettings(newSettings);
      setError(null);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to save settings'));
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to save an image
  const saveImageData = async (id: string, imageData: string) => {
    try {
      await saveImage(id, imageData);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(`Failed to save image ${id}`));
      return false;
    }
  };

  // Function to load an image
  const loadImageData = async (id: string) => {
    try {
      return await loadImage(id);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(`Failed to load image ${id}`));
      return null;
    }
  };

  return {
    settings,
    isLoading,
    error,
    updateSettings,
    saveImageData,
    loadImageData
  };
}
