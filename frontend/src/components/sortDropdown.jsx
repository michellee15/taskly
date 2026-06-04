function SortDropdown({sortBy, setSortBy}) {
  return (
    <div>
      <label>Sort by:</label>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
      </select>
    </div>
  )
}

export default SortDropdown;