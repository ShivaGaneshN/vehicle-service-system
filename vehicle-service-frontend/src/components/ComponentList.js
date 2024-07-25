import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { getComponents, createComponent, updateComponent, deleteComponent } from '../services/api';

function ComponentList() {
  const [components, setComponents] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentComponent, setCurrentComponent] = useState({ name: '', repair_price: '', purchase_price: '' });

  useEffect(() => {
    fetchComponents();
  }, []);

  const fetchComponents = () => {
    getComponents().then(setComponents);
  };

  const handleOpen = (component = { name: '', repair_price: '', purchase_price: '' }) => {
    setCurrentComponent(component);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (currentComponent.id) {
      updateComponent(currentComponent.id, currentComponent).then(() => {
        fetchComponents();
        handleClose();
      });
    } else {
      createComponent(currentComponent).then(() => {
        fetchComponents();
        handleClose();
      });
    }
  };

  const handleDelete = (id) => {
    deleteComponent(id).then(fetchComponents);
  };

  return (
    <div>
      <h2>Components</h2>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>Add Component</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Repair Price</TableCell>
              <TableCell>Purchase Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {components.map((component) => (
              <TableRow key={component.id}>
                <TableCell>{component.name}</TableCell>
                <TableCell>{component.repair_price}</TableCell>
                <TableCell>{component.purchase_price}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(component)}>Edit</Button>
                  <Button onClick={() => handleDelete(component.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentComponent.id ? 'Edit Component' : 'Add Component'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={currentComponent.name}
            onChange={(e) => setCurrentComponent({ ...currentComponent, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Repair Price"
            type="number"
            fullWidth
            value={currentComponent.repair_price}
            onChange={(e) => setCurrentComponent({ ...currentComponent, repair_price: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Purchase Price"
            type="number"
            fullWidth
            value={currentComponent.purchase_price}
            onChange={(e) => setCurrentComponent({ ...currentComponent, purchase_price: e.target.value })}
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

export default ComponentList;