import Catergory from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.json({ error: "Name is required" });
    }

    const existingCategory = await Catergory.findOne({ name });

    if (existingCategory) {
      return res.json({ error: "Already Exists" });
    }

    const category = await new Catergory({ name }).save();
    res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

const updatCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    const category = await Catergory.findOne({ _id: categoryId });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    category.name = name;

    const updateCategory = await category.save();

    res.json(updateCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const removed = await Catergory.deleteOne({ _id: req.params.categoryId });
    res.json({ message: "Removed Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const listCategory = asyncHandler(async (req, res) => {
  try {
    const all = await Catergory.find({});
    res.json(all);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const readCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Catergory.findOne({ _id: id });
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Internal server error" });
  }
});

export {
  createCategory,
  updatCategory,
  deleteCategory,
  listCategory,
  readCategory,
};
