import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import FormCard from '../components/FormCard';

const MyForms = () => {
  const [forms, setForms] = useState([]);

  const getForms = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/forms/user");
      setForms(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getForms();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">My Forms</h1>
        <div className="flex flex-wrap justify-center">
          {forms.map((form) => (
            <FormCard key={form._id} title={form.title} description={form.description} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyForms;
