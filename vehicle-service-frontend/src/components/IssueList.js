import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Button, TextField, Dialog, DialogActions, DialogContent, 
  DialogTitle, Select, MenuItem, FormControl, InputLabel 
} from '@material-ui/core';
import { getIssues, createIssue, updateIssue, deleteIssue, getVehicles } from '../services/api';

function IssueList() {
  const [issues, setIssues] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentIssue, setCurrentIssue] = useState({ vehicle: '', description: '' });

  useEffect(() => {
    fetchIssues();
    fetchVehicles();
  }, []);

  const fetchIssues = () => {
    getIssues().then(setIssues);
  };

  const fetchVehicles = () => {
    getVehicles().then(setVehicles);
  };

  const handleOpen = (issue = { vehicle: '', description: '' }) => {
    setCurrentIssue(issue);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (currentIssue.id) {
      updateIssue(currentIssue.id, currentIssue).then(() => {
        fetchIssues();
        handleClose();
      });
    } else {
      createIssue(currentIssue).then(() => {
        fetchIssues();
        handleClose();
      });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this issue?')) {
      deleteIssue(id).then(fetchIssues);
    }
  };

  return (
    <div>
      <h2>Issues</h2>
      <Button variant="contained" color="primary" onClick={() => handleOpen()} style={{ marginBottom: '20px' }}>
        Add Issue
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Vehicle</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {issues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell>{`${issue.vehicle.make} ${issue.vehicle.model} (${issue.vehicle.year})`}</TableCell>
                <TableCell>{issue.description}</TableCell>
                <TableCell>{new Date(issue.created_at).toLocaleString()}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(issue)} color="primary" style={{ marginRight: '10px' }}>
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(issue.id)} color="secondary">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentIssue.id ? 'Edit Issue' : 'Add Issue'}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Vehicle</InputLabel>
            <Select
              value={currentIssue.vehicle}
              onChange={(e) => setCurrentIssue({ ...currentIssue, vehicle: e.target.value })}
            >
              {vehicles.map((vehicle) => (
                <MenuItem key={vehicle.id} value={vehicle.id}>
                  {vehicle.make} {vehicle.model} ({vehicle.year})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={currentIssue.description}
            onChange={(e) => setCurrentIssue({ ...currentIssue, description: e.target.value })}
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

export default IssueList;