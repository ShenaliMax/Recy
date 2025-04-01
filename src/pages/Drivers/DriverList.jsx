// src/pages/Drivers/DriverList.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  useToast
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";


const DriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchDrivers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/drivers/list');
      setDrivers(res.data);
    } catch (err) {
      toast({ title: 'Failed to load drivers', status: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const deleteDriver = async (id) => {
    if (!window.confirm('Delete this driver?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/drivers/delete/${id}`);
      toast({ title: 'Deleted', status: 'success' });
      fetchDrivers();
    } catch (err) {
      toast({ title: 'Delete failed', status: 'error' });
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  return (
    <Box p={5}>
      <Heading mb={4}>Driver Management</Heading>
      <Button as={Link} to="/drivers/add" colorScheme="teal" mb={4}>
        + Add Driver
      </Button>

      {loading ? <Spinner /> : (
        <Table>
          <Thead>
            <Tr>
              <Th>Driver ID</Th>
              <Th>Name</Th>
              <Th>License</Th>
              <Th>Contact</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {drivers.map(driver => (
              <Tr key={driver.driverId}>
                <Td>{driver.driverId}</Td>
                <Td>{driver.name}</Td>
                <Td>{driver.licenseNumber}</Td>
                <Td>{driver.contactNumber}</Td>
                <Td>
                  <Button as={Link} to={`/drivers/edit/${driver.driverId}`} size="sm" colorScheme="blue" mr={2}>Edit</Button>
                  <Button onClick={() => deleteDriver(driver.driverId)} size="sm" colorScheme="red">Delete</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default DriverList;
