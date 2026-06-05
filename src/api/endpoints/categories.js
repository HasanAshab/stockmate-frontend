// Mock API for Categories
export const getCategories = async () => {
  await new Promise(r => setTimeout(r, 400));
  return {
    data: [
      { id: 1, name: "Electronics", description: "Electronic devices and gadgets" },
      { id: 2, name: "Furniture", description: "Office and home furniture" },
      { id: 3, name: "Accessories", description: "Computer and phone accessories" }
    ]
  };
};

export const createCategory = async (data) => {
  await new Promise(r => setTimeout(r, 400));
  return { data: { ...data, id: Math.floor(Math.random() * 1000) } };
};

export const updateCategory = async ({ id, data }) => {
  await new Promise(r => setTimeout(r, 400));
  return { data };
};

export const deleteCategory = async (id) => {
  await new Promise(r => setTimeout(r, 400));
  return { success: true };
};
