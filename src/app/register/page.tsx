import React from 'react';

const RegisterPage = () => {
  return (
    <div className="relative min-h-screen bg-gray-50 p-8">
      {/* Background Skeleton */}
      <div className="grid grid-cols-4 gap-6 opacity-30 pointer-events-none select-none">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="border border-gray-300 rounded-lg p-4 h-48 bg-white">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        ))}
      </div>

      {/* Centered Form Modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white border border-gray-200 rounded-xl p-8 w-full max-w-md shadow-none">
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-2">
            Get started with Jira
          </h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            It's free for up to 10 users - no credit card needed.
          </p>

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Work email
          </label>
          <div className="flex gap-2 mb-6">
            <input
              type="email"
              placeholder="you@company.com"
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700">
              Sign up
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <span className="font-bold text-lg">G</span> Google
          </button>

          <p className="text-center text-xs text-gray-500 mt-6">
            Already have Jira? <a href="#" className="text-blue-600 hover:underline">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;