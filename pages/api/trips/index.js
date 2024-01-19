import dbConnect from "@/db/connect";
import Trip from "@/db/models/Trips";

export default async function handler(request, response) {
  await dbConnect();

  try {
    if (request.method === "GET") {
      const trips = await Trip.find();
      return response.status(200).json(trips);
    }
    if (request.method === "POST") {
      const tripData = request.body;
      await Trip.create(tripData);
      return response.status(201).json({ status: "Trip added" });
    } else {
      return response.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    return response.status(400).json({ error: error.message });
  }
}
