import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import { getInvoices, updateInvoice } from '../services/api';

function InvoiceList() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();

  }, []);

  const fetchInvoices = () => {
    getInvoices().then(setInvoices);
  };

  const handlePayment = (invoice) => {
    updateInvoice(invoice.id, { vehicle:invoice.vehicle, total_amount:invoice.total_amount, paid: true }).then(fetchInvoices);
  };

  return (
    <div>
      <h2>Invoices</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Vehicle</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.vehicle}</TableCell>
                <TableCell>${invoice.total_amount}</TableCell>
                <TableCell>{new Date(invoice.created_at).toLocaleString()}</TableCell>
                <TableCell>{invoice.paid ? 'Paid' : 'Unpaid'}</TableCell>
                <TableCell>
                  {!invoice.paid && (
                    <Button variant="contained" color="primary" onClick={() => handlePayment(invoice)}>
                      Mark as Paid
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default InvoiceList;