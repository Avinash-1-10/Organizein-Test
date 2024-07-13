import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import FormCard from '../components/FormCard';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const MyForms = () => {
  const [forms, setForms] = useState([]);
  const [reload, setReload] = useState(false);

  const getForms = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/forms/user`);
      setForms(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getForms();
  }, [reload]);

  return (
    <>
      <Navbar />
      <div className='container mx-auto p-6'>
        <h1 className='text-3xl font-bold mb-6 text-center'>My Forms</h1>
        <div className='flex flex-wrap justify-center'>
          {forms.map((form) => (
            <FormCard
              key={form._id}
              id={form._id}
              title={form.title}
              description={form.description}
              type={'user'}
              setReload={setReload}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyForms;
