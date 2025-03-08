import lengthModel from "../models/lengthModel.js";
import slugify from "slugify";

export const createLengthController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingLength = await lengthModel.findOne({ name });
    if (existingLength) {
      return res.status(200).send({
        success: true,
        message: "Length Already Exists",
      });
    }
    const length = await new lengthModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "New length created",
      length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Length",
    });
  }
};

export const updateLengthController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const length = await lengthModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Length Updated Successfully",
      length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating length",
    });
  }
};

export const getAllLengthsController = async (req, res) => {
  try {
    const lengths = await lengthModel.find({});
    res.status(200).send({
      success: true,
      message: "All Lengths List",
      lengths,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all lengths",
    });
  }
};

export const singleLengthController = async (req, res) => {
  try {
    const length = await lengthModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get Single Length Successfully",
      length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Length",
    });
  }
};

export const deleteLengthController = async (req, res) => {
  try {
    const { id } = req.params;
    await lengthModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Length Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting length",
      error,
    });
  }
};
