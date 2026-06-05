// Mock API for Warehouses
export const getWarehouses = async () => {
  await new Promise(r => setTimeout(r, 400));
  return {
    data: [
      { id: 1, name: "Main Hub", location: "Gulshan, Dhaka", is_active: true },
      { id: 2, name: "North Branch", location: "Uttara, Dhaka", is_active: true },
      { id: 3, name: "Old Warehouse", location: "Mirpur, Dhaka", is_active: false }
    ]
  };
};

export const createWarehouse = async (data) => {
  await new Promise(r => setTimeout(r, 400));
  return { data: { ...data, id: Math.floor(Math.random() * 1000) } };
};

export const updateWarehouse = async ({ id, data }) => {
  await new Promise(r => setTimeout(r, 400));
  return { data };
};

export const toggleWarehouseStatus = async (id) => {
  await new Promise(r => setTimeout(r, 400));
  return { success: true };
};
