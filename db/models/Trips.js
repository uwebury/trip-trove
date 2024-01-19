import mongoose from "mongoose";

const { Schema } = mongoose;

const tripSchema = new Schema(
  {
    destination: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    imageURL: { type: String },
    notes: { type: String },
    packing_list: { type: String },
  },
  { timestamps: true }
);

const Trip = mongoose.models.Trip || mongoose.model("Trip", tripSchema);

export default Trip;
