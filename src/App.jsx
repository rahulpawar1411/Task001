import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GoX } from "react-icons/go";

const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=6`);
      setData(prev => page === 1 ? res.data : [...prev, ...res.data]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, [page]);

  const removeHandle = (id) => {
    setData(prev => prev.filter(item => item.id !== id));
  }

  const showMore = () => {
    setPage(prev => prev + 1);
  }

  return (
    <div className='min-h-screen w-full px-8 flex justify-start items-center flex-wrap'>
      {loading && <p className='w-full text-center text-xl font-bold text-gray-500'>Loading...</p>}
      
      {data.length === 0 && !loading && (
        <p className='font-bold text-2xl text-gray-500 '>Posts not yet!</p>
      )}

      {data.map(item => (
        <div key={item.id} className='h-[310px] w-[280px] bg-white rounded-xl m-4 p-3 shadow-lg'>
          <div onClick={() => removeHandle(item.id)} className='flex justify-end px-2 cursor-pointer'>
            <GoX className='text-3xl text-red-600' />
          </div>
          <h1 className='text-xl text-black font-bold'>{item.title}</h1>
          <h3 className='text-black'>{item.body}</h3>
        </div>
      ))}

      <button 
        onClick={showMore} 
        className='fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[200px] p-2 bg-gray-500 rounded-2xl text-black text-xl cursor-pointer hover:bg-gray-600'
        disabled={loading}
      >
        {loading ? 'Loading...' : 'More Posts...'}
      </button>
    </div>
  );
}

export default App;
