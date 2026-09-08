function App() {
  const user = localStorage.getItem('user');
  
  if (!user) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#EEE9DD',
        direction: 'rtl'
      }}>
        <div style={{
          padding: '40px',
          textAlign: 'center',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{ fontSize: '48px', color: '#9C7A2E', margin: '0 0 10px 0' }}>مِقياس</h1>
          <p style={{ color: '#666', margin: '0 0 30px 0' }}>نظام إدارة محل الخياطة الرجالية</p>
          <button onClick={() => {
            localStorage.setItem('user', JSON.stringify({ id: 1, name: 'المدير', role: 'admin' }));
            window.location.reload();
          }} style={{
            padding: '15px 40px',
            fontSize: '18px',
            backgroundColor: '#9C7A2E',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            دخول كمسؤول
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>أهلاً!</h1>
      <p>لوحة التحكم جاهزة قريباً...</p>
      <button onClick={() => {
        localStorage.clear();
        window.location.reload();
      }} style={{
        padding: '10px 20px',
        backgroundColor: '#d32f2f',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>
        تسجيل الخروج
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
