import React, { useEffect, useState } from 'react';
import {
  Box, Button, FormLabel, Input, Select, Spinner, VStack, useToast
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateTruckStatus = () => {
  const [status, setStatus] = useState('');
  const [driverId, setDriverId] = useState('');
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();
  const { truckId } = useParams();

  useEffect(() => {
    const fetchTruck = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/trucks/get/${truckId}`);
        setStatus(res.data.status || 'active');
        setDriverId(res.data.driverId || '');
      } catch (err) {
        toast({
          title: 'Failed to load truck data',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTruck();
  }, [truckId, toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/trucks/update-status/${truckId}`, {
        status,
        driverId
      });

      toast({
        title: 'Truck updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true
      });

      navigate('/trucks');
    } catch (err) {
      toast({
        title: 'Update failed',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }
  };

  if (loading) return <Spinner />;

  return (
    <Box p={5}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormLabel>Update Truck Status</FormLabel>
          <Select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="active">Active</option>
            <option value="in maintenance">In Maintenance</option>
          </Select>

          <FormLabel>Assign Driver ID</FormLabel>
          <Input
            placeholder="Enter Driver ID or leave blank for unassigned"
            value={driverId}
            onChange={(e) => setDriverId(e.target.value)}
          />

          <Button type="submit" colorScheme="blue">Update</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default UpdateTruckStatus;
