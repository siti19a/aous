# Web API Project

API untuk mengakses dan memanipulasi data media dengan dukungan caching, paginasi, pencarian, dan pengacakan data.

## Daftar Isi

- [Fitur](#fitur)
- [Endpoint API](#endpoint-api)
- [Deployment](#deployment)
  - [Deployment di Vercel](#deployment-di-vercel)
  - [Deployment di Cloudflare Pages](#deployment-di-cloudflare-pages)
- [Pengembangan Lokal](#pengembangan-lokal)

## Fitur

- **Caching Data**: Implementasi sistem caching untuk mengurangi beban server dan mempercepat respons
- **Paginasi**: Semua endpoint list mendukung paginasi untuk mengelola dataset besar
- **CORS Support**: API mendukung Cross-Origin Resource Sharing untuk akses dari berbagai domain
- **Pemrosesan Judul**: Implementasi algoritma untuk memproses dan memperkaya judul media
- **Pencarian**: Kemampuan mencari berdasarkan kata kunci dalam judul
- **Pengacakan Data**: Kemampuan untuk mendapatkan data secara acak

## Endpoint API

- `/api` - Dokumentasi API
- `/api/list` - Daftar data dengan paginasi
- `/api/rand` - Data acak dengan paginasi
- `/api/info` - Informasi detail tentang file
- `/api/search` - Pencarian data

## Deployment

### Deployment di Vercel

#### Prasyarat

- Akun Vercel
- Git repository dengan kode proyek ini

#### Langkah-langkah Deployment

1. Login ke [Vercel](https://vercel.com)
2. Klik "Add New" > "Project"
3. Import repository Git yang berisi proyek ini
4. Konfigurasi deployment dengan pengaturan berikut:

   - **Framework Preset**: Next.js
   - **Build Command**: `next build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
   - **Development Command**: `next dev`

5. Konfigurasi Environment Variables (jika diperlukan):
   - Tidak ada environment variable khusus yang diperlukan untuk proyek ini

6. Klik "Deploy"

#### Konfigurasi Tambahan di Vercel

- **Caching**: Vercel secara otomatis menangani caching untuk API routes dengan nilai `revalidate` yang sudah dikonfigurasi
- **CORS**: Header CORS sudah dikonfigurasi dalam kode, tidak diperlukan konfigurasi tambahan
- **Revalidation**: Nilai `revalidate` sudah diatur ke 86400 (24 jam) untuk semua endpoint

### Deployment di Cloudflare Pages

#### Prasyarat

- Akun Cloudflare
- Git repository dengan kode proyek ini

#### Langkah-langkah Deployment

1. Login ke [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Pilih "Pages" dari menu navigasi
3. Klik "Create a project" > "Connect to Git"
4. Pilih repository Git yang berisi proyek ini
5. Konfigurasi deployment dengan pengaturan berikut:

   - **Framework preset**: Next.js
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Root directory**: `/` (root dari repository)
   - **Node.js version**: 18 (atau lebih tinggi)

6. Konfigurasi Environment Variables:
   - `NODE_VERSION`: `18` (atau versi Node.js yang lebih tinggi)

7. Klik "Save and Deploy"

#### Konfigurasi Tambahan di Cloudflare Pages

Untuk mendukung Next.js API Routes di Cloudflare Pages, tambahkan file `_worker.js` di root proyek dengan konten berikut:

```js
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/')) {
      // Handle API routes
      return await handleApiRequest(request, env);
    }
    
    // Fallback to static assets or pages
    return env.ASSETS.fetch(request);
  }
};

async function handleApiRequest(request, env) {
  // Forward the request to the Next.js API handler
  return await env.NEXT_API.fetch(request);
}
