import { useState } from "react";
import { Building2, Lock, Mail } from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "pharmacist" | "doctor";
  branch: string;
};

type LoginProps = {
  onLogin: (user: User) => void;
};

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Mock users for demonstration
  const mockUsers: Record<string, User> = {
    "admin@cloudpharm.com": {
      id: "1",
      name: "Admin User",
      email: "admin@cloudpharm.com",
      role: "admin",
      branch: "All Branches",
    },
    "pharmacist@cloudpharm.com": {
      id: "2",
      name: "Lea Zajkov",
      email: "pharmacist@cloudpharm.com",
      role: "pharmacist",
      branch: "Main Branch",
    },
    "doctor@cloudpharm.com": {
      id: "3",
      name: "Vangel Markovski",
      email: "doctor@cloudpharm.com",
      role: "doctor",
      branch: "Downtown Branch",
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = mockUsers[email];
    if (user) {
      onLogin(user);
    } else {
      alert("Invalid credentials. Try: admin@cloudpharm.com");
    }
  };

  const quickLogin = (email: string) => {
    const user = mockUsers[email];
    if (user) {
      onLogin(user);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-blue-600 mb-2">CloudPharm</h1>
            <p className="text-gray-600">
              Cloud-Based Pharmacy Management System
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Log In
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3 text-center">
              Quick Login (Demo)
            </p>
            <div className="space-y-2">
              {Object.entries(mockUsers).map(
                ([email, user]) => (
                  <button
                    key={email}
                    onClick={() => quickLogin(email)}
                    className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm"
                  >
                    <span className="text-gray-700">
                      {user.name}
                    </span>
                    <span className="text-gray-500 ml-2">
                      ({user.role})
                    </span>
                  </button>
                ),
              )}
            </div>
          </div>
        </div>

        <p className="text-center mt-6 text-sm text-gray-600">
          Secure • Scalable • Cloud-Based
        </p>
      </div>
    </div>
  );
}