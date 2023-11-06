import { useEffect, useState } from 'react'
import './App.css'
import DataTable, { BookData } from './components/dataTable'
import axios from 'axios'

function App() {
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
  }, []);

  return (
    <>
      {!isLoading && <DataTable data={data}></DataTable>}
    </>
  )
}

export default App
