import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Paper } from '@material-ui/core';
import { getVehicles, getComponents, createRepair, getIssues } from '../services/api';

function RepairForm() {
  const [vehicles, setVehicles] = useState([]);
  const [components, setComponents] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedComponent, setSelectedComponent] = useState('');
  const [repairType, setRepairType] = useState('repair');
  const [description, setDescription] = useState('');
  const [selectedIssue, setSelectedIssue] = useState(null)
  const [issues, setIssues] = useState([])


  useEffect(()=>{
    console.log(selectedComponent)
  }, [selectedComponent])

  useEffect(() => {
    getVehicles().then(setVehicles);
    getComponents().then(setComponents);
    getIssues().then(setIssues)
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const price = repairType ==="repair"?selectedComponent.repair_price: selectedComponent.purchase_price
    createRepair({
      vehicle: selectedVehicle,
      component: selectedComponent.id,
      repair_type: repairType,
      description: description,
      price,
      issue:selectedIssue.id
    }).then(() => {
      // Reset form or show success message
      setSelectedVehicle('');
      setSelectedComponent('');
      setRepairType('repair');
      setDescription('');
      alert('Repair submitted successfully!');
    });
  };

  return (
    <Paper style={{ padding: '20px' }}>
      <h2>Submit Repair</h2>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Vehicle</InputLabel>
          <Select value={selectedVehicle} onChange={(e) => setSelectedVehicle(e.target.value)}>
            {vehicles.map((vehicle) => (
              <MenuItem key={vehicle.id} value={vehicle.id}>
                {vehicle.make} {vehicle.model} ({vehicle.year})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Component</InputLabel>
          <Select value={selectedComponent} onChange={(e) => setSelectedComponent(e.target.value)}>
            {components.map((component) => (
              <MenuItem key={component.id} value={component}>
                {component.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Issue</InputLabel>
          <Select value={selectedIssue} onChange={(e) => setSelectedIssue(e.target.value)}>
            {issues.map((issue) => (
              <MenuItem key={issue.id} value={issue}>
                {issue.description}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Repair Type</InputLabel>
          <Select value={repairType} onChange={(e) => setRepairType(e.target.value)}>
            <MenuItem value="repair">Repair</MenuItem>
            <MenuItem value="replace">Replace</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
        />

        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Submit Repair
        </Button>
      </form>
    </Paper>
  );
}

export default RepairForm;