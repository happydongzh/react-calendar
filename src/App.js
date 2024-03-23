import './App.css';

import CalendarContextProvider from './components/context/Calendar.context';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <div className="App">
      <CalendarContextProvider>
        <Layout />
      </CalendarContextProvider>
    </div>
  );
}

export default App;
