import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { useAuth } from '../context/AuthContext'
import PropertyCard from '../components/PropertyCard'
import PropertyForm from '../components/PropertyForm'

export default function PropertiesPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [properties, setProperties] = useState([])
  const [fetchLoading, setFetchLoading] = useState(true)
  const [formLoading, setFormLoading] = useState(false)
  const [error, setError] = useState(null)

  // フォームの表示制御：null=非表示、'new'=新規、object=編集対象物件
  const [formTarget, setFormTarget] = useState(null)

  // ========== SELECT：ログインユーザーの物件を取得 ==========
  const fetchProperties = async () => {
    setFetchLoading(true)
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setError('物件の取得に失敗しました')
    } else {
      setProperties(data)
    }
    setFetchLoading(false)
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  // ========== INSERT：物件を新規登録 ==========
  const handleCreate = async (formData) => {
    setFormLoading(true)
    const { error } = await supabase
      .from('properties')
      .insert({ ...formData, user_id: user.id })

    if (error) {
      setError('登録に失敗しました')
    } else {
      setFormTarget(null)
      await fetchProperties()
    }
    setFormLoading(false)
  }

  // ========== UPDATE：物件情報を更新 ==========
  const handleUpdate = async (formData) => {
    setFormLoading(true)
    const { error } = await supabase
      .from('properties')
      .update(formData)
      .eq('id', formTarget.id)

    if (error) {
      setError('更新に失敗しました')
    } else {
      setFormTarget(null)
      await fetchProperties()
    }
    setFormLoading(false)
  }

  // ========== DELETE：物件を削除 ==========
  const handleDelete = async (property) => {
    if (!window.confirm(`「${property.name}」を削除しますか？`)) return

    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', property.id)

    if (error) {
      setError('削除に失敗しました')
    } else {
      await fetchProperties()
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div style={styles.page}>
      {/* ヘッダー */}
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>不動産管理アプリ</h1>
        <div style={styles.headerRight}>
          <span style={styles.email}>{user?.email}</span>
          <button onClick={handleLogout} style={styles.logoutButton}>
            ログアウト
          </button>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main style={styles.main}>
        <div style={styles.toolbar}>
          <h2 style={styles.sectionTitle}>物件一覧</h2>
          <button onClick={() => setFormTarget('new')} style={styles.addButton}>
            ＋ 物件を追加
          </button>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        {fetchLoading ? (
          <p style={styles.message}>読み込み中...</p>
        ) : properties.length === 0 ? (
          <p style={styles.message}>登録された物件はありません。</p>
        ) : (
          <div style={styles.grid}>
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onEdit={(p) => setFormTarget(p)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {/* 新規登録・編集フォームモーダル */}
      {formTarget !== null && (
        <PropertyForm
          initial={formTarget === 'new' ? null : formTarget}
          onSubmit={formTarget === 'new' ? handleCreate : handleUpdate}
          onCancel={() => setFormTarget(null)}
          loading={formLoading}
        />
      )}
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
  },
  header: {
    backgroundColor: '#4f46e5',
    color: 'white',
    padding: '16px 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: '20px',
    fontWeight: '700',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  email: {
    fontSize: '14px',
    opacity: 0.9,
  },
  logoutButton: {
    padding: '8px 16px',
    backgroundColor: 'white',
    color: '#4f46e5',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  main: {
    padding: '32px',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  sectionTitle: {
    fontSize: '22px',
    color: '#1a1a1a',
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  error: {
    color: '#dc2626',
    marginBottom: '16px',
    fontSize: '14px',
  },
  message: {
    color: '#666',
    fontSize: '15px',
  },
}
