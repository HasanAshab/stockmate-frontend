// Mock API for Products
export const getProducts = async () => {
  await new Promise(r => setTimeout(r, 400));
  return {
    data: [
      { id: 1, name: "MacBook Pro 16\"", sku: "MAC-PRO-16", category: "Electronics", supplier: "Global Tech Supplies", price: 2500.00, image_url: "https://via.placeholder.com/150?text=MacBook" },
      { id: 2, name: "Dell XPS 15", sku: "DELL-XPS-15", category: "Electronics", supplier: "Mega Traders", price: 2000.00, image_url: "https://via.placeholder.com/150?text=Dell" },
      { id: 3, name: "Ergonomic Chair", sku: "FURN-CHAIR-01", category: "Furniture", supplier: "Mega Traders", price: 150.00, image_url: "https://via.placeholder.com/150?text=Chair" }
    ]
  };
};

export const createProduct = async (data) => {
  await new Promise(r => setTimeout(r, 400));
  return { data: { ...data, id: Math.floor(Math.random() * 1000), image_url: "https://via.placeholder.com/150?text=New" } };
};

export const updateProduct = async ({ id, data }) => {
  await new Promise(r => setTimeout(r, 400));
  return { data };
};

export const deleteProduct = async (id) => {
  await new Promise(r => setTimeout(r, 400));
  return { success: true };
};
