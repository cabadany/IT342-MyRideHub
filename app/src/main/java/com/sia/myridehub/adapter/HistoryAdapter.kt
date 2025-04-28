package com.sia.myridehub.adapter

import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.sia.myridehub.R
import com.sia.myridehub.ViewBookingDetailsActivity
import com.sia.myridehub.model.Booking

class HistoryAdapter : RecyclerView.Adapter<HistoryAdapter.HistoryViewHolder>() {

    private val bookings = mutableListOf<Booking>()

    fun updateData(newItems: List<Booking>) {
        bookings.clear()
        bookings.addAll(newItems)
        notifyDataSetChanged()
    }

    fun getItem(position: Int): Booking {
        return bookings[position]
    }

    fun removeItem(position: Int) {
        bookings.removeAt(position)
        notifyItemRemoved(position)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): HistoryViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_booking_history, parent, false)
        return HistoryViewHolder(view)
    }

    override fun onBindViewHolder(holder: HistoryViewHolder, position: Int) {
        val booking = bookings[position]

        holder.pickupReturn.text = "📅 ${booking.pickupDate} ➔ ${booking.returnDate}"
        holder.totalPrice.text = "💵 ₱${booking.totalPrice}"

        holder.itemView.setOnClickListener {
            val context = holder.itemView.context
            val intent = Intent(context, ViewBookingDetailsActivity::class.java)
            intent.putExtra("pickupDate", booking.pickupDate)
            intent.putExtra("returnDate", booking.returnDate)
            intent.putExtra("pickupTime", booking.pickupTime)
            intent.putExtra("dropoffTime", booking.dropoffTime)
            intent.putExtra("withDriver", booking.withDriver ?: false)
            intent.putExtra("totalDays", booking.totalDays ?: 0)
            intent.putExtra("totalPrice", booking.totalPrice ?: 0)
            context.startActivity(intent)
        }
    }

    override fun getItemCount(): Int = bookings.size

    class HistoryViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val pickupReturn: TextView = itemView.findViewById(R.id.textPickupReturn)
        val totalPrice: TextView = itemView.findViewById(R.id.textTotalPrice)
    }
}