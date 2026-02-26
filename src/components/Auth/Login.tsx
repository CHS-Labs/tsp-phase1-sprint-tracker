import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../contexts/AuthContext';

const Login: React.FC = () => {
  const { login } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-blue-500 rounded-2xl mb-4">
            <span className="text-3xl font-bold text-white">TSP</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            The Simple Plan
          </h1>
          <p className="text-gray-600 mb-1">Phase 1 Extended</p>
          <p className="text-sm text-gray-500">60 Day Sprint Tracker</p>
        </div>

        <div className="mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-blue-800">
              <strong>Architecture Hardening & Validation Sprint</strong>
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Sign in with your authorized Google account to access the dashboard
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                login(credentialResponse.credential);
              }
            }}
            onError={() => {
              console.error('Login Failed');
              alert('Login failed. Please try again.');
            }}
            useOneTap
            theme="outline"
            size="large"
            text="signin_with"
            shape="rectangular"
          />
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Authorized users only. This application connects to your Google Sheet
            data and requires appropriate permissions.
          </p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            Google Sheets
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            OAuth 2.0
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            Secure
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
