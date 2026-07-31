const CLOUD_NAME = 'mgoekn9x';

/**
 * Uploads an image file to Cloudinary.
 * If an unsigned upload preset is provided, uploads via Cloudinary REST API.
 * Fallback returns file Data URL if offline or preset requires configuration.
 * @param {File|Blob} file 
 * @param {string} uploadPreset 
 * @returns {Promise<string>} Uploaded Image URL
 */
export const uploadToCloudinary = async (file, uploadPreset = 'nani_preset') => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      const data = await response.json();
      return data.secure_url;
    }
  } catch (error) {
    console.warn('Cloudinary API upload error, converting file locally:', error);
  }

  // Fallback: Read as base64 Data URL so user upload works immediately without failing
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};
