# CricBuzz - Cricket Match Scoring Dashboard

## Project Description
CricBuzz is a web application for managing and scoring cricket matches in real-time. It provides a dashboard to initialize matches, select players, record deliveries (balls), update scores, and view live commentary logs. The project consists of a backend API server and a frontend React application.

## Technologies Used
- **Backend:** Node.js, Express, MongoDB, TypeScript
- **Frontend:** React, Vite, JavaScript, Axios

## Project Structure

### Backend
- `server.ts`: Entry point that loads environment variables, connects to MongoDB, and starts the Express server.
- `app.ts`: Sets up Express app with middleware and routes.
- `routes/scoreRoutes.ts`: Defines API routes for match operations.
- `controllers/scoreController.ts`: Implements logic for match initialization, adding deliveries, fetching match data, and undoing deliveries.
- `models/Match.ts`: MongoDB schema and model for match data.
- `utils/scoringLogic.ts`: Contains core logic to update scores and player statistics based on deliveries.

### Frontend
- `main.jsx`: React app entry point that renders the main `App` component.
- `App.jsx`: Main component managing match state, initializing matches, fetching data, and rendering UI components.
- `components/`: Contains React components such as `PlayerSelections`, `ActionsGrid`, `ScorePanel`, `CommentaryLog`, and `HeaderTabs`.
- `services/api.jsx`: Provides functions to interact with backend API endpoints for match operations.

## Backend Flow
1. The server starts by connecting to MongoDB and initializing the Express app.
2. API routes under `/api/match` handle:
   - `POST /init`: Initialize a new match with teams and players.
   - `POST /:id/delivery`: Add a delivery (ball) to the match.
   - `GET /:id`: Fetch match details.
   - `PATCH /:id/undo`: Undo the last delivery.
3. Controllers interact with the Match model and update scores using the scoring logic.
4. The scoring logic updates total runs, wickets, overs, and player statistics like batting and bowling figures.

## Frontend Flow
1. The React app initializes and renders the main `App` component.
2. Users can start a new match with default teams and players.
3. The app fetches match data from the backend and manages selected players (striker, non-striker, bowler).
4. Users can record deliveries and update the match state via UI components.
5. The `ScorePanel` displays the current score, and `CommentaryLog` shows the ball-by-ball commentary.
6. The frontend communicates with the backend using API service functions in `services/api.jsx`.

## How to Run the Project

### Backend
1. Navigate to the `backend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with necessary environment variables (e.g., MongoDB URI, PORT).
4. Start the backend server:
   ```
   npm run dev
   ```

### Frontend
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the frontend development server:
   ```
   npm run dev
   ```
4. Open the app in your browser at the URL provided by Vite (usually `http://localhost:3000`).

## How to Use the App
- Click "Start New Match" to initialize a new cricket match.
- Select the striker, non-striker, and bowler players.
- Use the action grid to record deliveries and update the score.
- View the live score and commentary log on the dashboard.
- Undo the last delivery if needed.

## License
This project is open source and available under the MIT License.
