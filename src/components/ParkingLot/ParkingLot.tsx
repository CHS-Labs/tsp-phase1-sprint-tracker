import { useState } from 'react';
import { Lightbulb, Calendar, User, Tag, Plus, X } from 'lucide-react';

interface ParkingLotItem {
  id: string;
  title: string;
  description: string;
  category: string;
  submittedBy: string;
  dateAdded: string;
  priority: 'High' | 'Medium' | 'Low';
  tags: string[];
}

const dummyParkingLotItems: ParkingLotItem[] = [
  {
    id: 'PL001',
    title: 'Implement GraphQL subscriptions for real-time updates',
    description: 'Add WebSocket support for live data streaming to improve user experience with real-time notifications and updates.',
    category: 'Architecture',
    submittedBy: 'Alex Rivera',
    dateAdded: '2026-03-15',
    priority: 'High',
    tags: ['GraphQL', 'Real-time', 'UX']
  },
  {
    id: 'PL002',
    title: 'Mobile app development',
    description: 'Create native iOS and Android applications to complement the web platform and expand market reach.',
    category: 'Product',
    submittedBy: 'Sarah Chen',
    dateAdded: '2026-03-18',
    priority: 'High',
    tags: ['Mobile', 'iOS', 'Android']
  },
  {
    id: 'PL003',
    title: 'AI-powered code review assistant',
    description: 'Integrate AI tools to automatically review pull requests and suggest improvements before human review.',
    category: 'DevOps',
    submittedBy: 'Jordan Kim',
    dateAdded: '2026-03-20',
    priority: 'Medium',
    tags: ['AI', 'Automation', 'Code Quality']
  },
  {
    id: 'PL004',
    title: 'Advanced analytics dashboard',
    description: 'Build comprehensive analytics with predictive insights, custom reports, and data export capabilities.',
    category: 'Analytics',
    submittedBy: 'Michael Torres',
    dateAdded: '2026-03-22',
    priority: 'Medium',
    tags: ['Analytics', 'BI', 'Reporting']
  },
  {
    id: 'PL005',
    title: 'Multi-tenancy support',
    description: 'Implement tenant isolation and white-labeling capabilities for enterprise customers.',
    category: 'Architecture',
    submittedBy: 'Alex Rivera',
    dateAdded: '2026-03-25',
    priority: 'High',
    tags: ['Enterprise', 'Multi-tenant', 'Scalability']
  },
  {
    id: 'PL006',
    title: 'Automated accessibility testing',
    description: 'Set up continuous accessibility testing in CI/CD pipeline to ensure WCAG 2.1 AA compliance.',
    category: 'Quality',
    submittedBy: 'Sarah Chen',
    dateAdded: '2026-03-28',
    priority: 'Low',
    tags: ['Accessibility', 'Testing', 'Compliance']
  }
];

export default function ParkingLot() {
  const [items, setItems] = useState<ParkingLotItem[]>(dummyParkingLotItems);
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [filterPriority, setFilterPriority] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState(false);

  const categories = Array.from(new Set(items.map(item => item.category)));

  const filteredItems = items.filter(item => {
    if (filterCategory && item.category !== filterCategory) return false;
    if (filterPriority && item.priority !== filterPriority) return false;
    return true;
  });

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Phase 2 Parking Lot</h2>
          <p className="text-gray-600 mt-1">Ideas and features deferred to future phases</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#E98A24] to-[#1A9CD7] text-white rounded-lg hover:shadow-lg transition-all font-semibold"
        >
          <Plus size={20} />
          Add Idea
        </button>
      </div>

      <div className="bg-gradient-to-r from-[#E98A24]/10 via-[#1A9CD7]/10 to-purple-500/10 rounded-xl border-2 border-dashed border-gray-300 p-6">
        <div className="flex items-start gap-4">
          <Lightbulb size={32} className="text-[#E98A24] flex-shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">About the Parking Lot</h3>
            <p className="text-gray-700 leading-relaxed">
              This is a collection of valuable ideas, features, and improvements that are out of scope for
              the current sprint but worth considering for Phase 2. Use this space to capture innovative
              concepts without losing focus on current objectives. All items here will be reviewed and
              prioritized for future development cycles.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
              Category
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E98A24] text-sm"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
              Priority
            </label>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E98A24] text-sm"
            >
              <option value="">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all hover:border-[#E98A24]"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono text-gray-500">{item.id}</span>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(
                      item.priority
                    )}`}
                  >
                    {item.priority}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              </div>
            </div>

            <p className="text-sm text-gray-700 mb-4 leading-relaxed">{item.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {item.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center gap-4 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Tag size={12} />
                  <span>{item.category}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User size={12} />
                  <span>{item.submittedBy}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={12} />
                  <span>
                    {new Date(item.dateAdded).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
          <Lightbulb size={48} className="text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No items match your filters</p>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Add to Parking Lot</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E98A24]"
                  placeholder="Brief, descriptive title..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E98A24]"
                  rows={4}
                  placeholder="Detailed description of the idea or feature..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E98A24]">
                    <option>Architecture</option>
                    <option>Product</option>
                    <option>DevOps</option>
                    <option>Analytics</option>
                    <option>Quality</option>
                    <option>Security</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Priority
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E98A24]">
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E98A24]"
                  placeholder="e.g., Mobile, AI, Real-time"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowAddModal(false);
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-[#E98A24] to-[#1A9CD7] text-white rounded-lg hover:shadow-lg transition-all font-semibold"
                >
                  Add to Parking Lot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
