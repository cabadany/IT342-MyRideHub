package com.sia.myridehub

import android.content.Intent
import android.os.Bundle
import android.view.Gravity
import android.view.View
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.drawerlayout.widget.DrawerLayout
import androidx.recyclerview.widget.ItemTouchHelper
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.firebase.database.FirebaseDatabase
import com.sia.myridehub.adapter.HistoryAdapter
import com.sia.myridehub.model.Booking

class MyOrderActivity : AppCompatActivity() {

    private lateinit var drawerLayout: DrawerLayout
    private lateinit var menuButton: ImageButton
    private lateinit var spinnerHistoryType: Spinner
    private lateinit var recyclerViewHistory: RecyclerView
    private lateinit var historyAdapter: HistoryAdapter
    private lateinit var emptyStateLayout: LinearLayout

    // Track whether currently viewing Booking or Renting
    private var currentType: Int = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_my_order)

        drawerLayout = findViewById(R.id.drawerLayout)
        menuButton = findViewById(R.id.menuButton)
        spinnerHistoryType = findViewById(R.id.spinnerHistoryType)
        recyclerViewHistory = findViewById(R.id.recyclerViewHistory)
        emptyStateLayout = findViewById(R.id.emptyStateLayout)

        menuButton.setOnClickListener {
            drawerLayout.openDrawer(Gravity.RIGHT)
        }

        setupSpinner()
        setupRecyclerView()
        setupSwipeToDelete()
        setupNavigationItems()
    }

    private fun setupSpinner() {
        val adapter = ArrayAdapter.createFromResource(
            this,
            R.array.history_types,
            android.R.layout.simple_spinner_item
        )
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        spinnerHistoryType.adapter = adapter

        spinnerHistoryType.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(parent: AdapterView<*>, view: View?, position: Int, id: Long) {
                currentType = position
                loadHistoryFromFirebase(position)
            }

            override fun onNothingSelected(parent: AdapterView<*>) {
                // Do nothing
            }
        }
    }

    private fun setupRecyclerView() {
        recyclerViewHistory.layoutManager = LinearLayoutManager(this)
        historyAdapter = HistoryAdapter()
        recyclerViewHistory.adapter = historyAdapter
    }

    private fun setupSwipeToDelete() {
        val swipeHandler = object : ItemTouchHelper.SimpleCallback(0, ItemTouchHelper.LEFT or ItemTouchHelper.RIGHT) {
            override fun onMove(
                recyclerView: RecyclerView,
                viewHolder: RecyclerView.ViewHolder,
                target: RecyclerView.ViewHolder
            ): Boolean = false

            override fun onSwiped(viewHolder: RecyclerView.ViewHolder, direction: Int) {
                val position = viewHolder.adapterPosition
                historyAdapter.removeItem(position)

                Toast.makeText(
                    this@MyOrderActivity,
                    "Deleted!",
                    Toast.LENGTH_SHORT
                ).show()
            }
        }
        val itemTouchHelper = ItemTouchHelper(swipeHandler)
        itemTouchHelper.attachToRecyclerView(recyclerViewHistory)
    }

    private fun loadHistoryFromFirebase(type: Int) {
        val database = FirebaseDatabase.getInstance().reference

        database.child("bookings").get().addOnSuccessListener { snapshot ->
            val bookingList = mutableListOf<Booking>()
            snapshot.children.forEach { child ->
                val booking = child.getValue(Booking::class.java)
                booking?.let {
                    if (type == 0 && it.type == "booking") {
                        bookingList.add(it)
                    } else if (type == 1 && it.type == "renting") {
                        bookingList.add(it)
                    }
                }
            }

            if (bookingList.isEmpty()) {
                showEmptyState()
            } else {
                val sortedList = bookingList.sortedByDescending { it.timestamp }
                historyAdapter.updateData(sortedList)
                hideEmptyState()
            }
        }.addOnFailureListener {
            showEmptyState()
            Toast.makeText(this, "Failed to load history", Toast.LENGTH_SHORT).show()
        }
    }

    private fun setupNavigationItems() {
        findViewById<LinearLayout>(R.id.dashboardItem)?.setOnClickListener {
            startActivity(Intent(this, MainActivity::class.java))
            drawerLayout.closeDrawer(Gravity.RIGHT)
        }

        findViewById<LinearLayout>(R.id.myOrderItem)?.setOnClickListener {
            drawerLayout.closeDrawer(Gravity.RIGHT)
        }

        findViewById<LinearLayout>(R.id.myProfileItem)?.setOnClickListener {
            startActivity(Intent(this, ProfileActivity::class.java))
            drawerLayout.closeDrawer(Gravity.RIGHT)
        }

        findViewById<LinearLayout>(R.id.aboutUsItem)?.setOnClickListener {
            startActivity(Intent(this, AboutUsActivity::class.java))
            drawerLayout.closeDrawer(Gravity.RIGHT)
        }

        findViewById<LinearLayout>(R.id.contactUsItem)?.setOnClickListener {
            startActivity(Intent(this, ContactUsActivity::class.java))
            drawerLayout.closeDrawer(Gravity.RIGHT)
        }

        findViewById<LinearLayout>(R.id.logOutItem)?.setOnClickListener {
            startActivity(Intent(this, LoginActivity::class.java))
            finish()
        }
    }

    private fun showEmptyState() {
        recyclerViewHistory.visibility = View.GONE
        emptyStateLayout.visibility = View.VISIBLE
    }

    private fun hideEmptyState() {
        recyclerViewHistory.visibility = View.VISIBLE
        emptyStateLayout.visibility = View.GONE
    }
}