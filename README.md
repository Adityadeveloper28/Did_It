# Did_It - Proof Tracking App 📸

> A React Native mobile application that helps you track your daily actions and maintain proof of completion with text descriptions and photos. Build accountability and keep a visual log of your accomplishments.

[![React Native](https://img.shields.io/badge/React%20Native-0.82.1-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-Private-red.svg)]()

---

## ✨ Features

- **📝 Action Management**: Create and organize actions you want to track
- **📷 Proof Logging**: Add proof entries for each action with: 
  - Text descriptions
  - Photo attachments (from gallery or camera)
  - Automatic timestamps
- **⚡ Smart Caching**: API data is cached in AsyncStorage and updated only when stale or changed
- **💾 Persistent Storage**: Cached actions, proofs, and profile data are available instantly on reopen
- **🎨 Clean UI**: Intuitive navigation with floating action buttons
- **📱 Cross-Platform**:  Runs on both iOS and Android

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed: 

- **Node.js** (>= 20)
- **npm** or **yarn**
- **React Native CLI** - Follow the [React Native environment setup](https://reactnative.dev/docs/environment-setup) guide
- **Xcode** (for iOS development on macOS)
- **Android Studio** (for Android development)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Adityadeveloper28/Did_It.git
cd Did_It
```

2. **Install dependencies**

```bash
npm install
```

3. **Install iOS dependencies** (macOS only)

```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

### Running the App

#### For iOS

```bash
npm run ios
```

#### For Android

```bash
npm run android
```

#### Start Metro Bundler

```bash
npm start
```

---

## ⚡ Caching Strategy

This app uses **stale-while-revalidate caching** with AsyncStorage for faster page loads and reduced API calls.

### What is cached

- **Actions list**
- **Proof list per action**
- **User profile**

### How it works

1. The app first reads cached data and renders it immediately.
2. It checks if cache is stale (TTL based).
3. If stale, it fetches fresh data from API in the background.
4. UI updates only if data signature has changed.
5. Cache is invalidated after write operations (create action, add proof) and on logout.

### Cache implementation files

- `src/services/storage.ts` - cache read/write, staleness check, invalidation, clear-all
- `src/screens/ActionListScreen.tsx` - cached actions load + background refresh
- `src/screens/ProofListScreen.tsx` - cached proofs load + background refresh
- `src/screens/ProfileScreen.tsx` - cached profile load + background refresh

---

## 📦 Build Android APK (Release)

### 1. Configure API URL

Create/update `.env` in project root:

```dotenv
API_URL=https://did-it-ashen.vercel.app/api
```

### 2. Build release APK (Windows)

```powershell
cd android
gradlew.bat clean
gradlew.bat assembleRelease
```

### 3. Output APK path

After successful build, APK is generated at:

```text
android/app/build/outputs/apk/release/app-release.apk
```

### 4. Install on device

- Copy `app-release.apk` to Android phone
- Open APK and allow install from unknown sources if prompted

### Notes

- Rebuild after any `.env` change, because env values are bundled at build time.
- For Play Store upload, configure a proper release keystore/signing config (do not use debug signing).

---

## 💡 Usage

### 1. Create an Action

1. Tap the **`+`** button on the home screen
2. Enter a title (e.g., "Daily Workout")
3. Add an optional description
4. Save the action

### 2. Add Proof

1. Tap on any action card
2. Tap the **`+`** button to add proof
3. Describe what you did
4. Optionally attach a photo from gallery or camera
5. Submit the proof

### 3. View History

- All proofs are timestamped and saved
- Browse your proof history for any action
- View attached photos in full detail

---

## 📂 Project Structure

```
Did_It/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── ActionCard.tsx
│   │   ├── ProofCard.tsx
│   │   └── PrimaryButton.tsx
│   ├── context/          # React Context providers
│   │   └── AuthContext.tsx
│   ├── navigation/       # Navigation configuration
│   │   ├── AppNavigator.tsx
│   │   └── AuthNavigator.tsx
│   ├── screens/          # Screen components
│   │   ├── ActionListScreen.tsx
│   │   ├── AddActionScreen.tsx
│   │   ├── AddProofScreen.tsx
│   │   ├── ProofListScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── services/         # Business logic & API services
│   │   ├── storage.ts
│   │   ├── action.ts
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── proof.ts
│   ├── types/            # TypeScript type definitions
│   │   └── models.ts
│   └── utils/            # Utility functions
│       └── formateDate.ts
├── server/               # Optional Node.js backend (for cloud sync)
│   ├── config/           # Database & service configs
│   ├── middleware/       # Auth & upload middleware
│   ├── models/           # MongoDB models
│   └── routes/           # API routes
├── android/              # Android native code
├── ios/                  # iOS native code
├── App.tsx               # Root component
└── package.json          # Dependencies
```

---

## 📦 Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| **React Native** | 0.82.1 | Core mobile framework |
| **React** | 19.1.1 | UI rendering engine |
| **React Navigation** | 7.1.26 / 7.9.0 | Stack and app navigation |
| **AsyncStorage** | 2.2.0 | Local persistence and smart caching |
| **Axios** | 1.13.2 | HTTP client for API requests |
| **React Native Config** | 1.6.1 | Environment variable management |
| **React Native Image Picker** | 8.2.1 | Camera and gallery media selection |
| **FontAwesome6 Vector Icons** | 12.3.0 | Iconography across screens |
| **React Native Linear Gradient** | 2.8.3 | Gradient UI elements |
| **React Native Safe Area Context** | 5.6.2 | Safe area handling on devices |
| **TypeScript** | 5.8.3 | Type safety and tooling |

---

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Run linting:

```bash
npm run lint
```

---

## 🛠️ Development

### Available Scripts

- `npm start` - Start the Metro bundler
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests

### Code Style

This project uses: 
- **ESLint** with `@react-native` config
- **Prettier** for code formatting
- **TypeScript** for type checking

---

## 🌐 Backend API (Optional)

**Note**: The backend is **completely optional**. The app works perfectly with local storage only using AsyncStorage.

The project includes an optional Node.js/Express backend in the `server/` directory for users who want **cloud synchronization** and **user authentication** features:

- **Authentication**: JWT-based user authentication
- **Actions API**: CRUD operations for actions with cloud storage
- **Proofs API**: CRUD operations with image upload to Cloudinary
- **MongoDB**: Database for persistent cloud storage

### Running the Backend (Optional)

If you want to enable cloud sync:

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Create a `.env` file based on the requirements
   - Configure MongoDB connection string
   - Add Cloudinary credentials (if using image upload)
   - Set JWT secret key

4. Start the server:
```bash
npm start
```

**Note**: The app will continue to work with local storage if the backend is not running.

---

## 📱 Screens

1. **Action List** - View all your tracked actions
2. **Add Action** - Create new actions to track
3. **Proof List** - View all proofs for a specific action
4. **Add Proof** - Submit proof with text and/or images
5. **Login** - User authentication (when backend is enabled)
6. **Register** - Create new account (when backend is enabled)
7. **Profile** - User profile management (when backend is enabled)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

For detailed guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md) (if available)

---

## 📄 License

This project is **private**. Please contact the maintainer for usage permissions.

---

## 👤 Maintainer

**Aditya** ([@Adityadeveloper28](https://github.com/Adityadeveloper28))

---

## 📞 Support

If you encounter any issues or have questions: 

- 🐛 Open an [issue](https://github.com/Adityadeveloper28/Did_It/issues)
- 📧 Contact the maintainer directly

---

## 🙏 Acknowledgments

Built with ❤️ using React Native and powered by the amazing React Native community. 

---

## 🔗 Useful Resources

- [React Native Documentation](https://reactnative.dev/)
- [React Navigation Docs](https://reactnavigation.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [React Native Environment Setup](https://reactnative.dev/docs/environment-setup)

---

**Note**: Make sure you have completed the [React Native environment setup](https://reactnative.dev/docs/environment-setup) before running this project.