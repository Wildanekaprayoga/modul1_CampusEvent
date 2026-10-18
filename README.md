# CampusEvent - Demo Modul 2 (Expo SDK 57)

Project ini adalah **lanjutan project CampusEvent dari Modul 1**. Tampilan dan data event dari Modul 1 tetap dipakai, lalu pada Modul 2 ditambahkan State, Hooks, Expo Router, dynamic route, dan navigasi antar-page.

## Jalankan project

Pastikan Node.js minimal 22.13.x, lalu di folder yang ada `package.json` jalankan:

```bash
npm install
npx expo install --fix
npx expo start -c --go
```

Scan QR menggunakan Expo Go.

## Struktur utama Modul 2

```text
app/
├── _layout.tsx
├── index.tsx
├── event/
│   └── [id].tsx
├── register/
│   └── [id].tsx
└── success.tsx

src/
├── data/events.ts
└── styles/styles.ts
```

## Kriteria demo Modul 2 yang diterapkan

1. **useState**
   - `app/index.tsx`: search dan selectedCategory.
   - `app/event/[id].tsx`: event dan isFavorite.
   - `app/register/[id].tsx`: name dan nim.

2. **useEffect**
   - `app/event/[id].tsx`: mengambil event berdasarkan parameter `id` setiap kali route id berubah.

3. **router.push()**
   - Home → Event Detail.
   - Home / Event Detail → Registration.

4. **router.back()**
   - Tombol back pada Event Detail dan Registration.

5. **1 fungsi Expo Router lain**
   - `router.canGoBack()` untuk mengecek apakah halaman sebelumnya tersedia.
   - `router.replace()` untuk mengganti Registration → Success dan Success → Home.

6. **_layout.tsx dan <Stack.Screen>**
   - `app/_layout.tsx` mendefinisikan seluruh page di dalam Stack.

7. **Dynamic route + useLocalSearchParams**
   - `event/[id].tsx` dan `register/[id].tsx` menerima parameter id event.

## Alur demo paling mudah

1. Buka Home.
2. Gunakan search atau pilih kategori untuk menunjukkan `useState`.
3. Tekan **Details** untuk menunjukkan `router.push()` dan dynamic route.
4. Tekan ikon hati untuk menunjukkan perubahan state.
5. Tekan tombol back untuk menunjukkan `router.back()` dan `router.canGoBack()`.
6. Masuk lagi ke detail lalu tekan **Join This Event**.
7. Isi nama dan NIM, lalu **Confirm Registration**.
8. Halaman berpindah dengan `router.replace()` ke Success.
9. Tekan **Back to Home**.

## Materi Modul 1 tetap dipertahankan

- Type / Interface
- Array of Objects
- Custom Function
- `.map()` dan `.filter()`
- Conditions
- TextInput dan Pressable
- External Styling
- Inline / conditional Styling
- ScrollView


### Demo fitur seats berkurang

Register berhasil akan mengurangi jumlah `seats` event sebanyak 1 menggunakan `EventProvider` + React `useState`. Angka terbaru terlihat di halaman Success, Home, serta Event Detail. Ini hanya simulasi selama aplikasi sedang dibuka; refresh akan mengembalikan data awal. Tidak perlu menambah dependency baru untuk fitur ini.
