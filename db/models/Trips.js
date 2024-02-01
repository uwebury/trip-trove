import mongoose from "mongoose";

const { Schema } = mongoose;

const tripSchema = new Schema(
  {
    destination: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    imageURL: { type: String, default: "" },
    notes: { type: String },
    packingList: [
      {
        itemName: { type: String },
        itemQuantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

const Trip = mongoose.models.Trip || mongoose.model("Trip", tripSchema);

export default Trip;
