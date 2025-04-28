package com.sia.myridehub.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView

class HistoryAdapter : RecyclerView.Adapter<HistoryAdapter.HistoryViewHolder>() {

    private var dataList = emptyList<String>()

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): HistoryViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(android.R.layout.simple_list_item_1, parent, false)
        return HistoryViewHolder(view)
    }

    override fun onBindViewHolder(holder: HistoryViewHolder, position: Int) {
        holder.textView.text = dataList[position]
    }

    override fun getItemCount(): Int = dataList.size

    fun updateData(newData: List<String>) {
        dataList = newData
        notifyDataSetChanged()
    }

    fun removeItem(position: Int) {
        dataList = dataList.toMutableList().apply { removeAt(position) }
        notifyItemRemoved(position)
    }

    fun getItem(position: Int): String {
        return dataList[position]
    }

    class HistoryViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val textView: TextView = view.findViewById(android.R.id.text1)
    }
}