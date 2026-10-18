# Catatan Singkat Demo Modul 2 - CampusEvent

Project ini berlanjut dari Modul 1. Pada Modul 2 saya tidak mengganti tema, tetapi menambahkan sistem multi-page menggunakan Expo Router.

## Bagian yang ditunjukkan ke aslab

- `app/_layout.tsx`: terdapat `<Stack>` dan `<Stack.Screen>`.
- `app/index.tsx`: `useState` untuk search/filter dan `router.push()` untuk pindah halaman.
- `app/event/[id].tsx`: dynamic route, `useLocalSearchParams`, `useEffect`, `useState`, `router.back()`, dan `router.canGoBack()`.
- `app/register/[id].tsx`: state input nama/NIM dan `router.replace()` setelah submit.
- `app/success.tsx`: hasil navigasi replace dan tombol kembali ke Home.

## Penjelasan singkat untuk presentasi

`useState` menyimpan nilai yang bisa berubah dan membuat UI ikut re-render. `useEffect` saya pakai pada halaman detail untuk mencari event berdasarkan parameter id ketika id route berubah. `router.push()` menambahkan halaman baru ke navigation stack, `router.back()` kembali ke halaman sebelumnya, sedangkan `router.replace()` mengganti halaman saat ini agar halaman sebelumnya tidak tetap berada pada posisi yang sama di stack. `router.canGoBack()` digunakan untuk mengecek apakah back aman dilakukan. `_layout.tsx` menjadi layout utama yang mengatur page menggunakan `<Stack.Screen>`.


## Fitur tambahan: jumlah kursi berkurang saat Register

- `src/context/EventContext.tsx`: `EventProvider` memakai `useState` sebagai sumber data event bersama di semua halaman; fungsi `reserveSeat` mengurangi satu kursi (tidak pernah kurang dari 0).
- `app/_layout.tsx`: `EventProvider` membungkus semua `Stack.Screen`.
- `app/register/[id].tsx`: tombol Confirm Registration menjalankan `reserveSeat(event.id)` sekali, lalu `router.replace` membuka Success.
- `app/success.tsx`: menampilkan `seats remaining`.
- `app/index.tsx` dan `app/event/[id].tsx`: otomatis memperlihatkan sisa kursi terbaru.
- **Cara demo:** lihat 120 seats pada Future Tech Seminar → daftar → Success menampilkan 119 → Back to Home → event yang sama menampilkan 119 seats.
- **Batasan:** data tersimpan pada React state selama sesi aplikasi; kalau browser direfresh / Expo di-restart, angka kembali ke data awal. Belum ada database atau penyimpanan permanen.
