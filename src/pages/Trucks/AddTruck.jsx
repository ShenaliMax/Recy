// src/pages/Trucks/AddTruck.jsx
import React, { useState } from 'react';
import {
  Box, Button, FormLabel, Input, VStack, useToast
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTruck = () => {
  const [form, setForm] = useState({ truckId: '', capacity: '' });
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/trucks/add', form);
      toast({ title: 'Truck added', status: 'success' });
      navigate('/trucks');
    } catch (err) {
      toast({ title: 'Add failed', status: 'error' });
    }
  };

  return (
    <Box p={5}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormLabel>Truck ID</FormLabel>
          <Input name="truckId" onChange={handleChange} required />

          <FormLabel>Capacity</FormLabel>
          <Input type="number" name="capacity" onChange={handleChange} required />

          <Button type="submit" colorScheme="teal">Add Truck</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddTruck;
