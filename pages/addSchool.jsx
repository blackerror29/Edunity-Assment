import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [imagePreview, setImagePreview] = useState(null);

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    try {
      const response = await axios.post('/api/addSchool', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('School added successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to add school');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-4 border rounded shadow-md space-y-4">
      <div>
        <label className="block mb-1">Name</label>
        <input {...register('name', { required: true })} className="w-full p-2 border rounded" />
        {errors.name && <p className="text-red-500">This field is required</p>}
      </div>
      <div>
        <label className="block mb-1">Address</label>
        <input {...register('address', { required: true })} className="w-full p-2 border rounded" />
        {errors.address && <p className="text-red-500">This field is required</p>}
      </div>
      <div>
        <label className="block mb-1">City</label>
        <input {...register('city', { required: true })} className="w-full p-2 border rounded" />
        {errors.city && <p className="text-red-500">This field is required</p>}
      </div>
      <div>
        <label className="block mb-1">State</label>
        <input {...register('state', { required: true })} className="w-full p-2 border rounded" />
        {errors.state && <p className="text-red-500">This field is required</p>}
      </div>
      <div>
        <label className="block mb-1">Contact</label>
        <input type="number" {...register('contact', { required: true })} className="w-full p-2 border rounded" />
        {errors.contact && <p className="text-red-500">This field is required</p>}
      </div>
      <div>
        <label className="block mb-1">Email</label>
        <input type="email" {...register('email_id', { required: true })} className="w-full p-2 border rounded" />
        {errors.email_id && <p className="text-red-500">This field is required</p>}
      </div>
      <div>
        <label className="block mb-1">Image</label>
        <input type="file" {...register('image', { required: true })} onChange={(e) => setImagePreview(URL.createObjectURL(e.target.files[0]))} className="w-full p-2 border rounded" />
        {errors.image && <p className="text-red-500">This field is required</p>}
        {imagePreview && <img src={imagePreview} alt="School Preview" className="mt-2 w-32 h-32 object-cover" />}
      </div>
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Add School</button>
    </form>
  );
}
