'use client'
import Link from 'next/link';
import { MahidolStore } from '../../data/store';
import { useParams } from 'next/navigation';


export default function MorePage() {
  const params = useParams();


  // Fetch the store data based on the ID
  const store = MahidolStore.find((item) => item.id === params.id);

  if (!store) {
    return (
      <div className="min-h-screen p-8">
        <h1 className="text-4xl font-bold mb-8">Store Not Found</h1>
        <Link href="/more" className="text-blue-500 hover:underline">
          Return to More
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{store.name}</h1>
        <p className="text-xl text-gray-600 mb-6">{store.description}</p>
        {/* Add more details about the store here */}
      </div>
    </div>
  );
}