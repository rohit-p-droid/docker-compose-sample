import UsersList from '@/components/UsersList';
import ProductsList from '@/components/ProductsList';
import { API_CONFIG } from '@/config/api';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🚀 Full Stack App</h1>
          <p className="text-gray-600">Displaying data from our Express API</p>
        </div>

        {/* Content Grid */}
        <div className="space-y-8">
          <UsersList />
          <ProductsList />
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Frontend: <span className="font-mono">http://localhost:3001</span> | 
            API Server: <span className="font-mono">{API_CONFIG.baseURL}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
