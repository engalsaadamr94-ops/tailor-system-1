const SUPABASE_URL = 'YOUR_SUPABASE_URL'; // https://yyfybkcfktstvlcibndn.supabase.co/rest/v1/
const SUPABASE_KEY = 'YOUR_ANON_KEY'; // sb_publishable_4ch_UXQardyT0zoreWJrcA_Z80PkhOJ

class SupabaseClient {
  constructor(url, key) {
    this.url = url;
    this.key = key;
  }

  async query(table, method = 'GET', data = null) {
    const headers = {
      'Content-Type': 'application/json',
      'apikey': this.key,
      'Authorization': `Bearer ${this.key}`
    };

    const options = {
      method,
      headers
    };

    if (data) options.body = JSON.stringify(data);

    const response = await fetch(`${this.url}/rest/v1/${table}`, options);
    return response.json();
  }

  async getUsers() {
    return this.query('users?order=id.desc');
  }

  async addUser(name, email) {
    return this.query('users', 'POST', { name, email, password: 'Tailor@2026', role: 'staff' });
  }

  async deleteUser(id) {
    return this.query(`users?id=eq.${id}`, 'DELETE');
  }

  async loginUser(email, password) {
    const response = await this.query(`users?email=eq.${email}&password=eq.${password}`);
    return response.length > 0 ? response[0] : null;
  }
}

const supabase = new SupabaseClient(SUPABASE_URL, SUPABASE_KEY);

function App() {
  const [page, setPage] = React.useState('login');
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [newName, setNewName] = React.useState('');
  const [newEmail, setNewEmail] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // تحميل المستخدمين من Supabase
  const loadUsers = async () => {
    setLoading(true);
    const data = await supabase.getUsers();
    setUsers(data || []);
    setLoading(false);
  };

  React.useEffect(() => {
    loadUsers();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = await supabase.loginUser(email, password);
    setLoading(false);

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setPage('dashboard');
      setEmail('');
      setPassword('');
    } else {
      alert('❌ بيانات دخول خاطئة');
    }
  };

  const addUser = async () => {
    if (!newName || !newEmail) {
      alert('أدخل الاسم والبريد');
      return;
    }

    setLoading(true);
    const result = await supabase.addUser(newName, newEmail);
    setLoading(false);

    if (result && !result.error) {
      alert('✓ تم إضافة المستخدم بنجاح');
      setNewName('');
      setNewEmail('');
      loadUsers();
    } else {
      alert('❌ خطأ: ' + (result.error?.message || 'فشل الإضافة'));
    }
  };

  const deleteUser = async (id) => {
    if (confirm('هل تأكد من حذف هذا المستخدم؟')) {
      setLoading(true);
      await supabase.deleteUser(id);
      setLoading(false);
      loadUsers();
    }
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
        direction: 'rtl'
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
            disabled={loading}
            style={{
              display: 'block',
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              borderRadius: '5px',
              border: '1px solid #ddd'
            }}
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            style={{
              display: 'block',
              width: '100%',
              padding: '10px',
              marginBottom: '20px',
              borderRadius: '5px',
              border: '1px solid #ddd'
            }}
          />

          <button type="submit" disabled={loading} style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#9C7A2E',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            fontSize: '16px'
          }}>
            {loading ? '⏳ جاري الدخول...' : '✓ دخول'}
          </button>

          <button type="button" onClick={() => setPage('manage')} disabled={loading} style={{
            marginTop: '15px',
            width: '100%',
            padding: '10px',
            backgroundColor: '#666',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}>
            ⚙️ إدارة المستخدمين
          </button>
        </form>
      </div>
    );
  }

  if (page === 'manage') {
    return (
      <div style={{
        padding: '40px',
        direction: 'rtl',
        maxWidth: '900px',
        margin: '0 auto',
        fontFamily: 'Arial'
      }}>
        <h1 style={{ color: '#9C7A2E', marginBottom: '30px' }}>إدارة المستخدمين</h1>

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
            disabled={loading}
            style={{
              display: 'block',
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px',
              border: '1px solid #ddd'
            }}
          />
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            disabled={loading}
            style={{
              display: 'block',
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '5px',
              border: '1px solid #ddd'
            }}
          />
          <button onClick={addUser} disabled={loading} style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#9C7A2E',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }}>
            {loading ? '⏳ جاري...' : '✓ إضافة المستخدم'}
          </button>
        </div>

        <h2>المستخدمين ({users.length})</h2>
        {loading ? (
          <p>⏳ جاري التحميل...</p>
        ) : users.length === 0 ? (
          <p style={{ color: '#999' }}>لا توجد مستخدمين</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#e0e0e0' }}>
                <th style={{ padding: '10px', textAlign: 'right' }}>الاسم</th>
                <th style={{ padding: '10px', textAlign: 'right' }}>البريد</th>
                <th style={{ padding: '10px', textAlign: 'right' }}>الصلاحية</th>
                <th style={{ padding: '10px' }}>حذف</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '10px' }}>{user.name}</td>
                  <td style={{ padding: '10px' }}>{user.email}</td>
                  <td style={{ padding: '10px' }}>{user.role === 'admin' ? '👑 مدير' : '👤 موظف'}</td>
                  <td style={{ padding: '10px' }}>
                    <button onClick={() => deleteUser(user.id)} disabled={loading} style={{
                      padding: '5px 10px',
                      backgroundColor: '#d32f2f',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: loading ? 'not-allowed' : 'pointer'
                    }}>
                      ✕ حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <button onClick={() => setPage('login')} disabled={loading} style={{
          marginTop: '30px',
          padding: '10px 20px',
          backgroundColor: '#666',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}>
          ← رجوع
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', textAlign: 'center', direction: 'rtl' }}>
      <h1 style={{ color: '#9C7A2E' }}>أهلاً بك في مِقياس! ✓</h1>
      <p style={{ marginTop: '20px', color: '#666' }}>النظام متصل بـ Supabase بنجاح</p>
      <button onClick={logout} style={{
        marginTop: '30px',
        padding: '12px 30px',
        backgroundColor: '#d32f2f',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>
        🚪 تسجيل الخروج
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
