import yardModel from "../models/yardModel.js";
import slugify from "slugify";

export const createYardController = async (req, res) => {
  try {
    const { name, size } = req.body;
    if (!name || !size) {
      return res.status(401).send({ message: "Name and Size are required" });
    }
    const existingYard = await yardModel.findOne({ name });
    if (existingYard) {
      return res.status(200).send({
        success: true,
        message: "Yard Already Exists",
      });
    }
    const yard = await new yardModel({
      name,
      slug: slugify(name),
      size,
    }).save();
    res.status(201).send({
      success: true,
      message: "New yard created",
      yard,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating yard",
    });
  }
};

export const updateYardController = async (req, res) => {
  try {
    const { name, size } = req.body;
    const { id } = req.params;
    const yard = await yardModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name), size },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Yard Updated Successfully",
      yard,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating yard",
    });
  }
};

export const getAllYardsController = async (req, res) => {
  try {
    const yards = await yardModel.find({});
    res.status(200).send({
      success: true,
      message: "All Yards List",
      yards,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all yards",
    });
  }
};

export const singleYardController = async (req, res) => {
  try {
    const yard = await yardModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get Single Yard Successfully",
      yard,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Yard",
    });
  }
};

export const deleteYardController = async (req, res) => {
  try {
    const { id } = req.params;
    await yardModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Yard Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting yard",
      error,
    });
  }
};
