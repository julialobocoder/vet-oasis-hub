// Database service using IndexedDB for persistent storage

// Define the database name and version
const DB_NAME = 'vetOasisDB';
const DB_VERSION = 1;

// Define object store names
const SETTINGS_STORE = 'settings';
const IMAGES_STORE = 'images';

// Initialize the database
export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    // Handle database upgrade (called when the database is created or version changes)
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Create settings store
      if (!db.objectStoreNames.contains(SETTINGS_STORE)) {
        db.createObjectStore(SETTINGS_STORE, { keyPath: 'id' });
      }
      
      // Create images store for binary data
      if (!db.objectStoreNames.contains(IMAGES_STORE)) {
        db.createObjectStore(IMAGES_STORE, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };

    request.onerror = (event) => {
      console.error('IndexedDB error:', (event.target as IDBOpenDBRequest).error);
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
};

// Save settings to the database
export const saveSettings = async (settings: any): Promise<void> => {
  try {
    const db = await initDB();
    const transaction = db.transaction(SETTINGS_STORE, 'readwrite');
    const store = transaction.objectStore(SETTINGS_STORE);
    
    // Save settings with ID 'landingPageSettings'
    await objectStoreRequest(store.put({ id: 'landingPageSettings', ...settings }));
    
    db.close();
  } catch (error) {
    console.error('Error saving settings:', error);
    throw error;
  }
};

// Load settings from the database
export const loadSettings = async (): Promise<any> => {
  try {
    const db = await initDB();
    const transaction = db.transaction(SETTINGS_STORE, 'readonly');
    const store = transaction.objectStore(SETTINGS_STORE);
    
    // Get settings with ID 'landingPageSettings'
    const settings = await objectStoreRequest(store.get('landingPageSettings'));
    
    db.close();
    return settings || {};
  } catch (error) {
    console.error('Error loading settings:', error);
    return {};
  }
};

// Save an image to the database
export const saveImage = async (id: string, imageData: string): Promise<void> => {
  try {
    const db = await initDB();
    const transaction = db.transaction(IMAGES_STORE, 'readwrite');
    const store = transaction.objectStore(IMAGES_STORE);
    
    // Save image with provided ID
    await objectStoreRequest(store.put({ id, data: imageData }));
    
    db.close();
  } catch (error) {
    console.error(`Error saving image ${id}:`, error);
    throw error;
  }
};

// Load an image from the database
export const loadImage = async (id: string): Promise<string | null> => {
  try {
    const db = await initDB();
    const transaction = db.transaction(IMAGES_STORE, 'readonly');
    const store = transaction.objectStore(IMAGES_STORE);
    
    // Get image with provided ID
    const image = await objectStoreRequest(store.get(id));
    
    db.close();
    return image ? image.data : null;
  } catch (error) {
    console.error(`Error loading image ${id}:`, error);
    return null;
  }
};

// Helper function to convert IDBRequest to Promise
const objectStoreRequest = <T>(request: IDBRequest<T>): Promise<T> => {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};
