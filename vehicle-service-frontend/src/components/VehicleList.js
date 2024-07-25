import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { getVehicles, createVehicle, updateVehicle, deleteVehicle } from '../services/api';

function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState({ make: '', model: '', year: '', license_plate: '' });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = () => {
    getVehicles().then(setVehicles);
  };

  const handleOpen = (vehicle = { make: '', model: '', year: '', license_plate: '' }) => {
    setCurrentVehicle(vehicle);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (currentVehicle.id) {
      updateVehicle(currentVehicle.id, currentVehicle).then(() => {
        fetchVehicles();
        handleClose();
      });
    } else {
      createVehicle(currentVehicle).then(() => {
        fetchVehicles();
        handleClose();
      });
    }
  };

  const handleDelete = (id) => {
    deleteVehicle(id).then(fetchVehicles);
  };

  return (
    <div>
      <h2>Vehicles</h2>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>Add Vehicle</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Make</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>License Plate</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>{vehicle.make}</TableCell>
                <TableCell>{vehicle.model}</TableCell>
                <TableCell>{vehicle.year}</TableCell>
                <TableCell>{vehicle.license_plate}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(vehicle)}>Edit</Button>
                  <Button onClick={() => handleDelete(vehicle.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentVehicle.id ? 'Edit Vehicle' : 'Add Vehicle'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Make"
            type="text"
            fullWidth
            value={currentVehicle.make}
            onChange={(e) => setCurrentVehicle({ ...currentVehicle, make: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Model"
            type="text"
            fullWidth
            value={currentVehicle.model}
            onChange={(e) => setCurrentVehicle({ ...currentVehicle, model: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Year"
            type="number"
            fullWidth
            value={currentVehicle.year}
            onChange={(e) => setCurrentVehicle({ ...currentVehicle, year: e.target.value })}
          />
          <TextField
            margin="dense"
            label="License Plate"
            type="text"
            fullWidth
            value={currentVehicle.license_plate}
            onChange={(e) => setCurrentVehicle({ ...currentVehicle, license_plate: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default VehicleList;