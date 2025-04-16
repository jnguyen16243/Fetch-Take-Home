Fetch-Take-Home

This is a React + Node.js application that allows users to browse available dogs for adoption and match with one based on their favorites.

🔗 Live Demo: fetch-take-home-client.vercel.app (Back-end is hosted on free Render so requests may be delayed if the server is inactive)

Getting Started
Backend Setup

    Navigate to the backend directory:

cd fetch-dog-backend

Install dependencies:

npm install

Start the server:

    npm run dev

Frontend Setup

    Navigate to the frontend directory:

cd fetch-dog-app

Install dependencies:

npm install

Start the React app:

    npm run start

 Running Tests

To run the test suite, use:

npm run test

 How to Use
Login

    Enter any string for the username.
    Enter any valid email format (e.g., joe@mail.com).

Favoriting & Matching

    Click the heart icon ❤️ on a dog to favorite it.
    Click "Match" to find a match from your favorited dogs.

 Known Issues
Infinite Scroll Re-Fetching

    Infinite scroll re-fetches the same results repeatedly because the loading animation is forced to play.
    The last element stays in view too long, causing re-fetching.

 State Filter Cannot Be Cleared

    The State dropdown does not allow selecting "No State."
You can login on mobile, but no dogs load. 


 TODO
Optimizations

Clicking ascending/descending sort should call the server for a sorted list instead of sorting locally.
Implement caching for sorted results.
 User Experience Improvements

Improve error handling and display messages to users instead of logging to the console.
 Notes

    Hosted frontend on Vercel and backend on Render.
    Uses CORS + cookies for authentication.
