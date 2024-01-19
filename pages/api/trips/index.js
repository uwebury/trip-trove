import dbConnect from "@/db/connect";
import Trip from "@/db/models/Trips";

export default async function handler(request, response) {
  await dbConnect();

  try {
    if (request.method === "GET") {
      const trips = await Trip.find();
      response.status(200).json(trips);
    } else if (request.method === "POST") {
      const tripData = request.body;
      await Trip.create(tripData);
      response.status(201).json({ status: "Trip added" });
    } else {
      response.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    response.status(400).json({ error: error.message });
  }
}
