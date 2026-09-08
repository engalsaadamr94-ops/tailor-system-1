function App() {
  const [user, setUser] = React.useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const mockUser = { id: 1, name: 'المدير', email: 'admin@tailor.local', role: 'admin' };
    localStorage.setItem('token', 'admin-token');
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  if (!user) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', marginTop: '100px' }}>
        <h1 style={{ fontSize: '48px', color: '#9C7A2E' }}>مِقياس</h1>
        <p>نظام إدارة محل الخياطة الرجالية</p>
        <button onClick={handleLogin} style={{
          padding: '15px 30px',
          fontSize: '18px',
          backgroundColor: '#9C7A2E',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px'
        }}>
          دخول كمسؤول
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>أهلاً {user.name}!</h1>
      <p>لوحة التحكم تحت الإنشاء...</p>
      <button onClick={() => {
        localStorage.clear();
        window.location.reload();
      }} style={{
        padding: '10px 20px',
        backgroundColor: '#d32f2f',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px'
      }}>
        تسجيل الخروج
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
