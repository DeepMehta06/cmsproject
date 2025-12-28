import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Upload image to Supabase Storage
 * @param {File} file - The image file to upload
 * @param {string} folder - Folder name in the bucket (default: 'blog-images')
 * @returns {Promise<{url: string, path: string}>}
 */
export async function uploadImage(file, folder = 'blog-images') {
    try {
        // Validate file
        if (!file) throw new Error('No file provided');
        
        // Check file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            throw new Error('File size must be less than 5MB');
        }

        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            throw new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed');
        }

        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${folder}/${fileName}`;

        // Upload to Supabase
        const { data, error } = await supabase.storage
            .from('images')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false,
                contentType: file.type
            });

        if (error) throw error;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('images')
            .getPublicUrl(filePath);

        return { 
            url: publicUrl, 
            path: filePath 
        };
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}

/**
 * Delete image from Supabase Storage
 * @param {string} filePath - Path to the file in storage
 * @returns {Promise<boolean>}
 */
export async function deleteImage(filePath) {
    try {
        if (!filePath) return false;

        const { error } = await supabase.storage
            .from('images')
            .remove([filePath]);

        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Error deleting image:', error);
        throw error;
    }
}

/**
 * Update image - deletes old and uploads new
 * @param {string} oldPath - Path to old image
 * @param {File} newFile - New image file
 * @param {string} folder - Folder name
 * @returns {Promise<{url: string, path: string}>}
 */
export async function updateImage(oldPath, newFile, folder = 'blog-images') {
    try {
        // Delete old image if exists
        if (oldPath) {
            await deleteImage(oldPath);
        }

        // Upload new image
        const result = await uploadImage(newFile, folder);
        return result;
    } catch (error) {
        console.error('Error updating image:', error);
        throw error;
    }
}
