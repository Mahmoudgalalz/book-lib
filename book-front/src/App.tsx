import { useEffect, useState } from 'react'
import './App.css'
import DataTable, { BookData } from './components/dataTable'
import axios from 'axios'
import BookForm from './components/form'

function App() {
  const [bookData, setBookData] = useState<BookData[]>([]);

  const handleAddData = (newData: BookData) => {
    axios.post('http://localhost:3000/book',newData)
    setBookData([...bookData, newData]);
  };

  const [data,setData] = useState<BookData>()
  const [isLoading,setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get('http://localhost:3000/book');
        setData(response.data);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getData();
  }, [data,bookData]);

  return (
    <>
      {!isLoading && <DataTable data={data}></DataTable>}
      <BookForm data={bookData} onAddData={handleAddData}></BookForm>
    </>
  )
}

export default App
