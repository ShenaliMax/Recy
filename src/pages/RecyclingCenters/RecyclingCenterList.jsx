import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  useToast,
  Box,
  Button,
  Heading,
  Text
} from "@chakra-ui/react";


import { Link } from "react-router-dom";
import axios from "axios";

const RecyclingCenterList = () => {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchCenters = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/recycling-centers/list");
      setCenters(res.data);
    } catch (err) {
      toast({
        title: "Failed to load centers",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteCenter = async (id) => {
    if (!window.confirm("Are you sure you want to delete this center?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/recycling-centers/delete/${id}`);
      toast({
        title: "Deleted successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      fetchCenters(); // refresh list
    } catch (err) {
      toast({
        title: "Delete failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchCenters();
  }, []);

  return (
    <Box p={5}>
      <Heading mb={4}>Recycling Center Management</Heading>
      <Button as={Link} to="/add-center" colorScheme="teal" mb={4}>
        + Add Recycling Center
      </Button>

      {loading ? (
        <Spinner />
      ) : (
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Center ID</Th>
              <Th>Name</Th>
              <Th>Location</Th>
              <Th>Materials Accepted</Th>
              <Th>Contact</Th>
              <Th>Operational Hours</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {centers.map((center) => (
              <Tr key={center.centerId}>
                <Td>{center.centerId}</Td>
                <Td>{center.name}</Td>
                <Td>{center.location}</Td>
                <Td>{center. materialsAccepted}</Td>
                <Td>{center.contactNumber}</Td>
                <Td>{center.operationalHours}</Td>
                <Td>
                  <Button
                    as={Link}
                    to={`/edit-center/${center.centerId}`}
                    colorScheme="blue"
                    size="sm"
                    mr={2}
                  >
                    Edit
                  </Button>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => deleteCenter(center.centerId)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default RecyclingCenterList;
