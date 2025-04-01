// src/pages/RecyclingCenters/AddRecyclingCenter.jsx
import React, { useState } from 'react';
import {
  Box, Button, FormLabel, Input, Textarea, VStack, useToast,
  FormControl, FormErrorMessage
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddRecyclingCenter = () => {
  const [form, setForm] = useState({
    centerId: '',
    name: '',
    location: '',
    operationalHours: '',
    materialsAccepted: '',
    contactNumber: ''
  });

  const [errors, setErrors] = useState({});
  const toast = useToast();
  const navigate = useNavigate();

  const validatePhone = (value) => {
    const isValid = /^\d{10}$/.test(value);
    setErrors(prev => ({
      ...prev,
      contactNumber: isValid ? '' : 'Contact number must be exactly 10 digits'
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "contactNumber") {
      validatePhone(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errors.contactNumber) {
      toast({ title: 'Please fix validation errors', status: 'error' });
      return;
    }

    try {
      const payload = {
        ...form,
        materialsAccepted: form.materialsAccepted.split(',').map(item => item.trim())
      };

      await axios.post('http://localhost:5000/api/recycling-centers/register', payload);
      toast({ title: 'Center added', status: 'success', duration: 3000 });
      navigate('/centers');
    } catch (error) {
      toast({ title: 'Error adding center', status: 'error', duration: 3000 });
    }
  };

  return (
    <Box p={5}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormLabel>Center ID</FormLabel>
          <Input name="centerId" onChange={handleChange} required />

          <FormLabel>Name</FormLabel>
          <Input name="name" onChange={handleChange} required />

          <FormLabel>Location</FormLabel>
          <Input name="location" onChange={handleChange} required />

          <FormLabel>Operational Hours</FormLabel>
          <Input name="operationalHours" onChange={handleChange} required />

          <FormLabel>Materials Accepted (comma separated)</FormLabel>
          <Textarea name="materialsAccepted" onChange={handleChange} required />

          <center><FormControl isInvalid={!!errors.contactNumber} isRequired>
            <FormLabel>Contact Number</FormLabel>
            <Input
              name="contactNumber"
              value={form.contactNumber}
              onChange={handleChange}
              maxLength={10}
            />
            <FormErrorMessage>{errors.contactNumber}</FormErrorMessage>
          </FormControl></center>

          <Button type="submit" colorScheme="teal">Submit</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddRecyclingCenter;
