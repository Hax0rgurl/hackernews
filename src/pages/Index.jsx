
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon, ExternalLink } from 'lucide-react';
import Footer from '@/components/Footer';
import MatrixBackground from '@/components/MatrixBackground';

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
      <MatrixBackground />
      <div className="container mx-auto p-4 max-w-4xl relative z-10">
        <div className="bg-black border border-primary p-2 flex items-center gap-2">
          <div className="font-bold text-lg text-primary">Matrix News</div>
          <div className="text-sm text-primary flex space-x-2">
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
            className="mb-4 border border-primary bg-black text-primary placeholder:text-primary/50"
          />
        </div>
        
        {isLoading && (
          <div className="space-y-2">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="animate-pulse flex">
                <div className="h-4 w-4 bg-primary/30 mr-2"></div>
                <div className="h-4 bg-primary/30 rounded w-3/4"></div>
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
                  <span className="text-primary/70 mr-1">{index + 1}.</span>
                  <div>
                    <div className="flex items-center">
                      <a 
                        href={story.url || `https://news.ycombinator.com/item?id=${story.objectID}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="matrix-link"
                      >
                        {story.title}
                      </a>
                      {story.url && (
                        <span className="text-primary/70 text-xs ml-1">
                          ({new URL(story.url).hostname.replace('www.', '')})
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-primary/70">
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
