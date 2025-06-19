# SmartFit Pro App

**SmartFit Pro** is a cutting-edge athletic application designed to revolutionize how users approach health and fitness. The app provides real-time performance analytics, personalized challenges, and seamless integration with multiple fitness devices, allowing users to track their progress, set meaningful goals, and achieve peak performance. By connecting to popular fitness devices, SmartFit Pro delivers a holistic experience for users at all fitness levels.

## Features

### 1. Overview:
SmartFit Pro empowers users by offering real-time insights into their fitness journey. With seamless device integration, personalized challenges, and an engaging community environment, users can track their performance, set goals, and improve health metrics.

### 2. Key Functional Areas:

- **Registration Process**:  
  Users create accounts via email, social media, or Single Sign-On (SSO) with fitness services like Samsung Health, Google Fit, or Apple Health. The process includes setting fitness preferences and initial metrics to personalize the app from day one.

- **Activity Feed**:  
  A personal dashboard displaying real-time updates of workouts, fitness activities, and metrics collected from connected devices. Users can track performance over time with intuitive graphs and insights.

- **Events Feed**:  
  This feature showcases upcoming fitness events, challenges, and health webinars. Users can browse, register, or sync events to their calendars, fostering an engaged and motivated community.

- **Connections**:  
  Users can connect with friends and fellow athletes, following each other's progress, sharing tips, and joining challenges. This social aspect strengthens the sense of community within the app.

- **Challenges**:  
  Personalized fitness challenges based on users' goals, skill levels, and connected devices. These adaptive challenges allow users to earn rewards, badges, and community recognition as they achieve milestones.

- **Analytics**:  
  Advanced analytics provide insights into users' health and performance trends. Data from fitness devices is analyzed to give actionable recommendations, covering metrics like heart rate variability, calories burned, sleep patterns, and more.

## Tech Stack

### 1. **Node.js**  
SmartFit Pro uses a Node.js server for backend functionality, enabling robust user management, health data tracking, and third-party service integration.

### Core Features

#### 1. **User Authentication and Authorization**:
- **Manual Login/Signup**:  
  Users can sign up/login using their email and password with secure authentication via hashed passwords and JWT (JSON Web Tokens) for session management.
  
- **Google Login**:  
  OAuth2 integration allows users to log in seamlessly with their Google accounts.

#### 2. **Health Data Management**:
- **Body Metrics**: Tracks weight, height, and BMI.
- **Sleep Patterns**: Monitors daily rest and recovery.
- **Daily Activity Data**: Users can input and track steps, calories burned, and workout data.

#### 3. **Third-Party API Integration**:
- **Terra API**: Fetches fitness data from wearables or third-party health tracking platforms. The server authenticates with Terra and stores user-specific data for analysis and display.

#### 4. **Additional Technologies**:
- **Express.js**: Web framework for building the backend server.
- **MongoDB**: NoSQL database for storing user data and health metrics.
- **JWT Authentication**: Ensures secure user authentication and session management.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/VidushiS1/Smart-Fit-Pro-App.git
   cd Smart-Fit-Pro-App
2. Set up .env File:
    Create a .env file in the root directory of your project and add the following environment variables:
    ```bash
        # Server Configuration
    PORT=3000

    # JWT Authentication
    SECRET_KEY='ExampleSecretKey'
    EXPIRE_KEY='15d'

    # MongoDB Configuration
    MONGODB_URL="mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>?retryWrites=true&w=majority"

    # User Data (Test Data for Development)
    USER_MAIL="example@gmail.com"
    USER_PASSWORD="TEST@@!@KDD"

    # Terra API Keys
    Terra_API_KEY='TESTTERRA'
    Terra_DEV_ID='ExampleTerra'
    Terra_SIGNING_SECRET="ERTYUIIIIIIIIJHG"

    # Session Configuration
    SESSION_SECRET="ExampleSessionSecret"

    # Google OAuth Configuration
    GOOGLE_CLIENT_ID="test.com"
    GOOGLE_CLIENT_SECRET="ddcdssdssd"
    GOOGLE_CALLBACK_URL="http://localhost:3000/auth/google/callback"
    GOOGLE_SUCCESS_URL="http://localhost:3000/dashboard"
    GOOGLE_CANCEL_URL="http://localhost:3000/login"

3. Install dependencies: Install all the necessary dependencies by running:
    ```bash
    npm install

4. Start the server: Once the setup is complete, you can start the server with:
    ```bash
    npm start
