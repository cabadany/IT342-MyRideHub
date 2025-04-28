package com.sia.myridehub.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.sia.myridehub.R
import com.sia.myridehub.model.Vehicle

class VehicleAdapter(private val vehicleList: List<Vehicle>) :
    RecyclerView.Adapter<VehicleAdapter.VehicleViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): VehicleViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.vehicle_item, parent, false)
        return VehicleViewHolder(view)
    }

    override fun onBindViewHolder(holder: VehicleViewHolder, position: Int) {
        val vehicle = vehicleList[position]
        holder.bind(vehicle)
    }

    override fun getItemCount(): Int = vehicleList.size

    class VehicleViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val vehicleImage: ImageView = itemView.findViewById(R.id.vehicleImage)
        private val vehicleModel: TextView = itemView.findViewById(R.id.vehicleModel)
        private val vehiclePrice: TextView = itemView.findViewById(R.id.vehiclePrice)
        private val vehicleColor: TextView = itemView.findViewById(R.id.vehicleColor)
        private val vehicleSeats: TextView = itemView.findViewById(R.id.vehicleSeats)
        private val rentNowButton: Button = itemView.findViewById(R.id.rentNowButton)

        fun bind(vehicle: Vehicle) {
            // Set model and year together
            vehicleModel.text = "${vehicle.model} (${vehicle.year})"

            // Price per day
            vehiclePrice.text = "₱${vehicle.pricePerDay}/day"

            // Color
            vehicleColor.text = "Color: ${vehicle.color}"

            // Seats
            vehicleSeats.text = "Seats: ${vehicle.seats}"

            // Load image using Glide
            Glide.with(itemView.context)
                .load(vehicle.imageUrl)
                .placeholder(R.drawable.placeholder_image)
                .error(R.drawable.placeholder_image) // you can replace this with a separate error drawable if you want
                .into(vehicleImage)

            // Button click listener
            rentNowButton.setOnClickListener {
                Toast.makeText(itemView.context, "Renting ${vehicle.model}", Toast.LENGTH_SHORT).show()
            }
        }
    }
}