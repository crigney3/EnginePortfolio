import logo from './logo.svg';
import './App.css';
import { SHOEProject, ThisWebsite, MinecraftCharityStream, UnrealLIDAR } from './data/DefaultProjects';
import Navbar from './Navbar/Navbar';
import Engine from './Engine/Engine';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Engine />
      <SHOEProject />
      <ThisWebsite />
      <MinecraftCharityStream />
      <UnrealLIDAR />
    </div>
  );

}

export default App;
