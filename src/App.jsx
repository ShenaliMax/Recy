// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Sidebar from './pages/Sidebar';

import RecyclingCenterList from './pages/RecyclingCenters/RecyclingCenterList';
import AddRecyclingCenter from './pages/RecyclingCenters/AddRecyclingCenter';
import EditRecyclingCenter from './pages/RecyclingCenters/EditRecyclingCenter';

import DriverList from './pages/Drivers/DriverList';
import AddDriver from './pages/Drivers/AddDriver';
import EditDriver from './pages/Drivers/EditDriver';

import TruckList from './pages/Trucks/TruckList';
import AddTruck from './pages/Trucks/AddTruck';
import UpdateTruckStatus from './pages/Trucks/UpdateTruckStatus';

import BinList from './pages/Bins/BinList';
import AddBin from './pages/Bins/AddBin';
import UpdateBinFill from './pages/Bins/UpdateBinFill';

function App() {
  return (
    <Router>
      <Box display="flex">
        <Sidebar />
        <Box flex="1" ml="250px" p={5}>
          <Routes>
            {/* Recycling Center Routes */}
            <Route path="/centers" element={<RecyclingCenterList />} />
            <Route path="/add-center" element={<AddRecyclingCenter />} />
            <Route path="/edit-center/:centerId" element={<EditRecyclingCenter />} />

            {/* Driver Routes */}
            <Route path="/drivers" element={<DriverList />} />
            <Route path="/drivers/add" element={<AddDriver />} />
            <Route path="/drivers/edit/:driverId" element={<EditDriver />} />

            {/* Truck Routes */}
            <Route path="/trucks" element={<TruckList />} />
            <Route path="/trucks/add" element={<AddTruck />} />
            <Route path="/trucks/update/:truckId" element={<UpdateTruckStatus />} />

            {/* Bin Routes */}
            <Route path="/bins" element={<BinList />} />
            <Route path="/bins/add" element={<AddBin />} />
            <Route path="/bins/update/:binId" element={<UpdateBinFill />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
