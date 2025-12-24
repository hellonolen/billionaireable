import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { 
  Users, 
  DollarSign, 
  Activity, 
  ExternalLink, 
  TrendingUp,
  CheckCircle,
  Clock,
  Settings,
  Database,
  Zap,
  Shield,
  ChevronRight,
  Search,
  Filter,
  Download,
  Eye,
  BarChart3,
  PieChart,
  Calendar,
  Mail,
  UserPlus,
  Trash2,
  Send,
  Building2,
  CreditCard,
  FileText,
  XCircle
} from 'lucide-react';
import { Id } from '../convex/_generated/dataModel';

type TabType = 'overview' | 'customers' | 'subscriptions' | 'applications' | 'waitlist' | 'integrations';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<Id<"users"> | null>(null);
  
  const stats = useQuery(api.admin.getDashboardStats);
  const users = useQuery(api.admin.getAllUsers);
  const subscriptions = useQuery(api.admin.getSubscriptions);
  const recentActivity = useQuery(api.admin.getRecentActivity, { limit: 15 });
  const waitlist = useQuery(api.waitlist.getWaitlist);
  const waitlistStats = useQuery(api.waitlist.getWaitlistStats);
  const updateWaitlistStatus = useMutation(api.waitlist.updateWaitlistStatus);
  const removeFromWaitlist = useMutation(api.waitlist.removeFromWaitlist);
  const paymentApplications = useQuery(api.payments.getAllApplications);
  const pendingApplications = useQuery(api.payments.getPendingApplications);
  const updateApplicationStatus = useMutation(api.payments.updateApplicationStatus);
  const userDetail = useQuery(
    api.admin.getUserDetail,
    selectedUser ? { userId: selectedUser } : "skip"
  );

  const filteredUsers = users?.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-[1800px] mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-sans text-3xl font-black text-black dark:text-white tracking-tight">
                Admin Center
              </h1>
              <p className="font-mono text-sm text-gray-500 dark:text-gray-400 mt-1">
                Billionaireable Platform Management
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-mono text-xs font-bold uppercase hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
              <a
                href="https://dashboard.stripe.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#635BFF] text-white rounded-lg font-mono text-xs font-bold uppercase hover:bg-[#635BFF]/90 transition-colors"
              >
                Stripe
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-6">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'customers', label: 'Customers', icon: Users },
              { id: 'subscriptions', label: 'Subscriptions', icon: DollarSign },
              { id: 'applications', label: 'Applications', icon: FileText },
              { id: 'waitlist', label: 'Waitlist', icon: Mail },
              { id: 'integrations', label: 'Integrations', icon: Zap },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase transition-all ${
                  activeTab === tab.id
                    ? 'bg-art-orange text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold uppercase text-gray-400">
                    Monthly Revenue
                  </span>
                  <DollarSign className="w-5 h-5 text-green-500" />
                </div>
                <p className="font-sans text-3xl font-black text-black dark:text-white">
                  {stats ? formatCurrency(stats.monthlyRevenue) : '—'}
                </p>
                <p className="font-mono text-xs text-green-500 mt-2">
                  {stats?.activeSubscriptions || 0} active subscriptions
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold uppercase text-gray-400">
                    Total Users
                  </span>
                  <Users className="w-5 h-5 text-blue-500" />
                </div>
                <p className="font-sans text-3xl font-black text-black dark:text-white">
                  {stats?.totalUsers || 0}
                </p>
                <p className="font-mono text-xs text-blue-500 mt-2">
                  +{stats?.newUsersThisWeek || 0} this week
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold uppercase text-gray-400">
                    Pillars Completed
                  </span>
                  <CheckCircle className="w-5 h-5 text-art-orange" />
                </div>
                <p className="font-sans text-3xl font-black text-black dark:text-white">
                  {stats?.totalPillarsCompleted || 0}
                </p>
                <p className="font-mono text-xs text-art-orange mt-2">
                  Across all users
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold uppercase text-gray-400">
                    Subscriptions
                  </span>
                  <PieChart className="w-5 h-5 text-purple-500" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs text-gray-500">F:</span>
                  <span className="font-bold text-black dark:text-white">
                    {stats?.subscriptionsByPlan?.founder || 0}
                  </span>
                  <span className="font-mono text-xs text-gray-500 ml-2">S:</span>
                  <span className="font-bold text-black dark:text-white">
                    {stats?.subscriptionsByPlan?.scaler || 0}
                  </span>
                  <span className="font-mono text-xs text-gray-500 ml-2">O:</span>
                  <span className="font-bold text-black dark:text-white">
                    {stats?.subscriptionsByPlan?.owner || 0}
                  </span>
                </div>
                <p className="font-mono text-xs text-gray-500 mt-2">
                  Founder / Scaler / Owner
                </p>
              </div>
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Activity */}
              <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
                <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                  <h3 className="font-sans text-xl font-bold text-black dark:text-white">
                    Recent Activity
                  </h3>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-[500px] overflow-y-auto">
                  {recentActivity?.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                      No activity yet
                    </div>
                  )}
                  {recentActivity?.map((activity, idx) => (
                    <div
                      key={idx}
                      className="p-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === 'signup'
                            ? 'bg-green-100 dark:bg-green-900/30'
                            : activity.type === 'message'
                            ? 'bg-blue-100 dark:bg-blue-900/30'
                            : 'bg-orange-100 dark:bg-orange-900/30'
                        }`}
                      >
                        {activity.type === 'signup' && (
                          <Users className="w-5 h-5 text-green-600" />
                        )}
                        {activity.type === 'message' && (
                          <Activity className="w-5 h-5 text-blue-600" />
                        )}
                        {activity.type === 'progress' && (
                          <TrendingUp className="w-5 h-5 text-orange-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-sans font-medium text-black dark:text-white truncate">
                          {activity.userName || activity.userEmail}
                        </p>
                        <p className="font-mono text-xs text-gray-500 truncate">
                          {activity.details}
                        </p>
                      </div>
                      <span className="font-mono text-xs text-gray-400 whitespace-nowrap">
                        {formatTime(activity.timestamp)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                  <h3 className="font-sans text-xl font-bold text-black dark:text-white mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <a
                      href="https://dashboard.stripe.com/payments"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-5 h-5 text-[#635BFF]" />
                        <span className="font-sans font-medium text-black dark:text-white">
                          View Payments
                        </span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                    </a>
                    <a
                      href="https://dashboard.clerk.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-purple-500" />
                        <span className="font-sans font-medium text-black dark:text-white">
                          Manage Auth
                        </span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                    </a>
                    <a
                      href="https://dashboard.convex.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Database className="w-5 h-5 text-orange-500" />
                        <span className="font-sans font-medium text-black dark:text-white">
                          View Database
                        </span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                    </a>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-black to-gray-800 rounded-2xl p-6 text-white">
                  <h3 className="font-sans text-xl font-bold mb-2">
                    Platform Status
                  </h3>
                  <p className="font-mono text-xs text-gray-400 mb-4">
                    All systems operational
                  </p>
                  <div className="space-y-2">
                    {[
                      { name: 'Convex', status: 'online' },
                      { name: 'Clerk Auth', status: 'online' },
                      { name: 'Gemini', status: 'online' },
                      { name: 'Stripe', status: 'online' },
                    ].map((service) => (
                      <div
                        key={service.name}
                        className="flex items-center justify-between"
                      >
                        <span className="font-mono text-xs text-gray-300">
                          {service.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                          <span className="font-mono text-xs text-green-400">
                            {service.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            {/* Search & Filter */}
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search customers by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-sans text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-mono text-xs font-bold uppercase text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Customer List */}
              <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase text-gray-400">
                    {filteredUsers?.length || 0} Customers
                  </span>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-[600px] overflow-y-auto">
                  {filteredUsers?.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                      No customers found
                    </div>
                  )}
                  {filteredUsers?.map((user) => (
                    <div
                      key={user._id}
                      onClick={() => setSelectedUser(user._id)}
                      className={`p-4 flex items-center gap-4 cursor-pointer transition-colors ${
                        selectedUser === user._id
                          ? 'bg-gray-100 dark:bg-gray-800'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-black to-gray-600 flex items-center justify-center text-white font-bold">
                        {user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-sans font-bold text-black dark:text-white truncate">
                          {user.name || 'No name'}
                        </p>
                        <p className="font-mono text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-mono text-xs font-bold uppercase ${
                            user.subscription?.status === 'active'
                              ? 'text-green-500'
                              : 'text-gray-400'
                          }`}
                        >
                          {user.subscription?.plan || 'Free'}
                        </p>
                        <p className="font-mono text-xs text-gray-400">
                          {formatDate(user.createdAt)}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-300" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Detail */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                {!selectedUser ? (
                  <div className="text-center py-12 text-gray-500">
                    <Eye className="w-12 h-12 mx-auto mb-4 opacity-30" />
                    <p>Select a customer to view details</p>
                  </div>
                ) : userDetail ? (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-black to-gray-600 flex items-center justify-center text-white text-2xl font-bold mb-4">
                        {userDetail.name?.charAt(0) ||
                          userDetail.email.charAt(0).toUpperCase()}
                      </div>
                      <h3 className="font-sans text-xl font-bold text-black dark:text-white">
                        {userDetail.name || 'No name'}
                      </h3>
                      <p className="font-mono text-sm text-gray-500">
                        {userDetail.email}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
                        <p className="font-mono text-xs text-gray-400 uppercase mb-1">
                          Pillar
                        </p>
                        <p className="font-bold text-black dark:text-white">
                          {userDetail.currentPillar || 0}/12
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
                        <p className="font-mono text-xs text-gray-400 uppercase mb-1">
                          Messages
                        </p>
                        <p className="font-bold text-black dark:text-white">
                          {userDetail.messageCount}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                        <span className="font-mono text-xs text-gray-400">
                          Status
                        </span>
                        <span
                          className={`font-mono text-xs font-bold uppercase ${
                            userDetail.subscription?.status === 'active'
                              ? 'text-green-500'
                              : 'text-gray-400'
                          }`}
                        >
                          {userDetail.subscription?.status || 'Free'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                        <span className="font-mono text-xs text-gray-400">
                          Plan
                        </span>
                        <span className="font-mono text-xs font-bold text-black dark:text-white uppercase">
                          {userDetail.subscription?.plan || 'None'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                        <span className="font-mono text-xs text-gray-400">
                          Net Worth
                        </span>
                        <span className="font-mono text-xs text-black dark:text-white">
                          {userDetail.netWorth
                            ? formatCurrency(userDetail.netWorth)
                            : '—'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                        <span className="font-mono text-xs text-gray-400">
                          Goals
                        </span>
                        <span className="font-mono text-xs text-black dark:text-white truncate max-w-[150px]">
                          {userDetail.goals || '—'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="font-mono text-xs text-gray-400">
                          Joined
                        </span>
                        <span className="font-mono text-xs text-black dark:text-white">
                          {formatDate(userDetail.createdAt)}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4">
                      <a
                        href={`https://dashboard.stripe.com/customers/${userDetail.subscription?.stripeCustomerId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#635BFF] text-white rounded-xl font-mono text-xs font-bold uppercase hover:bg-[#635BFF]/90 transition-colors"
                      >
                        View in Stripe
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="animate-spin w-8 h-8 border-2 border-gray-300 border-t-black rounded-full mx-auto" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Subscriptions Tab */}
        {activeTab === 'subscriptions' && (
          <div className="space-y-6">
            {/* Revenue Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
                <p className="font-mono text-xs font-bold uppercase text-gray-400 mb-2">
                  Founder Tier
                </p>
                <p className="font-sans text-2xl font-black text-black dark:text-white">
                  {stats?.subscriptionsByPlan?.founder || 0}
                </p>
                <p className="font-mono text-xs text-gray-500">
                  @ $497/mo = {formatCurrency((stats?.subscriptionsByPlan?.founder || 0) * 497)}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
                <p className="font-mono text-xs font-bold uppercase text-gray-400 mb-2">
                  Scaler Tier
                </p>
                <p className="font-sans text-2xl font-black text-black dark:text-white">
                  {stats?.subscriptionsByPlan?.scaler || 0}
                </p>
                <p className="font-mono text-xs text-gray-500">
                  @ $2,497/mo = {formatCurrency((stats?.subscriptionsByPlan?.scaler || 0) * 2497)}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
                <p className="font-mono text-xs font-bold uppercase text-gray-400 mb-2">
                  Owner Tier
                </p>
                <p className="font-sans text-2xl font-black text-black dark:text-white">
                  {stats?.subscriptionsByPlan?.owner || 0}
                </p>
                <p className="font-mono text-xs text-gray-500">
                  @ $9,997/mo = {formatCurrency((stats?.subscriptionsByPlan?.owner || 0) * 9997)}
                </p>
              </div>
              <div className="bg-gradient-to-br from-black to-gray-800 p-6 rounded-2xl text-white">
                <p className="font-mono text-xs font-bold uppercase text-gray-400 mb-2">
                  Total MRR
                </p>
                <p className="font-sans text-2xl font-black">
                  {stats ? formatCurrency(stats.monthlyRevenue) : '—'}
                </p>
                <p className="font-mono text-xs text-gray-400">
                  {stats?.activeSubscriptions || 0} active
                </p>
              </div>
            </div>

            {/* Subscriptions Table */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <h3 className="font-sans text-lg font-bold text-black dark:text-white">
                  All Subscriptions
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left font-mono text-xs font-bold uppercase text-gray-400">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left font-mono text-xs font-bold uppercase text-gray-400">
                        Plan
                      </th>
                      <th className="px-6 py-3 text-left font-mono text-xs font-bold uppercase text-gray-400">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left font-mono text-xs font-bold uppercase text-gray-400">
                        Started
                      </th>
                      <th className="px-6 py-3 text-left font-mono text-xs font-bold uppercase text-gray-400">
                        Renews
                      </th>
                      <th className="px-6 py-3 text-left font-mono text-xs font-bold uppercase text-gray-400">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {subscriptions?.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                          No subscriptions yet
                        </td>
                      </tr>
                    )}
                    {subscriptions?.map((sub) => (
                      <tr
                        key={sub._id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-sans font-medium text-black dark:text-white">
                              {sub.userName || 'No name'}
                            </p>
                            <p className="font-mono text-xs text-gray-500">
                              {sub.userEmail}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-mono text-sm font-bold text-black dark:text-white uppercase">
                            {sub.plan}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full font-mono text-xs font-bold uppercase ${
                              sub.status === 'active'
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                : sub.status === 'canceled'
                                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                            }`}
                          >
                            {sub.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-mono text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(sub.createdAt)}
                        </td>
                        <td className="px-6 py-4 font-mono text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(sub.currentPeriodEnd)}
                        </td>
                        <td className="px-6 py-4">
                          <a
                            href={`https://dashboard.stripe.com/subscriptions/${sub.stripeSubscriptionId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#635BFF] font-mono text-xs font-bold uppercase hover:underline"
                          >
                            Manage
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            {/* Application Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-art-orange" />
                  <p className="font-mono text-xs font-bold uppercase text-gray-400">
                    Pending
                  </p>
                </div>
                <p className="font-sans text-3xl font-black text-art-orange">
                  {pendingApplications?.length || 0}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <p className="font-mono text-xs font-bold uppercase text-gray-400">
                    Approved
                  </p>
                </div>
                <p className="font-sans text-3xl font-black text-green-500">
                  {paymentApplications?.filter(a => a.status === 'approved').length || 0}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3 mb-2">
                  <Building2 className="w-5 h-5 text-blue-500" />
                  <p className="font-mono text-xs font-bold uppercase text-gray-400">
                    Wire Transfer
                  </p>
                </div>
                <p className="font-sans text-3xl font-black text-blue-500">
                  {paymentApplications?.filter(a => a.paymentMethod === 'wire').length || 0}
                </p>
              </div>
              <div className="bg-gradient-to-br from-black to-gray-800 p-6 rounded-2xl text-white">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="w-5 h-5 text-art-green" />
                  <p className="font-mono text-xs font-bold uppercase text-gray-400">
                    Pending Value
                  </p>
                </div>
                <p className="font-sans text-3xl font-black">
                  {formatCurrency(pendingApplications?.reduce((sum, a) => sum + a.amount, 0) || 0)}
                </p>
              </div>
            </div>

            {/* Applications Table */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <h3 className="font-sans text-lg font-bold text-black dark:text-white">
                  Payment Applications
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-art-orange font-mono text-xs font-bold">
                    {pendingApplications?.length || 0} pending review
                  </span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left font-mono text-xs font-bold uppercase text-gray-400">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left font-mono text-xs font-bold uppercase text-gray-400">
                        Tier
                      </th>
                      <th className="px-6 py-3 text-left font-mono text-xs font-bold uppercase text-gray-400">
                        Billing
                      </th>
                      <th className="px-6 py-3 text-left font-mono text-xs font-bold uppercase text-gray-400">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left font-mono text-xs font-bold uppercase text-gray-400">
                        Method
                      </th>
                      <th className="px-6 py-3 text-left font-mono text-xs font-bold uppercase text-gray-400">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left font-mono text-xs font-bold uppercase text-gray-400">
                        Submitted
                      </th>
                      <th className="px-6 py-3 text-left font-mono text-xs font-bold uppercase text-gray-400">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {paymentApplications?.length === 0 && (
                      <tr>
                        <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                          No payment applications yet
                        </td>
                      </tr>
                    )}
                    {paymentApplications?.map((app) => (
                      <tr
                        key={app._id}
                        className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
                          app.status === 'pending' ? 'bg-orange-50/50 dark:bg-orange-900/10' : ''
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-sans font-medium text-black dark:text-white">
                              {app.userName || 'No name'}
                            </p>
                            <p className="font-mono text-xs text-gray-500">
                              {app.userEmail}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-mono text-sm font-bold text-black dark:text-white uppercase">
                            {app.tier}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-mono text-xs text-gray-600 dark:text-gray-400 uppercase">
                            {app.billingCycle}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-sans font-bold text-black dark:text-white">
                            {formatCurrency(app.amount)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {app.paymentMethod === 'wire' && <Building2 className="w-4 h-4 text-blue-500" />}
                            {app.paymentMethod === 'whop' && <Zap className="w-4 h-4 text-purple-500" />}
                            {app.paymentMethod === 'stripe' && <CreditCard className="w-4 h-4 text-[#635BFF]" />}
                            <span className="font-mono text-xs uppercase text-gray-600 dark:text-gray-400">
                              {app.paymentMethod}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full font-mono text-xs font-bold uppercase ${
                              app.status === 'awaiting_payment'
                                ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                                : app.status === 'approved'
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                : app.status === 'payment_insufficient'
                                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                : 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
                            }`}
                          >
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-mono text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(app.createdAt)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {app.status === 'awaiting_payment' && (
                              <button
                                onClick={() =>
                                  updateApplicationStatus({
                                    applicationId: app._id,
                                    status: 'approved',
                                  })
                                }
                                className="px-3 py-1.5 bg-green-500 text-white rounded-lg font-mono text-xs font-bold uppercase hover:bg-green-600 transition-colors"
                                title="Manual Approve (if webhook didn't fire)"
                              >
                                Verify Payment
                              </button>
                            )}
                            {app.status === 'approved' && (
                              <span className="font-mono text-xs text-green-500 font-bold">
                                ✓ Active
                              </span>
                            )}
                            {app.status === 'payment_insufficient' && (
                              <span className="font-mono text-xs text-red-500">
                                Underpaid
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Wire Transfer Info */}
            <div className="bg-gradient-to-br from-art-blue/10 to-art-blue/5 rounded-2xl border border-art-blue/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-6 h-6 text-art-blue" />
                <h3 className="font-sans text-lg font-bold text-black dark:text-white">
                  Wire Transfer Only
                </h3>
              </div>
              <p className="font-serif text-sm text-gray-600 dark:text-gray-400 mb-4">
                All payments are via wire transfer. When a user selects a tier, they receive bank details with a unique reference code. When payment clears and the webhook fires, their subscription activates automatically.
              </p>
              <div className="bg-white dark:bg-gray-900 rounded-xl p-4">
                <p className="font-mono text-xs text-gray-400 mb-2">Webhook endpoint:</p>
                <code className="font-mono text-sm text-art-blue">
                  POST /wire-verification
                </code>
                <p className="font-mono text-xs text-gray-400 mt-2">
                  Body: {`{ "reference": "BILL-XXX", "amount": 4997 }`}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Waitlist Tab */}
        {activeTab === 'waitlist' && (
          <div className="space-y-6">
            {/* Waitlist Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
                <p className="font-mono text-xs font-bold uppercase text-gray-400 mb-2">
                  Total
                </p>
                <p className="font-sans text-3xl font-black text-black dark:text-white">
                  {waitlistStats?.total || 0}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
                <p className="font-mono text-xs font-bold uppercase text-gray-400 mb-2">
                  Pending
                </p>
                <p className="font-sans text-3xl font-black text-art-orange">
                  {waitlistStats?.pending || 0}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
                <p className="font-mono text-xs font-bold uppercase text-gray-400 mb-2">
                  Invited
                </p>
                <p className="font-sans text-3xl font-black text-blue-500">
                  {waitlistStats?.invited || 0}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
                <p className="font-mono text-xs font-bold uppercase text-gray-400 mb-2">
                  Converted
                </p>
                <p className="font-sans text-3xl font-black text-green-500">
                  {waitlistStats?.converted || 0}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
                <p className="font-mono text-xs font-bold uppercase text-gray-400 mb-2">
                  This Week
                </p>
                <p className="font-sans text-3xl font-black text-black dark:text-white">
                  +{waitlistStats?.thisWeek || 0}
                </p>
              </div>
            </div>

            {/* Waitlist Table */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <h3 className="font-sans text-lg font-bold text-black dark:text-white">
                  Waitlist Entries
                </h3>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg font-mono text-xs font-bold uppercase hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <Download className="w-4 h-4" />
                    Export CSV
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left font-mono text-xs font-bold uppercase text-gray-400">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left font-mono text-xs font-bold uppercase text-gray-400">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left font-mono text-xs font-bold uppercase text-gray-400">
                        Source
                      </th>
                      <th className="px-6 py-3 text-left font-mono text-xs font-bold uppercase text-gray-400">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left font-mono text-xs font-bold uppercase text-gray-400">
                        Added
                      </th>
                      <th className="px-6 py-3 text-left font-mono text-xs font-bold uppercase text-gray-400">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {waitlist?.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                          No waitlist entries yet
                        </td>
                      </tr>
                    )}
                    {waitlist?.map((entry) => (
                      <tr
                        key={entry._id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      >
                        <td className="px-6 py-4">
                          <span className="font-mono text-sm text-black dark:text-white">
                            {entry.email}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-sans text-sm text-gray-600 dark:text-gray-400">
                            {entry.name || '—'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-mono text-xs text-gray-500 uppercase">
                            {entry.source || 'website'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full font-mono text-xs font-bold uppercase ${
                              entry.status === 'pending'
                                ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                                : entry.status === 'invited'
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            }`}
                          >
                            {entry.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-mono text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(entry.createdAt)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {entry.status === 'pending' && (
                              <button
                                onClick={() =>
                                  updateWaitlistStatus({
                                    id: entry._id,
                                    status: 'invited',
                                  })
                                }
                                className="p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                                title="Mark as Invited"
                              >
                                <Send className="w-4 h-4" />
                              </button>
                            )}
                            {entry.status === 'invited' && (
                              <button
                                onClick={() =>
                                  updateWaitlistStatus({
                                    id: entry._id,
                                    status: 'converted',
                                  })
                                }
                                className="p-2 text-green-500 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                                title="Mark as Converted"
                              >
                                <UserPlus className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => removeFromWaitlist({ id: entry._id })}
                              className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                              title="Remove"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Integrations Tab */}
        {activeTab === 'integrations' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stripe */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#635BFF]/10 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-[#635BFF]" />
                </div>
                <div>
                  <h3 className="font-sans text-xl font-bold text-black dark:text-white">
                    Stripe
                  </h3>
                  <p className="font-mono text-xs text-gray-500">
                    Payment Processing
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-mono text-xs text-green-500">Connected</span>
                </div>
              </div>
              <p className="font-serif text-sm text-gray-600 dark:text-gray-400 mb-4">
                Handle payments, subscriptions, and invoicing. All
                financial operations are managed through Stripe. No refunds - cancel anytime policy.
              </p>
              <a
                href="https://dashboard.stripe.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#635BFF] text-white rounded-lg font-mono text-xs font-bold uppercase hover:bg-[#635BFF]/90 transition-colors"
              >
                Open Dashboard
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Clerk */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-sans text-xl font-bold text-black dark:text-white">
                    Clerk
                  </h3>
                  <p className="font-mono text-xs text-gray-500">
                    Authentication
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-mono text-xs text-green-500">Connected</span>
                </div>
              </div>
              <p className="font-serif text-sm text-gray-600 dark:text-gray-400 mb-4">
                User authentication, session management, and security. Manage
                users, roles, and access controls.
              </p>
              <a
                href="https://dashboard.clerk.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-mono text-xs font-bold uppercase hover:bg-purple-700 transition-colors"
              >
                Open Dashboard
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Convex */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                  <Database className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-sans text-xl font-bold text-black dark:text-white">
                    Convex
                  </h3>
                  <p className="font-mono text-xs text-gray-500">
                    Backend & Database
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-mono text-xs text-green-500">Connected</span>
                </div>
              </div>
              <p className="font-serif text-sm text-gray-600 dark:text-gray-400 mb-4">
                Real-time database, serverless functions, and file storage.
                Powers all data operations and AI memory.
              </p>
              <a
                href="https://dashboard.convex.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg font-mono text-xs font-bold uppercase hover:bg-orange-700 transition-colors"
              >
                Open Dashboard
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Gemini */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-sans text-xl font-bold text-black dark:text-white">
                    Gemini
                  </h3>
                  <p className="font-mono text-xs text-gray-500">
                    Billionaireable Intelligence
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-mono text-xs text-green-500">Connected</span>
                </div>
              </div>
              <p className="font-serif text-sm text-gray-600 dark:text-gray-400 mb-4">
                Powers Billionaireable's intelligence and voice. Gemini 3 Pro
                for guidance, Gemini TTS for voice output.
              </p>
              <a
                href="https://aistudio.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-mono text-xs font-bold uppercase hover:bg-blue-700 transition-colors"
              >
                Open Console
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Whop */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-sans text-xl font-bold text-black dark:text-white">
                    Whop
                  </h3>
                  <p className="font-mono text-xs text-gray-500">
                    High-Ticket Subscriptions
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <span className="font-mono text-xs text-yellow-500">Setup Required</span>
                </div>
              </div>
              <p className="font-serif text-sm text-gray-600 dark:text-gray-400 mb-4">
                Alternative payment processor for high-ticket subscriptions.
                More friendly than Stripe for premium pricing.
              </p>
              <a
                href="https://whop.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-mono text-xs font-bold uppercase hover:from-purple-600 hover:to-pink-600 transition-colors"
              >
                Open Dashboard
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Environment Variables */}
            <div className="md:col-span-2 bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 text-white">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-sans text-xl font-bold">
                    Environment Configuration
                  </h3>
                  <p className="font-mono text-xs text-gray-400">
                    Required environment variables
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="font-mono text-xs text-gray-400 mb-2">
                    .env.local (Frontend)
                  </p>
                  <code className="font-mono text-sm text-green-400">
                    VITE_CLERK_PUBLISHABLE_KEY
                  </code>
                  <br />
                  <code className="font-mono text-sm text-green-400">
                    VITE_CONVEX_URL
                  </code>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="font-mono text-xs text-gray-400 mb-2">
                    Convex Dashboard (Backend)
                  </p>
                  <code className="font-mono text-sm text-orange-400">
                    CLERK_SECRET_KEY
                  </code>
                  <br />
                  <code className="font-mono text-sm text-orange-400">
                    GEMINI_API_KEY
                  </code>
                  <br />
                  <code className="font-mono text-sm text-orange-400">
                    STRIPE_SECRET_KEY
                  </code>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
