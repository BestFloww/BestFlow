import { useSelector } from 'react-redux';
import MainPage from "./components/MainPage.jsx";
import AnalysisPage from "./components/AnalysisPage.jsx";

function App() {
  const page = useSelector((state) => state.switchPage.page);

  return (
    <div>
      {page === "MainPage" && <MainPage />}
      {page === "AnalysisPage" && <AnalysisPage />}
    </div>
  );
}

export default App;
