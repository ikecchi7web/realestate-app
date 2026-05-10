// 物件の新規登録・編集に共用するフォームモーダル
export default function PropertyForm({ initial, onSubmit, onCancel, loading }) {
  // initialがあれば編集モード、なければ新規登録モード
  const isEdit = Boolean(initial)

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      name:       e.target.name.value.trim(),
      rent:       Number(e.target.rent.value),
      area:       e.target.area.value.trim(),
      floor_plan: e.target.floor_plan.value.trim(),
    }
    onSubmit(data)
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>{isEdit ? '物件を編集' : '物件を登録'}</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>物件名</label>
            <input
              name="name"
              defaultValue={initial?.name ?? ''}
              style={styles.input}
              placeholder="例：渋谷コーポ 201号室"
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>家賃（円）</label>
            <input
              name="rent"
              type="number"
              defaultValue={initial?.rent ?? ''}
              style={styles.input}
              placeholder="例：120000"
              min={1}
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>エリア名</label>
            <input
              name="area"
              defaultValue={initial?.area ?? ''}
              style={styles.input}
              placeholder="例：東京都渋谷区"
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>間取り</label>
            <input
              name="floor_plan"
              defaultValue={initial?.floor_plan ?? ''}
              style={styles.input}
              placeholder="例：1LDK"
              required
            />
          </div>
          <div style={styles.actions}>
            <button type="button" onClick={onCancel} style={styles.cancelButton}>
              キャンセル
            </button>
            <button type="submit" style={styles.submitButton} disabled={loading}>
              {loading ? '保存中...' : isEdit ? '更新する' : '登録する'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '36px',
    width: '440px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
  },
  title: {
    fontSize: '20px',
    marginBottom: '24px',
    color: '#1a1a1a',
  },
  field: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#444',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '24px',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#f3f4f6',
    color: '#333',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  submitButton: {
    padding: '10px 24px',
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
}
