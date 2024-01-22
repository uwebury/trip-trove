import dbConnect from "@/db/connect";
import Trip from "@/db/models/Trips";
import mongoose from "mongoose";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ status: `Invalid ID` });
  }

  if (request.method === "GET") {
    try {
      const trip = await Trip.findById(id);

      if (!trip) {
        return response.status(404).json({ status: `Not found` });
      }

      response.status(200).json(trip);
    } catch (error) {
      response.status(500).json({ status: `Server error` });
    }
  }

  if (request.method === "PATCH") {
    try {
      const updatedTrip = await Trip.findByIdAndUpdate(
        id,
        { $set: request.body },
        { new: true }
      );

      if (!updatedTrip) {
        return response.status(404).json({ status: `Trip not found` });
      }

      response.status(200).json({ status: `Trip updated`, updatedTrip });
    } catch (error) {
      response.status(500).json({ status: `Server error` });
    }
  }

  if (request.method === "DELETE") {
    await Trip.findByIdAndDelete(id);

    response.status(200).json({ status: `Trip successfully deleted.` });
  }
}
