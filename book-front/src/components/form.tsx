import React, { useState } from 'react';

interface BookData {
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
      title: '',
      author: '',
      publish_date: '',
      description: '',
    });
  };

  // Define your columns and table rendering using react-table, similar to the previous example

  return (
    <div>
      <h1>Data Table</h1>
      <table>
        {/* Render your table using react-table */}
        {/* ... */}
      </table>

      <h2>Add Data</h2>
      <form>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
        </div>
        <div>
          <label>Author:</label>
          <input type="text" name="author" value={formData.author} onChange={handleInputChange} />
        </div>
        <div>
          <label>Publish Date:</label>
          <input type="date" name="publish_date" value={formData.publish_date} onChange={handleInputChange} />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleInputChange} />
        </div>
        <button type="button" onClick={handleAddData}>
          Add Data
        </button>
      </form>
    </div>
  );
};

export default BookForm;
