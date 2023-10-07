import logo from './logo.svg';
import './App.css';
import { SHOEProject, ThisWebsite, MinecraftCharityStream, UnrealLIDAR } from './data/DefaultProjects';

function App() {
  return (
    <div className="App">
      <SHOEProject />
      <ThisWebsite />
      <MinecraftCharityStream />
      <UnrealLIDAR />
    </div>
  );

}

export default App;
