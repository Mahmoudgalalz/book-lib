import React, { useState } from 'react';

interface BookData {
    id:string
  title: string;
  author: string;
  publish_date: string; // Date as a string
  description: string;
}

interface DataTableProps {
  data: BookData[];
  onAddData: (newData: BookData) => void;
}

const BookForm: React.FC<DataTableProps> = ({ data, onAddData }) => {
  const [formData, setFormData] = useState<BookData>({
    id:'',
    title: '',
    author: '',
    publish_date: '',
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddData = () => {
    onAddData(formData);
    // Reset the form fields
    setFormData({
        id:'',
      title: '',
      author: '',
      publish_date: '',
      description: '',
    });
  };


  return (
    <div className='flex flex-col items-start gap-4 mt-6'>
      <h2 className='font-bold text-xl'>Add Data</h2>
      <form className='flex flex-col justify-center items-start gap-2'>
        <div className='flex items-center gap-2'>
          <label>Title</label>
          <input className='border-2 border-slate-700 rounded-md p-1' type="text" name="title" value={formData.title} onChange={handleInputChange} />
        </div>
        <div className='flex items-center gap-2'>
          <label>Author</label>
          <input className='border-2 border-slate-700 rounded-md p-1' type="text" name="author" value={formData.author} onChange={handleInputChange} />
        </div>
        <div className='flex items-center gap-2'>
          <label>Publish Date</label>
          <input className='border-2 border-slate-700 rounded-md p-1' type="date" name="publish_date" value={formData.publish_date} onChange={handleInputChange} />
        </div>
        <div className='flex items-center gap-2'>
          <label>Description</label>
          <textarea className='border-2 border-slate-700 rounded-md p-1' name="description" value={formData.description} onChange={handleInputChange} />
        </div>
        <button className='bg-slate-200 self-end p-2 rounded-lg hover:bg-slate-500 duration-200 hover:text-white' type="button" onClick={handleAddData}>
          Add Data
        </button>
      </form>
    </div>
  );
};

export default BookForm;
