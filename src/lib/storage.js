/**
 * Upload image to Cloudinary via API route
 * @param {File} file - The image file to upload
 * @param {string} folder - Folder name in Cloudinary (default: 'blog-images')
 * @returns {Promise<{url: string, path: string}>}
 */
export async function uploadImage(file, folder = 'blog-images') {
    try {
        // Validate file
        if (!file) throw new Error('No file provided');
        
        // Check file size (max 10MB)
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            throw new Error('File size must be less than 10MB');
        }

        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            throw new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed');
        }

        // Create FormData
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);

        // Upload via API route
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Upload failed');
        }

        return {
            url: data.url,
            path: data.path,
            success: true
        };

    } catch (error) {
        console.error('Upload error:', error);
        throw new Error(`Failed to upload image: ${error.message}`);
    }
}

/**
 * Delete image from Cloudinary via API route
 * @param {string} publicId - The public_id of the image to delete
 * @returns {Promise<boolean>}
 */
export async function deleteImage(publicId) {
    try {
        if (!publicId) throw new Error('No image public_id provided');

        const response = await fetch(`/api/upload?publicId=${encodeURIComponent(publicId)}`, {
            method: 'DELETE',
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Delete failed');
        }
        
        return data.success;

    } catch (error) {
        console.error('Delete error:', error);
        throw new Error(`Failed to delete image: ${error.message}`);
    }
}
