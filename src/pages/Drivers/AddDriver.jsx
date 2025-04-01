// src/pages/Drivers/AddDriver.jsx
import React, { useState } from 'react';
import {
  Box, Button, FormLabel, Input, VStack, useToast,
  FormControl, FormErrorMessage
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddDriver = () => {
  const [form, setForm] = useState({
    driverId: '',
    name: '',
    licenseNumber: '',
    contactNumber: ''
  });

  const [errors, setErrors] = useState({});
  const toast = useToast();
  const navigate = useNavigate();

  const validatePhone = (value) => {
    const isValid = /^\d{10}$/.test(value);
    setErrors(prev => ({
      ...prev,
      contactNumber: isValid ? '' : 'Phone number must be exactly 10 digits'
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
      await axios.post('http://localhost:5000/api/drivers/add', form);
      toast({ title: 'Driver added', status: 'success' });
      navigate("/drivers");
    } catch (err) {
      toast({ title: 'Error adding driver', status: 'error' });
    }
  };

  return (
    <Box p={5}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormLabel>Driver ID</FormLabel>
          <Input name="driverId" value={form.driverId} onChange={handleChange} required />

          <FormLabel>Name</FormLabel>
          <Input name="name" value={form.name} onChange={handleChange} required />

          <FormLabel>License Number</FormLabel>
          <Input name="licenseNumber" value={form.licenseNumber} onChange={handleChange} required />

          <center><FormControl isInvalid={!!errors.contactNumber} isRequired>
          <FormLabel>Contact Number</FormLabel>
            <Input
              name="contactNumber"
              value={form.contactNumber}
              onChange={handleChange}
              maxLength={10}
              required
            />
            
            <FormErrorMessage>{errors.contactNumber}</FormErrorMessage>
          </FormControl></center>

          <Button type="submit" colorScheme="teal">Add Driver</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddDriver;
