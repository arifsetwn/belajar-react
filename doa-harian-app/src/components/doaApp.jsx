import { useState, useEffect } from 'react';
import { Search, BookOpen } from 'lucide-react';
import axios from 'axios';

const DoaApp = () => {
  const [doaList, setDoaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

// Fetch doa data from API

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://cors-anywhere.herokuapp.com/https://doa-doa-api-ahmadramadhan.fly.dev/api');
      setDoaList(response.data);
      setLoading(false);
    } catch (err) {
      console.error('API Error:', err);
      setError(`Gagal memuat data doa: ${err.message || 'Network error'}`);
      setLoading(false);
    }
  };

  fetchData();
}, []);

  // Filter doa berdasarkan pencarian
  const filteredDoa = doaList.filter(doa =>
    doa.doa.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doa.latin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doa.artinya.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-indigo-600 font-medium">Memuat doa-doa...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-lg font-semibold mb-2">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">Doa Harian</h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>{doaList.length} Doa</span>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari doa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
          />
        </div>
      </div>

      {/* Doa List */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <div className="space-y-6">
          {filteredDoa.map((doa) => (
            <div key={doa.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="p-6">
                {/* Title */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{doa.doa}</h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">#{doa.id}</span>
                </div>

                {/* Arabic Text */}
                <div className="mb-4 bg-gray-50 p-4 rounded-lg">
                  <p className="text-2xl text-right leading-loose text-gray-800 mb-2" style={{fontFamily: 'serif', direction: 'rtl'}}>
                    {doa.ayat}
                  </p>
                </div>

                {/* Latin */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 font-semibold mb-2">Latin:</p>
                  <p className="text-gray-700 italic bg-blue-50 p-3 rounded">{doa.latin}</p>
                </div>

                {/* Artinya */}
                <div>
                  <p className="text-sm text-gray-600 font-semibold mb-2">Artinya:</p>
                  <p className="text-gray-700 bg-green-50 p-3 rounded border-l-4 border-green-400">{doa.artinya}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDoa.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-md p-8">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Tidak ada doa yang ditemukan untuk "{searchTerm}"</p>
              <p className="text-gray-400 text-sm mt-2">Coba gunakan kata kunci yang berbeda</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoaApp;