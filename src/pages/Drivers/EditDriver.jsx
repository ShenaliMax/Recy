// src/pages/Drivers/EditDriver.jsx
import React, { useEffect, useState } from 'react';
import {
  Box, Button, FormLabel, Input,Tbody, VStack, useToast, Spinner
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditDriver = () => {
  const { driverId } = useParams();
  const [form, setForm] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/drivers/list');
        const driver = res.data.find(d => d.driverId === driverId);
        if (driver) {
          setForm(driver);
        } else {
          toast({ title: 'Driver not found', status: 'error' });
          navigate('/drivers');
        }
      } catch {
        toast({ title: 'Failed to load driver', status: 'error' });
      }
    };
    fetchDriver();
  }, [driverId, toast, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/drivers/update/${driverId}`, {
        name: form.name,
        contactNumber: form.contactNumber
      });
      toast({ title: 'Driver updated', status: 'success' });
      navigate("/drivers");
    } catch {
      toast({ title: 'Update failed', status: 'error' });
    }
  };

  if (!form) return <Spinner />;

  return (
    <Box p={5}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormLabel>Driver ID </FormLabel>
          <Input value={form.driverId} isReadOnly />

          <FormLabel>Name</FormLabel>
          <Input name="name" value={form.name} onChange={handleChange} required />

          <FormLabel>License Number</FormLabel>
          <Input value={form.licenseNumber} isReadOnly />

          <FormLabel>Contact Number</FormLabel>
          <Input name="contactNumber" value={form.contactNumber} onChange={handleChange} required />

          <Button type="submit" colorScheme="blue">Update</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default EditDriver;
