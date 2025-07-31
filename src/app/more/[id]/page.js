"use client";
import Link from "next/link";
import { MahidolStore } from "../../data/store";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function MorePage() {
  const params = useParams();
  // Fetch the store data based on the ID
  const store = MahidolStore.find((item) => item.id === params.id);

  //create destination google map URLs
  const destination = store.latitude
    ? `${store.latitude},${store.longitude}`
    : "";

  const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;

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
        <div className="mb-12 lg:mb-8">
          <Link
            href="/more"
            className="text-blue-500 hover:underline text-lg lg:text-base"
          >
            ← Back to More
          </Link>
        </div>

        <div className="flex flex-col justify-center items-center mb-10 lg:block">
          <h1 className="text-4xl font-bold mb-4">{store.name}</h1>
          <p className="text-xl text-gray-600 mb-6">{store.description}</p>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="w-full h-1/2 rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <Image
              src={store.image}
              alt={store.name}
              width={1000}
              height={1000}
              className="object-cover"
            />
          </div>
          <div className="mt-6 w-full bg-white rounded-lg shadow-lg p-6">
            <div className="justify-center">
              <a
                href={store.linkURL ? store.linkURL : url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {store.linkURL? "Learn More" : "Get destination"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
