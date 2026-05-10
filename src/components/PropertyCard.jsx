// 物件情報を表示するカード。編集・削除ボタン付き
export default function PropertyCard({ property, onEdit, onDelete }) {
  return (
    <div style={styles.card}>
      <div style={styles.body}>
        <h3 style={styles.name}>{property.name}</h3>
        <p style={styles.meta}>📍 {property.area}</p>
        <p style={styles.meta}>🏠 {property.floor_plan}</p>
        <p style={styles.rent}>¥{property.rent.toLocaleString()} / 月</p>
      </div>
      <div style={styles.actions}>
        <button onClick={() => onEdit(property)} style={styles.editButton}>
          編集
        </button>
        <button onClick={() => onDelete(property)} style={styles.deleteButton}>
          削除
        </button>
      </div>
    </div>
  )
}

const styles = {
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '16px',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  name: {
    fontSize: '17px',
    fontWeight: '600',
    color: '#1a1a1a',
  },
  meta: {
    fontSize: '14px',
    color: '#666',
  },
  rent: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#4f46e5',
    marginTop: '4px',
  },
  actions: {
    display: 'flex',
    gap: '8px',
  },
  editButton: {
    flex: 1,
    padding: '8px',
    backgroundColor: '#f3f4f6',
    color: '#333',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  deleteButton: {
    flex: 1,
    padding: '8px',
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
  },
}
