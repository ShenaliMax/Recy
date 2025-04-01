// src/pages/Trucks/TruckList.jsx
import React, { useEffect, useState } from 'react';
import {
  Box, Table, Thead, Tbody, Tr, Th, Td, Button, Heading, useToast, Spinner
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TruckList = () => {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchTrucks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/trucks/list');
      setTrucks(res.data);
    } catch (err) {
      toast({ title: 'Failed to load trucks', status: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const deleteTruck = async (id) => {
    if (!window.confirm('Delete this truck?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/trucks/delete/${id}`);
      toast({ title: 'Deleted successfully', status: 'success' });
      fetchTrucks();
    } catch {
      toast({ title: 'Delete failed', status: 'error' });
    }
  };

  useEffect(() => {
    fetchTrucks();
  }, []);

  return (
    <Box p={5}>
      <Heading mb={4}>Truck Management</Heading>
      <Button as={Link} to="/trucks/add" colorScheme="teal" mb={4}>
        + Add Truck
      </Button>

      {loading ? <Spinner /> : (
        <Table>
          <Thead>
            <Tr>
              <Th>Truck ID</Th>
              <Th>Capacity</Th>
              <Th>Status</Th>
             
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {trucks.map(truck => (
              <Tr key={truck.truckId}>
                <Td>{truck.truckId}</Td>
                <Td>{truck.capacity}</Td>
                <Td>{truck.status}</Td>
                
                <Td>
                  <Button as={Link} to={`/trucks/update/${truck.truckId}`} size="sm" colorScheme="blue" mr={2}>Update</Button>
                  <Button onClick={() => deleteTruck(truck.truckId)} size="sm" colorScheme="red">Delete</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default TruckList;
