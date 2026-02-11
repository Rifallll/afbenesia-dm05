# Batch 05: Kelas Kilat Digital Marketing – Landing Page

Project ini adalah tugas seleksi Calon Tim Web Developer di **PT Afbe Cahaya Kreatif**. Landing page ini dirancang dengan standar profesional menggunakan pendekatan **Ultra-Minimalist Luxury** untuk menonjolkan kerapihan dan fungsionalitas.

## 🔗 Live Demo

**[https://rifallll.github.io/afbenesia-dm05/](https://rifallll.github.io/afbenesia-dm05/)**

## 🚀 Fitur Utama (Requirement + Plus Points)

- **Informasi Program Lengkap**: Detail pendaftaran, penyelenggara (Afbenesia), dan deskripsi program.
- **Tabel Peserta Interaktif**:
  - Live Search (Nama, Instansi, ID).
  - Filter Status Pembayaran.
  - Highlight peserta "Pending / Waiting".
  - ID Peserta otomatis (`AFB-DM05-XXX`).
- **Plus Point Features**:
  - **Countdown Timer**: Menunjukkan urgensi sisa waktu pendaftaran.
  - **Registration Form**: Formulir interaktif dengan validasi dan simulasi feedback.
  - **Scroll Reveal Animations**: Efek transisi halus saat scrolling untuk pengalaman premium.
  - **Responsive Layout**: Optimal untuk Desktop, Tablet, dan Smartphone.

## 🛠️ Teknologi yang Digunakan

- **HTML5**: Struktur semantik yang bersih.
- **CSS3 Modern**: Custom variables, Flexbox/Grid, dan Intersection Observer animations.
- **JavaScript (ES6+)**: Logika filter, countdown, dan manipulasi DOM dinamis.

## 📂 Struktur Project

```text
/afbenesia-dm05
 ├── index.html     (Struktur utama)
 ├── css/
 │    └── style.css (Styling & Animasi)
 ├── js/
 │    └── script.js (Logika & Interaksi)
 └── assets/
      └── (Aset gambar hero)
```

## 💻 Cara Menjalankan Project (Panduan HRD)

Terdapat dua cara untuk melihat hasil pengerjaan ini:

### Cara 1: Langsung (Paling Cepat)

1. Download dan ekstraksi file ZIP atau clone repository ini.
2. Masuk ke folder `afbenesia-dm05`.
3. Klik kanan file `index.html` dan pilih **"Open with Google Chrome"** (atau browser lainnya).
   *Metode ini sudah cukup untuk melihat desain, tabel peserta, filter, dan animasi.*

### Cara 2: Melalui Terminal/VS Code (Professional Dev Mode)

Jika Anda ingin menjalankan fitur *Live Reload* atau melihat struktur `npm`, ikuti langkah ini:

1. Buka folder root di VS Code atau Terminal.
2. **PENTING**: Anda harus masuk ke dalam folder project terlebih dahulu dengan perintah:

   ```bash
   cd afbenesia-dm05
   ```

3. Install dependencies (jika diperlukan untuk pengembangan):

   ```bash
   npm install
   ```

4. Jalankan server lokal:

   ```bash
   npm run dev
   ```

5. Buka link yang muncul (biasanya `http://localhost:5173`).

---
> **Catatan Teknis**: Error `ENOENT` biasanya terjadi jika perintah `npm` dijalankan di luar folder `afbenesia-dm05`. Pastikan Anda selalu melakukan `cd afbenesia-dm05` terlebih dahulu sebelum menjalankan perintah terminal.

---
*Dikerjakan dengan ketelitian maksimal untuk PT Afbe Cahaya Kreatif.*
