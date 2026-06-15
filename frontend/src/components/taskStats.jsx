import './TaskStats.css'

function TaskStats({ tasks }) {
  const totalTasks = tasks.length;
  const activeTasks = tasks.filter((t) => !t.completed).length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const highPriorityTasks = tasks.filter((t) => t.priority === "high").length;
  const completedPct = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const activePct = totalTasks ? Math.round((activeTasks / totalTasks) * 100) : 0;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-label">
          <i className="ti ti-layout-list" aria-hidden="true" /> Total
        </div>
        <div className="stat-value">{totalTasks}</div>
        <div className="stat-sub">tasks</div>
      </div>

      <div className="stat-card">
        <div className="stat-label">
          <i className="ti ti-circle-dashed" aria-hidden="true" /> Active
        </div>
        <div className="stat-value">{activeTasks}</div>
        <div className="stat-sub">remaining</div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${activePct}%` }} />
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-label">
          <i className="ti ti-circle-check" aria-hidden="true" /> Done
        </div>
        <div className="stat-value">{completedTasks}</div>
        <div className="stat-sub">{completedPct}% complete</div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${completedPct}%`, background: "#4ade80" }} />
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-label">
          <i className="ti ti-alert-triangle" aria-hidden="true" /> High priority
        </div>
        <div className="stat-value" style={{ color: "#f87171" }}>{highPriorityTasks}</div>
        <div className="stat-sub">need attention</div>
      </div>
    </div>
  );
}

export default TaskStats;