import { useEffect, useState } from 'react';
import './App.css';
import DataTable, { BookData } from './components/dataTable';
import axios from 'axios';
import BookForm from './components/form';

function App() {
  const [bookData, setBookData] = useState<BookData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [data, setData] = useState<BookData[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [filterYear, setFilterYear] = useState<string>(''); // State for filtering by year


  const handleDeleteBook = async (book: string) => {
    try {
      await axios.delete(`http://localhost:3000/books/${book}`);
      console.log(book)
      const updatedData = data.filter((item) => item.id !== book);
      setBookData(updatedData);
    } catch (error) {
      console.error('Error deleting the book:', error);
    }
  }

  const handleAddData = (newData: BookData) => {
    axios
      .post('http://localhost:3000/books', newData)
      .then(() => {
        setBookData([...bookData, newData]);
      })
      .catch((error) => {
        console.error('Error adding data:', error);
      });
  };

  const handleFilter = async (year: string) => {
    try {
      const response = await axios.get<BookData[]>(
        `http://localhost:3000/books/filter-by-year?year=${year}`
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = async (searchTerm: string) => {
    try {
      const response = await axios.get<BookData[]>(
        `http://localhost:3000/books/search?title=${searchTerm}`
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get<BookData[]>(
          'http://localhost:3000/books'
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getData();
  }, [bookData]);

  return (
    <>
      <div className='flex justify-between mb-6'>
      <div className='flex items-center gap-2'>
      <h1>Year</h1>
      <input
  type="text"
  className='border-2 border-slate-700 rounded-md p-1'
  placeholder="Filter by year"
  value={filterYear}
  onChange={(e) => {
    setFilterYear(e.target.value);
    handleFilter(e.target.value);
  }}
  />
      </div>
      <div className='flex items-center gap-2'>
      <h1>Book Search</h1>
      <input
        type="text"
        className='border-2 border-slate-700 rounded-md p-1'
        placeholder="Search by title"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          handleSearch(e.target.value);
        }}
      />
      </div>
      </div>
      {!isLoading && <DataTable data={data} onDeleteBook={handleDeleteBook}></DataTable>}
      <BookForm data={bookData} onAddData={handleAddData}></BookForm>
    </>
  );
}

export default App;
