// src/pages/Bins/BinList.jsx
import React, { useEffect, useState } from 'react';
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
  Text,
  useToast // ✅ Add this here
} from "@chakra-ui/react";


import { Link } from 'react-router-dom';
import axios from 'axios';

const BinList = () => {
  const [bins, setBins] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchBins = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/bins/list');
      setBins(res.data);
    } catch {
      toast({ title: 'Failed to load bins', status: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const deleteBin = async (id) => {
    if (!window.confirm('Delete this bin?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/bins/delete/${id}`);
      toast({ title: 'Deleted', status: 'success' });
      fetchBins();
    } catch {
      toast({ title: 'Delete failed', status: 'error' });
    }
  };

  useEffect(() => {
    fetchBins();
  }, []);

  return (
    <Box p={5}>
      <Heading mb={4}>Bin Management</Heading>
      <Button as={Link} to="/bins/add" colorScheme="teal" mb={4}>
        + Add Bin
      </Button>

      {loading ? <Spinner /> : (
        <Table>
          <Thead>
            <Tr>
              <Th>Bin ID</Th>
              <Th>Location</Th>
              <Th>Type</Th>
              <Th>Fill Level</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {bins.map(bin => (
              <Tr key={bin.binId}>
                <Td>{bin.binId}</Td>
                <Td>{bin.location}</Td>
                <Td>{bin.type}</Td>
                <Td>{bin.fillLevel}%</Td>
                <Td>
                  <Button as={Link} to={`/bins/update/${bin.binId}`} size="sm" colorScheme="blue" mr={2}>Update</Button>
                  <Button onClick={() => deleteBin(bin.binId)} size="sm" colorScheme="red">Delete</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default BinList;

