// app.js — تطبيق مِقياس متكامل (React عبر CDN)
function LoginScreen({ onLogin }) {
  const handleLogin = (e) => {
    e.preventDefault();
    const mockUser = { id: 1, name: 'المدير', email: 'admin@tailor.local', role: 'admin' };
    localStorage.setItem('token', 'admin-token');
    localStorage.setItem('user', JSON.stringify(mockUser));
    onLogin(mockUser);
  };

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

function Sidebar({ user, onNavigate, currentPage }) {
  return (
    <div style={{ width: '200px', backgroundColor: '#f5f5f5', padding: '20px', minHeight: '100vh' }}>
      <h3>{user.name}</h3>
      <p>{user.role === 'admin' ? 'مدير' : 'موظف'}</p>
      <hr />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button onClick={() => onNavigate('dashboard')} style={{
          padding: '10px',
          backgroundColor: currentPage === 'dashboard' ? '#9C7A2E' : '#e0e0e0',
          color: currentPage === 'dashboard' ? 'white' : 'black',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>📊 لوحة التحكم</button>
        <button onClick={() => onNavigate('customers')} style={{
          padding: '10px',
          backgroundColor: currentPage === 'customers' ? '#9C7A2E' : '#e0e0e0',
          color: currentPage === 'customers' ? 'white' : 'black',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>👥 العملاء</button>
        <button onClick={() => onNavigate('orders')} style={{
          padding: '10px',
          backgroundColor: currentPage === 'orders' ? '#9C7A2E' : '#e0e0e0',
          color: currentPage === 'orders' ? 'white' : 'black',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>📋 الطلبات</button>
        <button onClick={() => onNavigate('users')} style={{
          padding: '10px',
          backgroundColor: currentPage === 'users' ? '#9C7A2E' : '#e0e0e0',
          color: currentPage === 'users' ? 'white' : 'black',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>👤 المستخدمون</button>
        <button onClick={() => {
          localStorage.clear();
          window.location.reload();
        }} style={{
          padding: '10px',
          backgroundColor: '#d32f2f',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px'
        }}>🚪 تسجيل الخروج</button>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>لوحة التحكم</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
          <h3>إجمالي العملاء</h3>
          <p style={{ fontSize: '24px', color: '#9C7A2E' }}>0</p>
        </div>
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
          <h3>الطلبات الجديدة</h3>
          <p style={{ fontSize: '24px', color: '#9C7A2E' }}>0</p>
        </div>
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
          <h3>المبيعات اليومية</h3>
          <p style={{ fontSize: '24px', color: '#9C7A2E' }}>0 ر.س</p>
        </div>
      </div>
    </div>
  );
}

function CustomersPage() {
  const [customers, setCustomers] = React.useState([]);
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');

  const addCustomer = () => {
    if (name && phone) {
      setCustomers([...customers, { id: Date.now(), name, phone }]);
      setName('');
      setPhone('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>العملاء</h2>
      <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '5px', marginBottom: '20px' }}>
        <input type="text" placeholder="الاسم" value={name} onChange={(e) => setName(e.target.value)} style={{ padding: '10px', marginRight: '10px', width: '200px' }} />
        <input type="text" placeholder="الهاتف" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ padding: '10px', marginRight: '10px', width: '150px' }} />
        <button onClick={addCustomer} style={{ padding: '10px 20px', backgroundColor: '#9C7A2E', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>إضافة</button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#e0e0e0' }}>
            <th style={{ padding: '10px', textAlign: 'right' }}>الاسم</th>
            <th style={{ padding: '10px', textAlign: 'right' }}>الهاتف</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{customer.name}</td>
              <td style={{ padding: '10px' }}>{customer.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OrdersPage() {
  const [orders, setOrders] = React.useState([]);
  const [orderNum, setOrderNum] = React.useState('');
  const [status, setStatus] = React.useState('new');

  const addOrder = () => {
    if (orderNum) {
      setOrders([...orders, { id: Date.now(), orderNum, status }]);
      setOrderNum('');
