import { prodsDAO } from '../dao/indexDAO.js';

const allProducts = async (req, res) => {
  let allProducts = await prodsDAO.getAll();
  if (!allProducts) res.status(500).send("Server error");
  res.status(200).send(allProducts);
};

const getSingle = async (req, res) => {
  const id = req.params.pid;
  const prodById = await prodsDAO.getById(id);
  if(!prodById) res.status(500).send("Server error");
  res.status(200).send(prodById);
};

const productAdd = async (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) res.status(400).send({ status: "error", error: "Incomplete values" });
  const state = await prodsDAO.add(name, price);
  if (!state) res.status(500).send("Server Error, the product was not added");
  res.status(200).send("The product was added successfully");
};

const updateProduct = async (req, res) => {
  const idProd = req.params.pid;
  const { name, price } = req.body;
  const newProds = await prodsDAO.findUpdate(idProd, name, price);
  if(!newProds) res.status(500).send("Server Error, the product was not updated");
  res.status(200).send("The product was updated successfully");
};

const deleteById = async (req, res) => {
  const idProd = req.params.pid;
  const state =  await prodsDAO.deleteById(idProd);
  if (!state) res.status(500).send("Server Error, the product was not deleted");
  res.status(200).send("The product was deleted successfully");
};

export { allProducts, getSingle, productAdd, updateProduct, deleteById };
