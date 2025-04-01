// src/components/Sidebar.jsx
import { Box, VStack, Text, Link as ChakraLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Box
      width="250px"
      height="100vh"
      bg="green.700"
      color="white"
      p={5}
      position="fixed"
      top="0"
      left="0"
      boxShadow="md"
    >
      <Text fontSize="2xl" mb={8} fontWeight="bold">Recycling Center Manager</Text>
      <VStack align="flex-start" spacing={5}>
        <ChakraLink as={Link} to="/bins" _hover={{ textDecoration: 'underline' }}>
           Bins
        </ChakraLink>
        <ChakraLink as={Link} to="/trucks" _hover={{ textDecoration: 'underline' }}>
           Trucks
        </ChakraLink>
        <ChakraLink as={Link} to="/drivers" _hover={{ textDecoration: 'underline' }}>
           Drivers
        </ChakraLink>
        <ChakraLink as={Link} to="/centers" _hover={{ textDecoration: 'underline' }}>
           Centers
        </ChakraLink>
      </VStack>
    </Box>
  );
};

export default Sidebar;
