// Mock API for Orders
export const getPurchaseOrders = async () => {
  await new Promise(r => setTimeout(r, 400));
  return {
    data: [
      { id: 1, supplier_name: "Global Tech Supplies", warehouse_name: "Main Hub", status: 2, total_items: 100, created_at: new Date().toISOString() },
      { id: 2, supplier_name: "Mega Traders", warehouse_name: "North Branch", status: 4, total_items: 50, created_at: new Date().toISOString() }
    ]
  };
};

export const getSalesOrders = async () => {
  await new Promise(r => setTimeout(r, 400));
  return {
    data: [
      { id: 1, customer_name: "John Doe", warehouse_name: "Main Hub", status: 1, total_amount: 5000.00, created_at: new Date().toISOString() },
      { id: 2, customer_name: "Acme Corp", warehouse_name: "North Branch", status: 2, total_amount: 15000.00, created_at: new Date().toISOString() }
    ]
  };
};
