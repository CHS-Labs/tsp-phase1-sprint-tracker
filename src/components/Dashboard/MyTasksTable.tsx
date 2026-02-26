import { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight, CheckCircle, Calendar, Edit2 } from 'lucide-react';
// Pull live data from the DataContext instead of using dummy data
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { TaskStatus } from '../../data/dummyData';

/*
 * Updated MyTasksTable
 *
 * This version of the MyTasksTable component reads the task list from the
 * DataContext and filters it based on the currently authenticated user
 * (via the AuthContext). It also performs a simple mapping from the raw
 * Google Sheets row format to the shape expected by the table UI. A
 * helper function assigns a synthetic progress value based on the task
 * status until a more precise progress metric is available from the
 * backend.  If no user is logged in the table will render empty.
 */

export default function MyTasksTable() {
  const { tasks } = useData();
  const { user } = useAuth();
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<any | null>(null);

  // Derive a progress percentage from a task's status. This is a stopgap
  // until real progress data is available on the Google Sheet. Feel free
  // to adjust these values to better reflect your workflow.
  const getTaskProgress = (status: string): number => {
    switch (status) {
      case 'Done':
        return 100;
      case 'In Progress':
        return 50;
      case 'Blocked':
        return 10;
      default:
        return 0;
    }
  };

  // Build a list of tasks belonging to the current user. We coerce
  // property names from the ActionLogTask shape (taskId, taskDescription,
  // relatedSOWCategory, etc.) into the keys expected by the UI (id,
  // description, category). If you extend the Action Log sheet with
  // progress or other metrics you can update this mapping accordingly.
  const myTasks = useMemo(() => {
    if (!user) return [];
    return tasks
      .filter((task) =>
        task.owner && task.owner.toLowerCase() === user.email.toLowerCase()
      )
      .map((task) => {
        const id = (task as any).id ?? task.taskId;
        const description = (task as any).description ?? task.taskDescription;
        const category = (task as any).category ?? task.relatedSOWCategory;
        const priority = (task as any).priority ?? task.priority;
        const status = (task.status || (task as any).status) as TaskStatus;
        const dueDate = (task as any).dueDate ?? task.dueDate;
        const sprintWeekRaw = (task as any).sprintWeek ?? task.sprintWeek;
        const sprintWeek = sprintWeekRaw ? Number(sprintWeekRaw) : 0;
        const notes = (task as any).notes ?? task.notes ?? '';
        return {
          id,
          description,
          category,
          priority,
          status,
          owner: task.owner,
          dueDate,
          sprintWeek,
          progress: getTaskProgress(status),
          notes,
        };
      });
  }, [tasks, user]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Low':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'Done':
        return 'bg-green-100 text-green-700';
      case 'In Progress':
        return 'bg-blue-100 text-blue-700';
      case 'Blocked':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">My Action Items</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-8"></th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Task</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Progress</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {myTasks.map((task) => (
              <>
                <tr
                  key={task.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        setExpandedTask(
                          expandedTask === task.id ? null : (task.id as string)
                        )
                      }
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {expandedTask === task.id ? (
                        <ChevronDown size={18} />
                      ) : (
                        <ChevronRight size={18} />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-2">
                      <span className="text-xs text-gray-500 font-mono">
                        {task.id}
                      </span>
                      <p className="text-sm text-gray-900 font-medium">
                        {task.description}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {task.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar size={14} />
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })
                        : '—'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-[#E98A24] h-full transition-all"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600 font-semibold">
                        {Math.round(task.progress)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingTask(task)}
                        className="text-gray-400 hover:text-[#1A9CD7] transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      {task.status !== 'Done' && (
                        <button
                          className="text-gray-400 hover:text-green-600 transition-colors"
                          title="Mark as done"
                        >
                          <CheckCircle size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>

                {expandedTask === task.id && (
                  <tr className="bg-gray-50">
                    <td></td>
                    <td colSpan={7} className="px-6 py-4">
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs font-semibold text-gray-600 uppercase">
                            Sprint Week
                          </p>
                          <p className="text-sm text-gray-900">
                            Week {task.sprintWeek || '—'}
                          </p>
                        </div>
                        {task.notes && (
                          <div>
                            <p className="text-xs font-semibold text-gray-600 uppercase">
                              Notes
                            </p>
                            <p className="text-sm text-gray-700 italic">
                              {task.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {editingTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Edit Task
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Task ID
                </label>
                <p className="text-sm text-gray-600">{editingTask.id}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E98A24]"
                  rows={3}
                  defaultValue={editingTask.description}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E98A24]"
                  rows={2}
                  defaultValue={editingTask.notes || ''}
                  placeholder="Add notes..."
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  onClick={() => setEditingTask(null)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setEditingTask(null)}
                  className="px-4 py-2 bg-[#E98A24] text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}