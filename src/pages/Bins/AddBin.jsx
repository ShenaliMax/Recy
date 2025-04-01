// src/pages/Bins/AddBin.jsx
import React, { useState } from 'react';
import {
  Box, Button, FormLabel, Input, NumberInput, NumberInputField, VStack, useToast
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBin = () => {
  const [form, setForm] = useState({ binId: '', location: '', type: '', fillLevel: 0 });
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/bins/add', form);
      toast({ title: 'Bin added', status: 'success' });
      navigate('/bins');
    } catch {
      toast({ title: 'Add failed', status: 'error' });
    }
  };

  return (
    <Box p={5}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormLabel>Bin ID</FormLabel>
          <Input name="binId" onChange={handleChange} required />

          <FormLabel>Location</FormLabel>
          <Input name="location" onChange={handleChange} required />

          <FormLabel>Type</FormLabel>
          <Input name="type" onChange={handleChange} required />

          <FormLabel>Fill Level (%)</FormLabel>
          <NumberInput defaultValue={0} min={0} max={100}>
            <NumberInputField name="fillLevel" onChange={handleChange} />
          </NumberInput>

          <Button type="submit" colorScheme="teal">Add Bin</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddBin;
