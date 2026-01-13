# Did_It - Proof Tracking App 📸

A React Native mobile application that helps you track your daily actions and maintain proof of completion with text descriptions and photos.  Perfect for building accountability and keeping a visual log of your accomplishments.

## ✨ Features

- **Action Management**: Create and organize actions you want to track
- **Proof Logging**: Add proof entries for each action with: 
  - Text descriptions
  - Photo attachments (from gallery or camera)
  - Automatic timestamps
- **Persistent Storage**: All data saved locally using AsyncStorage
- **Clean UI**: Intuitive navigation with floating action buttons
- **Cross-Platform**:  Runs on both iOS and Android

## 📱 Screenshots

The app consists of four main screens: 
- **Action List**: View all your tracked actions
- **Add Action**: Create new actions to track
- **Proof List**:  View all proofs for a specific action
- **Add Proof**: Submit proof with text and/or images

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20
- React Native development environment set up ([official guide](https://reactnative.dev/docs/environment-setup))
- For iOS: Xcode and CocoaPods
- For Android: Android Studio and Android SDK

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
   pod install
   cd ..
   ```

4. **Start Metro bundler**
   ```bash
   npm start
   ```

5. **Run the app**
   
   For Android:
   ```bash
   npm run android
   ```
   
   For iOS:
   ```bash
   npm run ios
   ```

## 🏗️ Project Structure

```
Did_It/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── ActionCard.tsx
│   │   └── ProofCard.tsx
│   ├── navigation/       # Navigation configuration
│   │   └── AppNavigator.tsx
│   ├── screens/          # Screen components
│   │   ├── ActionListScreen.tsx
│   │   ├── AddActionScreen.tsx
│   │   ├── ProofListScreen.tsx
│   │   └── AddProofScreen.tsx
│   ├── services/         # Business logic & utilities
│   │   └── storage.ts
│   ├── types/            # TypeScript type definitions
│   │   └── models.ts
│   └── styles/           # Shared styles
├── android/              # Android native code
├── ios/                  # iOS native code
└── App.tsx               # Root component
```

## 📦 Key Dependencies

- **React Native 0.82. 1**:  Core framework
- **React Navigation**: Screen navigation
- **AsyncStorage**: Local data persistence
- **React Native Image Picker**: Camera/gallery access
- **TypeScript**: Type safety

## 💡 Usage Example

1. **Create an Action**
   - Tap the `+` button on the home screen
   - Enter a title (e.g., "Daily Workout")
   - Add an optional description
   - Save the action

2. **Add Proof**
   - Tap on any action card
   - Tap the `+` button to add proof
   - Describe what you did
   - Optionally attach a photo
   - Submit the proof

3. **View History**
   - All proofs are timestamped and saved
   - Browse your proof history for any action

## 🧪 Testing

Run the test suite: 

```bash
npm test
```

## 🛠️ Development

- **Linting**: `npm run lint`
- **TypeScript**: Full type checking enabled
- **Code Style**: ESLint + Prettier configured

## 📄 License

This project is private.  Please contact the maintainer for usage permissions. 

## 👤 Maintainer

**Aditya** ([@Adityadeveloper28](https://github.com/Adityadeveloper28))

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you encounter any issues or have questions: 
- Open an [issue](https://github.com/Adityadeveloper28/Did_It/issues)
- Contact the maintainer directly

## 🙏 Acknowledgments

Built with React Native and powered by the amazing React Native community.

---

**Note**: Make sure you have completed the [React Native environment setup](https://reactnative.dev/docs/environment-setup) before running this project.
