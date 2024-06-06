const saleModel = require("../models/saleModel");

const getAllByUserId = async (request, response) => {
    const { userId } = request.params;
    console.log(`User ID from request params: ${userId}`);
    
    if (!userId) {
      return response.status(400).json({ error: 'User ID is required' });
    }
  
    try {
      const userPurchases = await saleModel.getSalesByUserId(userId);
      return response.status(200).json(userPurchases);
    } catch (err) {
      console.error('Error fetching purchases:', err);
      return response.status(500).json({ error: 'Error fetching purchases' });
    }
  };

const makeSale = async (request, response) => {
  const makeSale = await saleModel.makeSale(request.body);
  return response.status(201).json(makeSale);
};

module.exports = {
  getAllByUserId,
  makeSale
};