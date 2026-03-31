import { Toaster } from "react-hot-toast";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto mt-10 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Chào mừng đến với WEB2091</h1>
      </div>

      <Toaster />
    </>
  );
}

export default App;
