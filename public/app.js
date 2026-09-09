const SUPABASE_URL = 'https://yyfybkcfktstvlcibndn.supabase.co';
const SUPABASE_KEY = 'sb_publishable_4ch_UXQardyT0zoreWJrcA_Z80PkhOJ';

class SupabaseClient {
  constructor(url, key) {
    this.url = url;
    this.key = key;
  }

  async query(table, method = 'GET', data = null, filters = '') {
    const headers = {
      'Content-Type': 'application/json',
      'apikey': this.key,
      'Authorization': `Bearer ${this.key}`
    };

    const options = { method, headers };
    if (data) options.body = JSON.stringify(data);

    const url = filters ? `${this.url}/rest/v1/${table}${filters}` : `${this.url}/rest/v1/${table}`;
    
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Supabase Error:', error);
      return { error: error.message };
    }
  }

  async getUsers() {
    return this.query('users', 'GET', null, '?order=id.desc');
  }

  async addUser(name, email) {
    return this.query('users', 'POST', { name, email, password: 'Tailor@2026', role: 'staff' });
  }

  async deleteUser(id) {
    return this.query('users', 'DELETE', null, `?id=eq.${id}`);
  }

  async loginUser(email, password) {
    const response = await this.query('users', 'GET', null, `?email=eq.${email}&password=eq.${password}`);
    return response && response.length > 0 ? response[0] : null;
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
    if (Array.isArray(data)) {
      setUsers(data);
    }
    setLoading(false);
  };
