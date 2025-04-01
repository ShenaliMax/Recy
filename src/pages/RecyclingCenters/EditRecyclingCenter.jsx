import React, { useEffect, useState } from 'react';
import {
  Box, Button, FormLabel, Input, Textarea, VStack, useToast, Spinner
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditRecyclingCenter = () => {
  const [form, setForm] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();
  const { centerId } = useParams();

  // Fetch center by centerId
  useEffect(() => {
    const fetchCenter = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/recycling-centers/list');
        const center = res.data.find(c => c.centerId === centerId);
        if (center) {
          setForm({
            ...center,
            materialsAccepted: center.materialsAccepted.join(', ')
          });
        } else {
          toast({ title: 'Center not found', status: 'error' });
          navigate('/centers');
        }
      } catch (error) {
        toast({ title: 'Error fetching data', status: 'error' });
      }
    };

    fetchCenter();
  }, [centerId, navigate, toast]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...form,
        materialsAccepted: form.materialsAccepted.split(',').map(item => item.trim())
      };
      await axios.put(`http://localhost:5000/api/recycling-centers/update/${centerId}`, updatedData);
      toast({ title: 'Center updated', status: 'success' });
      navigate('/centers');
    } catch (error) {
      toast({ title: 'Error updating center', status: 'error' });
    }
  };

  if (!form) return <Spinner size="xl" />;

  return (
    <Box p={5}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormLabel>Center ID (read-only)</FormLabel>
          <Input value={form.centerId} isReadOnly />

          <FormLabel>Name</FormLabel>
          <Input name="name" value={form.name} onChange={handleChange} required />

          <FormLabel>Location</FormLabel>
          <Input name="location" value={form.location} onChange={handleChange} required />

          <FormLabel>Operational Hours</FormLabel>
          <Input name="operationalHours" value={form.operationalHours} onChange={handleChange} required />

          <FormLabel>Materials Accepted (comma separated)</FormLabel>
          <Textarea name="materialsAccepted" value={form.materialsAccepted} onChange={handleChange} required />

          <FormLabel>Contact Number</FormLabel>
          <Input name="contactNumber" value={form.contactNumber} onChange={handleChange} required />

          <Button type="submit" colorScheme="blue">Update</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default EditRecyclingCenter;
