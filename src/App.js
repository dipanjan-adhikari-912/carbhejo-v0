import React from 'react';

function App() {
  console.log('App component rendering...');
  
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>CarBhejo - Car Transport Service</h1>
      <p>If you can see this, the app is working!</p>
      <div style={{ marginTop: '20px' }}>
        <button style={{ padding: '10px 20px', margin: '5px' }}>Book Transport</button>
        <button style={{ padding: '10px 20px', margin: '5px' }}>Track Order</button>
      </div>
    </div>
  );
}

export default App;
