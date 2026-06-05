// Mock API for Stock
export const getStockLogs = async () => {
  await new Promise(r => setTimeout(r, 400));
  return {
    data: [
      { id: 1, product_name: "MacBook Pro 16\"", sku: "MAC-PRO-16", type: "in", quantity: 50, warehouse_name: "Main Hub", user_name: "Admin User", created_at: new Date().toISOString() },
      { id: 2, name: "Dell XPS 15", product_name: "Dell XPS 15", sku: "DELL-XPS-15", type: "out", quantity: 5, warehouse_name: "North Branch", user_name: "Staff One", created_at: new Date(Date.now() - 86400000).toISOString() }
    ]
  };
};

export const submitStockIn = async (data) => {
  await new Promise(r => setTimeout(r, 400));
  return { success: true };
};

export const submitStockOut = async (data) => {
  await new Promise(r => setTimeout(r, 400));
  return { success: true };
};

export const submitStockTransfer = async (data) => {
  await new Promise(r => setTimeout(r, 400));
  return { success: true };
};
