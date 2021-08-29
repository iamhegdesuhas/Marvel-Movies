import "./scss/App.scss";
import { lazy, Suspense } from "react";
const SearchPage=lazy(()=>import("./pages/search-page/SearchPage"))
function App() {
  return (
    <div className="mcu">
      <div className="center">
        <Suspense
          fallback={
            <div>
              <span>Loading...</span>
            </div>
          }
        >
          <SearchPage />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
