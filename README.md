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
- **💾 Persistent Storage**: All data saved locally using AsyncStorage
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
| **React Native** | 0.82.1 | Core framework |
| **React Navigation** | 7.x | Screen navigation |
| **AsyncStorage** | 2.2.0 | Local data persistence |
| **React Native Image Picker** | 8.2.1 | Camera/gallery access |
| **TypeScript** | 5.8.3 | Type safety |

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