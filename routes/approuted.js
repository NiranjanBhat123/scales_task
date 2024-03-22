const express = require("express");
const router = express.Router();
const Pair = require("../models/pair");
const mongoose = require("mongoose");
const ObjectId = require('mongoose').Types.ObjectId;


router.post("/pairs", async (req, res) => {
  try {
    const { priceNative, priceUsd, volume } = req.body;
    const { h24, h6, h1, m5 } = volume;

    const newPair = new Pair({
      priceNative,
      priceUsd,
      volume: { h24, h6, h1, m5 },
    });

    const savedPair = await newPair.save();
    console.log(savedPair);
    res.status(200).json({ message: "Data inserted successfully" });
  } catch (error) {
    // Log the error

    console.error("Error inserting pair data:", error);

    // Return a 500 status code and an error message
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/prices", async (req, res) => {
  try {
    const pairs = await Pair.find({}, { priceNative: 1, priceUsd: 1 });
    res.json(pairs);
  } catch (error) {
    console.error("Error fetching price data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/volumes", async (req, res) => {
  try {
    const pairs = await Pair.find(
      {},
      { "volume.h24": 1, "volume.h6": 1, "volume.h1": 1, "volume.m5": 1 }
    );

    res.json(pairs);
  } catch (error) {
    console.error("Error fetching volume data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/pairs/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const deletedPair = await Pair.findByIdAndDelete(id);

    if (!deletedPair) {
      return res.status(404).json({ error: 'Pair not found' });
    }

    res.status(200).json({ message: 'Pair deleted successfully' });
  } catch (error) {
    console.error("Error deleting pair:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
