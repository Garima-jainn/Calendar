import React from "react";
import Calendar from "./components/Calendar";

function App() {
  return (
    <div className="h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 font-sans text-gray-800 " >
      <h1 className="text-2xl font-bold mb-4 text-center">Calendar</h1>
      
      <Calendar />
    </div>
  );
}

export default App;
