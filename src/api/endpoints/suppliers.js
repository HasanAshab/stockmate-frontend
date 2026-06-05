// Mock API for Suppliers
export const getSuppliers = async () => {
  await new Promise(r => setTimeout(r, 400));
  return {
    data: [
      { id: 1, name: "Global Tech Supplies", phone: "+8801711223344", email: "contact@globaltech.com", address: "Motijheel, Dhaka" },
      { id: 2, name: "Mega Traders", phone: "+8801811223344", email: "info@megatraders.bd", address: "Kakrail, Dhaka" }
    ]
  };
};

export const createSupplier = async (data) => {
  await new Promise(r => setTimeout(r, 400));
  return { data: { ...data, id: Math.floor(Math.random() * 1000) } };
};

export const updateSupplier = async ({ id, data }) => {
  await new Promise(r => setTimeout(r, 400));
  return { data };
};

export const deleteSupplier = async (id) => {
  await new Promise(r => setTimeout(r, 400));
  return { success: true };
};
