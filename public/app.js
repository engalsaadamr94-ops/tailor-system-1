localStorage.clear();
sessionStorage.clear();

function App() {
  const [page, setPage] = React.useState('login');
  const [users, setUsers] = React.useState(() => {
    const saved = localStorage.getItem('users');
    return saved ? JSON.parse(saved) : [];
  });
  const [newName, setNewName] = React.useState('');
  const [newEmail, setNewEmail] = React.useState('');

  const handleDirectLogin = () => {
    const admin = { id: 1, name: 'المدير', email: 'admin@tailor.local', role: 'admin' };
    localStorage.setItem('user', JSON.stringify(admin));
    setPage('dashboard');
  };

  const addUser = () => {
    if (newName && newEmail) {
      const newUser = { id: Date.now(), name: newName, email: newEmail };
      const updated = [...users, newUser];
      setUsers(updated);
      localStorage.setItem('users', JSON.stringify(updated));
      setNewName('');
      setNewEmail('');
      alert('✓ تم إضافة المستخدم');
    } else {
      alert('أدخل الاسم والبريد');
    }
  };

  const deleteUser = (id) => {
    const updated = users.filter(u => u.id !== id);
    setUsers(updated);
    localStorage.setItem('users', JSON.stringify(updated));
  };

  const logout = () => {
    localStorage.removeItem('user');
    setPage('login');
  };

  if (page === 'login') {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#EEE9DD',
        direction: 'rtl',
        fontFamily: 'Arial'
      }}>
        <div style={{
          padding: '60px 40px',
          textAlign: 'center',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          maxWidth: '400px'
        }}>
          <h1 style={{ fontSize: '52px', color: '#9C7A2E', margin: '0 0 15px 0' }}>مِقياس</h1>
          <p style={{ color: '#666', margin: '0 0 40px 0' }}>نظام إدارة محل الخياطة</p>
          
          <button onClick={handleDirectLogin} style={{
            width: '100%',
            padding: '15px',
            fontSize: '18px',
            backgroundColor: '#9C7A2E',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            marginBottom: '15px'
          }}>
            دخول كمسؤول
          </button>

          <button onClick={() => setPage('manage')} style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#666',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            إدارة المستخدمين
          </button>
        </div>
      </div>
    );
  }

  if (page === 'manage') {
    return (
      <div style={{
        padding: '40px',
        direction: 'rtl',
        fontFamily: 'Arial',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h1 style={{ color: '#9C7A2E' }}>إدارة المستخدمين</h1>

        <div style={{
          backgroundColor: '#f5f5f5',
          padding: '20px',
          borderRadius: '6px',
          marginBottom: '30px'
        }}>
          <h2>إضافة مستخدم جديد</h2>
          <input
            type="text"
            placeholder="الاسم"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            style={{
              display: 'block',
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px',
              border: '1px solid #ddd',
              boxSizing: 'border-box'
            }}
          />
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            style={{
              display: 'block',
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px',
              border: '1px solid #ddd',
              boxSizing: 'border-box'
            }}
          />
          <button onClick={addUser} style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#9C7A2E',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            ✓ إضافة المستخدم
          </button>
        </div>

        <h2>المستخدمين ({users.length})</h2>
        {users.length === 0 ? (
          <p style={{ color: '#999' }}>لا توجد مستخدمين</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#e0e0e0' }}>
                <th style={{ padding: '10px', textAlign: 'right' }}>الاسم</th>
                <th style={{ padding: '10px', textAlign: 'right' }}>البريد</th>
                <th style={{ padding: '10px' }}>حذف</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '10px' }}>{user.name}</td>
                  <td style={{ padding: '10px' }}>{user.email}</td>
                  <td style={{ padding: '10px' }}>
                    <button onClick={() => deleteUser(user.id)} style={{
                      padding: '5px 10px',
                      backgroundColor: '#d32f2f',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer'
                    }}>
                      ✕ حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <button onClick={() => setPage('login')} style={{
          marginTop: '30px',
          padding: '10px 20px',
          backgroundColor: '#666',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          ← رجوع
        </button>
      </div>
    );
  }

  return (
    <div style={{
      padding: '40px',
      textAlign: 'center',
      direction: 'rtl',
      fontFamily: 'Arial'
    }}>
      <h1 style={{ color: '#9C7A2E' }}>أهلاً بك في مِقياس!</h1>
      <p>النظام جاهز للاستخدام</p>

      <button onClick={logout} style={{
        marginTop: '30px',
        padding: '12px 30px',
        backgroundColor: '#d32f2f',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px'
      }}>
        تسجيل الخروج
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
