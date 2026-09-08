localStorage.clear();
sessionStorage.clear();

function UsersManager() {
  const [users, setUsers] = React.useState(() => {
    const saved = localStorage.getItem('users');
    return saved ? JSON.parse(saved) : [];
  });
  const [newUser, setNewUser] = React.useState({ name: '', email: '', password: '' });

  const addUser = () => {
    if (newUser.name && newUser.email && newUser.password) {
      const user = { id: Date.now(), ...newUser };
      const updated = [...users, user];
      setUsers(updated);
      localStorage.setItem('users', JSON.stringify(updated));
      setNewUser({ name: '', email: '', password: '' });
      alert('تم إضافة المستخدم بنجاح');
    }
  };

  const deleteUser = (id) => {
    const updated = users.filter(u => u.id !== id);
    setUsers(updated);
    localStorage.setItem('users', JSON.stringify(updated));
  };

  return (
    <div style={{ padding: '40px', direction: 'rtl', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#9C7A2E' }}>إدارة المستخدمين</h1>
      
      <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '6px', marginBottom: '30px' }}>
        <h2>إضافة مستخدم جديد</h2>
        <input
          type="text"
          placeholder="الاسم"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          style={{ display: 'block', padding: '10px', marginBottom: '10px', width: '300px' }}
        />
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          style={{ display: 'block', padding: '10px', marginBottom: '10px', width: '300px' }}
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          style={{ display: 'block', padding: '10px', marginBottom: '10px', width: '300px' }}
        />
        <button onClick={addUser} style={{
          padding: '10px 20px',
          backgroundColor: '#9C7A2E',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          إضافة المستخدم
        </button>
      </div>

      <h2>قائمة المستخدمين ({users.length})</h2>
      {users.length === 0 ? (
        <p style={{ color: '#999' }}>لا توجد مستخدمين حالياً</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#e0e0e0' }}>
              <th style={{ padding: '10px', textAlign: 'right' }}>الاسم</th>
              <th style={{ padding: '10px', textAlign: 'right' }}>البريد</th>
              <th style={{ padding: '10px', textAlign: 'right' }}>كلمة المرور</th>
              <th style={{ padding: '10px' }}>حذف</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px' }}>{user.name}</td>
                <td style={{ padding: '10px' }}>{user.email}</td>
                <td style={{ padding: '10px' }}>••••••••</td>
                <td style={{ padding: '10px' }}>
                  <button onClick={() => deleteUser(user.id)} style={{
                    padding: '5px 10px',
                    backgroundColor: '#d32f2f',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer'
                  }}>
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function App() {
  const [page, setPage] = React.useState('login');
  const [user, setUser] = React.useState(null);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    
    if (found) {
      setUser(found);
      setPage('dashboard');
      setEmail('');
      setPassword('');
    } else {
      alert('بيانات دخول خاطئة');
    }
  };

  if (!user) {
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
        <form onSubmit={handleLogin} style={{
          padding: '60px 40px',
          textAlign: 'center',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          maxWidth: '400px'
        }}>
          <h1 style={{ fontSize: '52px', color: '#9C7A2E', margin: '0 0 15px 0' }}>مِقياس</h1>
          <p style={{ color: '#666', margin: '0 0 30px 0' }}>تسجيل الدخول</p>
          
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ddd' }}
          />
          
          <button type="submit" style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#9C7A2E',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px'
          }}>
            دخول
          </button>

          <button type="button" onClick={() => setPage('manage')} style={{
            marginTop: '15px',
            padding: '10px',
            backgroundColor: '#666',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '100%'
          }}>
            إدارة المستخدمين
          </button>
        </form>
      </div>
    );
  }

  if (page === 'manage') {
    return <UsersManager />;
  }

  return (
    <div style={{ padding: '40px', direction: 'rtl', textAlign: 'center' }}>
      <h1>أهلاً {user.name}!</h1>
      <button onClick={() => { setUser(null); setPage('login'); }} style={{
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
