# CampusEvent - Expo SDK 57

Project dibuat dari nol untuk Expo Go SDK 57.

## PENTING
Jangan copy `node_modules` atau `package-lock.json` dari project lama.
ZIP ini sengaja tidak membawa keduanya agar dependency bersih.

## Persiapan
Gunakan Node.js 22.13 atau lebih baru.

Cek:
```bash
node -v
```

## Jalankan
Buka terminal di folder yang berisi `package.json`, lalu:

```bash
npm install
npx expo install --fix
npx expo start -c --go
```

Scan QR menggunakan Expo Go.

## Materi Modul 1 yang dipakai
- React Native components
- TypeScript
- Type & Interface
- Array of Objects
- Custom Function
- Loop dengan `.map()`
- Conditions
- TextInput
- Pressable
- ScrollView
- External Styling
- Inline Styling

## File penting
- `App.tsx` = UI dan logic utama
- `src/data/events.ts` = type/interface + array of objects
- `src/styles/styles.ts` = external styles

## Jika Expo Doctor
Setelah `npm install`, boleh cek:
```bash
npx expo-doctor@latest
```

Project ini dibuat tanpa dependency tambahan seperti expo-router atau expo-font
agar instalasi awal lebih sederhana dan menghindari konflik dependency lama.
