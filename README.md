## Inspirational Quotes App  

A **React Native app** that displays an **inspirational quote** each day. Users can **mark their favorite quotes**, **remove them**, and manage their list effortlessly. Built using **React Native (Expo)**, **TypeScript**, and **AsyncStorage** for local data persistence.  


## Features  

✅ **Fetch Daily Quotes** – Retrieves inspirational quotes from an API.  
✅ **Mark Favorite Quotes** – Users can save quotes they like.  
✅ **Remove Quotes** – Delete individual quotes using a cross ❌ button.  
✅ **Restart List** – Clear all saved quotes at once.  
✅ **Persistent Storage** – Uses AsyncStorage to store favorite quotes.  


## Tech Stack  

- **React Native (Expo)**
- **TypeScript**
- **React Navigation**
- **AsyncStorage** (for local data storage)
- **Axios** (for API requests)



## Screenshots  

<img width="478" alt="home" src="https://github.com/user-attachments/assets/b698afb5-1491-4b2c-b328-8e74f8940b3f" />  
<img width="475" alt="list" src="https://github.com/user-attachments/assets/5e792217-8467-4e41-b066-22a31695cfac" />  
<img width="476" alt="fav" src="https://github.com/user-attachments/assets/dbdf273f-2180-4a6f-aa61-9f35df454ddb" />  


## Installation & Setup  

### 1️⃣ **Clone the Repository**  
```sh
git clone https://github.com/Kshitijasharma/App_dailyQuote.git
cd app
```

### 2️⃣ **Install Dependencies**  
```sh
npm install
```
or  
```sh
yarn install
```

### 3️⃣ **Start the Expo Server**  
```sh
npm start
```
or  
```sh
expo start
```

### 4️⃣ **Run on an Emulator or Real Device**  
- Scan the QR Code in **Expo Go (Android)**  
- Open the app in **iOS Simulator (Mac only)** using `i`  
- Run on **Android Emulator** using `a`  

---

## Project Structure  

```
/EXPO_FINAL
│── .expo                 # Expo configuration files  
│── app  
│   │── _tests_           # Unit tests for components  
│   │── (tabs)            # Navigation tabs  
│   │── explore.tsx       # Explore quotes screen  
│   │── favorites.tsx     # Favorites screen  
│   │── index.tsx         # Home screen  
│   │── +not-found.tsx    # 404 Page  
│── assets                # Static images and icons  
│── components            # Reusable UI components  
│── constants             # Constant values used in the app  
│── hooks                 # Custom React hooks  
│── node_modules          # Dependencies  
│── scripts               # Utility scripts  
│── app.json              # Expo configuration  
│── package.json          # Dependencies and scripts  
│── tsconfig.json         # TypeScript configuration  
│── README.md             # Project documentation  
│── .gitignore            # Files to be ignored in Git  
```

---

## API Reference  

This app fetches quotes from **ZenQuotes API**:  

📌 **Endpoint:**  
```sh
https://zenquotes.io/api/today
```

📌 **Example Response:**  
```json
[
  {
    "q": "Be yourself; everyone else is already taken.",
    "a": "Oscar Wilde"
  }
]
```

---

## Future Improvements  

✅ Add **search functionality** for quotes  
✅ Implement **dark mode**  
✅ Support **multiple categories of quotes**  
✅ Add **user authentication** to sync favorites across devices  

---

## Contributing  

Want to improve this app? Feel free to submit a **pull request**!  

1. **Fork the repo**  
2. **Create a new branch** (`git checkout -b feature-name`)  
3. **Make your changes**  
4. **Commit & push** (`git commit -m "Added new feature"`)  
5. **Open a pull request**  

---

## License  

This project is licensed under the **MIT License**.  

Adding a small line to leanr the basic commands of git version using this repo for practical learning.