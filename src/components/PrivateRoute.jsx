import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// 未ログインの場合はログイン画面にリダイレクト
export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        読み込み中...
      </div>
    )
  }

  return user ? children : <Navigate to="/login" replace />
}
