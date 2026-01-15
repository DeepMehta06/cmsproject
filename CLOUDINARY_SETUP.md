# Cloudinary Setup Guide

## Why Cloudinary?
Your CMS now uses **Cloudinary** for image storage instead of Supabase. This provides:
- ✅ **25GB storage + 25GB bandwidth/month** (free tier)
- ✅ **Persistent storage** that works with Netlify deployments
- ✅ **CDN-backed delivery** for fast image loading worldwide
- ✅ **Automatic image optimization** (WebP, quality auto-adjustment)
- ✅ **No credit card required** for free tier

## Setup Steps

### 1. Create a Free Cloudinary Account

1. Go to [cloudinary.com/users/register/free](https://cloudinary.com/users/register/free)
2. Sign up with your email (no credit card needed)
3. Verify your email address

### 2. Get Your Credentials

After logging in:
1. Go to your **Dashboard** (you'll see it immediately after login)
2. You'll find these credentials:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### 3. Add Environment Variables

Create or update your `.env.local` file in the project root:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

**Important Notes:**
- Replace `your_cloud_name_here`, `your_api_key_here`, and `your_api_secret_here` with your actual credentials
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is public (can be used in browser)
- `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` are private (server-side only)

### 4. Add to Netlify (for deployment)

When deploying on Netlify:
1. Go to your site in Netlify Dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add these three variables with your Cloudinary credentials:
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

### 5. Test Your Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to your blog post creation/edit page
3. Try uploading an image
4. You should see "Cloudinary upload successful" in the console

### 6. Remove Old Supabase Dependencies (Optional)

If you're no longer using Supabase:

```bash
npm uninstall @supabase/supabase-js
```

Remove these from `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## Features Available

Your app now has access to:
- **Image uploads** up to 10MB per file
- **Automatic optimization** - Cloudinary converts to WebP when supported
- **CDN delivery** - Images load fast from servers near your users
- **Persistent storage** - Images stay available even after redeployment
- **Image transformations** - Can add filters, resize, crop programmatically

## Folder Structure

Images are organized in Cloudinary:
- `blog-thumbnails/` - Blog post cover images
- `blog-images/` - Other blog-related images

You can view and manage all uploaded images in your Cloudinary Media Library.

## Free Tier Limits

- **Storage:** 25GB
- **Bandwidth:** 25GB/month
- **Transformations:** 25 credits/month
- **Images:** Unlimited

For a small to medium blog/CMS, this is more than enough!

## Troubleshooting

### "Failed to upload image" error
- Check that your environment variables are correctly set
- Make sure you've restarted the dev server after adding `.env.local`
- Verify credentials are correct on Cloudinary dashboard

### Images not showing after deployment
- Ensure you've added environment variables to Netlify
- Redeploy your site after adding the variables

### Need Help?
Check Cloudinary documentation: [cloudinary.com/documentation](https://cloudinary.com/documentation)
