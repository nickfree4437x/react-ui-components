import { useState } from "react";
import { Sun, Moon, User, Lock, Eye, EyeOff, Settings, LogOut, Bell } from "lucide-react";
import InputField from "./components/InputField";
import DataTable from "./components/DataTable";

// Local Column interface for TypeScript typing only
interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const sampleData: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "User" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Editor" },
  { id: 4, name: "Diana Prince", email: "diana@example.com", role: "Admin" },
  { id: 5, name: "Edward Davis", email: "edward@example.com", role: "User" },
  { id: 6, name: "Fiona Clark", email: "fiona@example.com", role: "Editor" },
];

const columns: Column<User>[] = [
  { key: "id", title: "ID", dataIndex: "id", sortable: true },
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
  { key: "role", title: "Role", dataIndex: "role" },
];

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [selectedRows, setSelectedRows] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState("inputs");

  return (
    <div className={`${darkMode ? "dark" : ""} transition-colors duration-500`}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 flex flex-col items-center px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Header with navigation */}
        <header className="w-full max-w-6xl mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold mr-3">
                D
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Dashboard UI
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>
              
              <div
                onClick={() => setDarkMode(!darkMode)}
                className={`flex items-center w-16 h-8 p-1 rounded-full cursor-pointer transition-colors ${
                  darkMode ? "bg-indigo-700" : "bg-amber-300"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md transform transition-transform duration-300 ${
                    darkMode ? "translate-x-8" : "translate-x-0"
                  }`}
                >
                  {darkMode ? <Moon className="w-4 h-4 text-indigo-900" /> : <Sun className="w-4 h-4 text-amber-500" />}
                </div>
              </div>
              
              <div className="hidden sm:flex items-center gap-2 ml-4 pl-4 border-l border-gray-300 dark:border-gray-600">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-sm font-medium">
                  JD
                </div>
                <div className="text-sm">
                  <p className="font-medium">John Doe</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="w-full max-w-6xl">
          {/* Tab navigation */}
          <div className="flex mb-8 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab("inputs")}
              className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
                activeTab === "inputs"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-500 dark:border-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Input Fields
            </button>
            <button
              onClick={() => setActiveTab("table")}
              className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
                activeTab === "table"
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-500 dark:border-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Data Table
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1 hidden lg:block">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 h-full">
                <h2 className="text-lg font-semibold mb-4">Dashboard</h2>
                <nav className="space-y-2">
                  <a href="#" className="flex items-center gap-3 p-2 rounded-lg bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400">
                    <User className="w-5 h-5" />
                    <span>Users</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </a>
                </nav>
                
                <div className="mt-8 p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white">
                  <h3 className="font-medium mb-2">Upgrade to Pro</h3>
                  <p className="text-sm opacity-90 mb-3">Get access to all premium features</p>
                  <button className="w-full py-2 bg-white text-blue-600 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors">
                    Upgrade Now
                  </button>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* InputField Section */}
              {activeTab === "inputs" && (
                <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-6 transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <h1 className="text-xl font-semibold">Input Fields</h1>
                    <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                      Reset All
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      label="Username"
                      placeholder="Enter username"
                      helperText="This is helper text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      showClearButton
                      variant="outlined"
                      size="md"
                      icon={<User className="w-4 h-4" />}
                    />

                    <InputField
                      label="Password"
                      placeholder="Enter password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      showPasswordToggle
                      variant="filled"
                      size="md"
                      icon={<Lock className="w-4 h-4" />}
                    />

                    <InputField
                      label="Disabled Input"
                      placeholder="Cannot type here"
                      disabled
                      variant="ghost"
                      size="md"
                    />

                    <InputField
                      label="Invalid Input"
                      placeholder="Type something"
                      invalid
                      errorMessage="This field is required"
                      variant="outlined"
                      size="md"
                    />
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                    <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-md text-sm font-medium mr-3 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      Cancel
                    </button>
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md text-sm font-medium hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg">
                      Save Changes
                    </button>
                  </div>
                </section>
              )}

              {/* DataTable Section */}
              {activeTab === "table" && (
                <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-4 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <h1 className="text-xl font-semibold">User Management</h1>
                    <div className="flex gap-3">
                      <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        Export
                      </button>
                      <button className="px-3 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md text-sm font-medium hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg">
                        Add User
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <DataTable
                    data={sampleData}
                    columns={columns}
                    selectable
                    onRowSelect={setSelectedRows}
                    rowClassName={(row, selected) =>
                      `transition-all duration-300 ${
                        selected ? "bg-blue-50 dark:bg-blue-900/30" : "hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`
                    }
                    checkboxClassName="transition-opacity duration-300"
                  />

                  {selectedRows.length > 0 && (
                    <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg transition-colors duration-300">
                      <div className="flex justify-between items-center mb-2">
                        <strong>{selectedRows.length} {selectedRows.length === 1 ? 'row' : 'rows'} selected</strong>
                        <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                          Clear selection
                        </button>
                      </div>
                      <div className="overflow-x-auto text-sm mt-2 bg-white dark:bg-gray-800 p-3 rounded">
                        <pre className="whitespace-pre-wrap">
                          {JSON.stringify(selectedRows, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
                </section>
              )}
            </div>
          </div>
        </div>

        {/* Mobile bottom navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-3">
          <div className="flex justify-around">
            <button
              onClick={() => setActiveTab("inputs")}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                activeTab === "inputs" ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-700" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <User className="w-5 h-5" />
              <span className="text-xs mt-1">Inputs</span>
            </button>
            <button
              onClick={() => setActiveTab("table")}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                activeTab === "table" ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-700" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <Settings className="w-5 h-5" />
              <span className="text-xs mt-1">Table</span>
            </button>
            <button className="flex flex-col items-center p-2 rounded-lg text-gray-500 dark:text-gray-400">
              <Bell className="w-5 h-5" />
              <span className="text-xs mt-1">Alerts</span>
            </button>
            <button className="flex flex-col items-center p-2 rounded-lg text-gray-500 dark:text-gray-400">
              <LogOut className="w-5 h-5" />
              <span className="text-xs mt-1">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;