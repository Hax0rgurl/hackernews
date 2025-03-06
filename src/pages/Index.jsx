
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon, ExternalLink } from 'lucide-react';
import Footer from '@/components/Footer';

const fetchTopStories = async () => {
  const response = await fetch('https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=100');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, error } = useQuery({
    queryKey: ['topStories'],
    queryFn: fetchTopStories,
  });

  const filteredStories = data?.hits.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <>
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="bg-[#ff6600] p-2 flex items-center gap-2">
          <div className="font-bold text-lg text-black">Hacker News</div>
          <div className="text-sm text-black flex space-x-2">
            <a href="#" className="hover:underline">new</a>
            <span>|</span>
            <a href="#" className="hover:underline">past</a>
            <span>|</span>
            <a href="#" className="hover:underline">comments</a>
            <span>|</span>
            <a href="#" className="hover:underline">ask</a>
            <span>|</span>
            <a href="#" className="hover:underline">show</a>
            <span>|</span>
            <a href="#" className="hover:underline">jobs</a>
          </div>
        </div>
        
        <div className="my-4">
          <Input
            type="text"
            placeholder="Search stories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 border border-gray-300"
          />
        </div>
        
        {isLoading && (
          <div className="space-y-2">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="animate-pulse flex">
                <div className="h-4 w-4 bg-gray-300 mr-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        )}
        
        {error && <p className="text-destructive">Error: {error.message}</p>}
        
        {!isLoading && !error && (
          <ol className="list-decimal list-inside space-y-2 pl-5">
            {filteredStories.map((story, index) => (
              <li key={story.objectID} className="text-sm">
                <div className="flex items-start">
                  <span className="text-gray-500 mr-1">{index + 1}.</span>
                  <div>
                    <div className="flex items-center">
                      <a 
                        href={story.url || `https://news.ycombinator.com/item?id=${story.objectID}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-black hover:underline"
                      >
                        {story.title}
                      </a>
                      {story.url && (
                        <span className="text-gray-500 text-xs ml-1">
                          ({new URL(story.url).hostname.replace('www.', '')})
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      <span>{story.points} points</span> by <span className="hover:underline cursor-pointer">{story.author}</span> {story.created_at ? new Date(story.created_at).toLocaleString() : 'unknown time'} | 
                      <span className="hover:underline cursor-pointer ml-1">
                        {story.num_comments || 0} comments
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Index;
