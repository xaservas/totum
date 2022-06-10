import Header from "../Header/Header";
import Profile from "../Profile/Profile";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header/>
        <h1>Salut les blobs</h1>
        <button class="button is-success is-outlined">Outlined</button>
        <Profile/>
      </header>
    </div>
  );
}

export default App;
