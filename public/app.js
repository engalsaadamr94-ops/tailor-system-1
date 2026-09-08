// Reset اللوحة والبدء من جديد
localStorage.clear();
sessionStorage.clear();

function App() {
  const handleLogin = () => {
    const newUser = {
      id: 1,
      name: 'مدير النظام',
      email: 'admin@tailor.local',
      role: 'admin'
    };
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('token', 'admin-' + Date.now());
    window.location.reload();
  };

  const user = localStorage.getItem('user');

  if (!user) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#EEE9DD',
        direction: 'rtl',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          padding: '60px 40px',
          textAlign: 'center',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          maxWidth: '400px'
        }}>
          <h1 style={{
            fontSize: '52px',
            color: '#9C7A2E',
            margin: '0 0 15px 0',
            fontWeight: 'bold'
          }}>مِقياس</h1>
          
          <p style={{
            color: '#666',
            margin: '0 0 10px 0',
            fontSize: '14px'
          }}>نظام إدارة محل الخياطة الرجالية</p>
          
          <p style={{
            color: '#999',
            margin: '0 0 40px 0',
            fontSize: '12px'
          }}>تسجيل الدخول الموحد للإدارة والموظفين</p>
          
          <button onClick={handleLogin} style={{
            width: '100%',
            padding: '16px',
            fontSize: '18px',
            fontWeight: 'bold',
            backgroundColor: '#9C7A2E',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.3s',
            boxShadow: '0 2px 8px rgba(156, 122, 46, 0.3)'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#7C6224'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#9C7A2E'}
          >
            دخول كمسؤول
          </button>
          
          <p style={{
            marginTop: '30px',
            fontSize: '11px',
            color: '#999'
          }}>جميع البيانات تم مسحها ✓</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#EEE9DD',
      padding: '40px',
      direction: 'rtl',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#9C7A2E', marginBottom: '20px' }}>أهلاً {JSON.parse(user).name}!</h1>
        
        <div style={{
          backgroundColor: '#f5f5f5',
          padding: '20px',
          borderRadius: '6px',
          marginBottom: '30px'
        }}>
          <p style={{ color: '#666', marginBottom: '10px' }}>✓ تم حذف جميع البيانات السابقة</p>
          <p style={{ color: '#666', marginBottom: '10px' }}>✓ يمكنك الآن البدء من جديد</p>
          <p style={{ color: '#999', fontSize: '12px', margin: '0' }}>النظام جاهز للاستخدام الفوري</p>
        </div>
        
        <button onClick={() => {
          localStorage.clear();
          window.location.reload();
        }} style={{
          padding: '12px 30px',
          backgroundColor: '#d32f2f',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold'
        }}>
          تسجيل الخروج والبدء من جديد
        </button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
