const SUPABASE_URL = 'https://yyfbkcltst.supabase.co';
const SUPABASE_KEY = 'sb_publishable_4ch_UXQardy7Ezore0JrcA_Z8BPk...';

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

    const options = { method, headers };
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
            cursor: loading ? 'not-allowed' :
