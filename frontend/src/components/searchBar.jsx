function SearchBar({searchTask, setSearchTask}) {
  return (
    <input
      type="text"
      value={searchTask}
      onChange={(e) => setSearchTask(e.target.value)}
      placeholder="Search tasks..."
    />
  );
}

export default SearchBar;