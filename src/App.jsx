import UseGetLocation from "./Hooks/UseGetLocation";

function App() {
  const { latitude, longitude, error } = UseGetLocation();

  return (
    <div>
      <h1>Geolocation Example</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {latitude && longitude ? (
        <p>
          Latitude: {latitude}, Longitude: {longitude}
        </p>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
}

export default App;
