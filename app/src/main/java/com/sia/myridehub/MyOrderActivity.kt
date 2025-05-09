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
import com.google.android.material.navigation.NavigationView
import com.google.firebase.database.FirebaseDatabase
import com.sia.myridehub.adapter.HistoryAdapter
import com.sia.myridehub.model.Booking

class MyOrderActivity : AppCompatActivity() {

    private lateinit var drawerLayout: DrawerLayout
    private lateinit var menuButton: ImageButton
    private lateinit var navigationView: NavigationView
    private lateinit var spinnerHistoryType: Spinner
    private lateinit var recyclerViewHistory: RecyclerView
    private lateinit var historyAdapter: HistoryAdapter
    private lateinit var emptyStateLayout: LinearLayout

    private var currentType: Int = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_my_order)

        drawerLayout = findViewById(R.id.drawerLayout)
        menuButton = findViewById(R.id.menuButton)
        navigationView = findViewById(R.id.navigationView)
        spinnerHistoryType = findViewById(R.id.spinnerHistoryType)
        recyclerViewHistory = findViewById(R.id.recyclerViewHistory)
        emptyStateLayout = findViewById(R.id.emptyStateLayout)

        // Get profile image from nav header layout
        val headerView = navigationView.getHeaderView(0)
        val profileImage = headerView.findViewById<ImageView>(R.id.profileImage)
        profileImage.setImageResource(R.drawable.profile_placeholder)

        menuButton.setOnClickListener {
            drawerLayout.openDrawer(Gravity.END)
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

            override fun onNothingSelected(parent: AdapterView<*>) {}
        }
    }

    private fun setupRecyclerView() {
        recyclerViewHistory.layoutManager = LinearLayoutManager(this)
        historyAdapter = HistoryAdapter()
        recyclerViewHistory.adapter = historyAdapter
    }

    private fun setupSwipeToDelete() {
        val swipeHandler = object : ItemTouchHelper.SimpleCallback(0, ItemTouchHelper.LEFT or ItemTouchHelper.RIGHT) {
            override fun onMove(rv: RecyclerView, vh: RecyclerView.ViewHolder, target: RecyclerView.ViewHolder): Boolean = false
            override fun onSwiped(vh: RecyclerView.ViewHolder, direction: Int) {
                historyAdapter.removeItem(vh.adapterPosition)
                Toast.makeText(this@MyOrderActivity, "Deleted!", Toast.LENGTH_SHORT).show()
            }
        }
        ItemTouchHelper(swipeHandler).attachToRecyclerView(recyclerViewHistory)
    }

    private fun loadHistoryFromFirebase(type: Int) {
        val database = FirebaseDatabase.getInstance().reference
        database.child("bookings").get().addOnSuccessListener { snapshot ->
            val bookings = snapshot.children.mapNotNull { it.getValue(Booking::class.java) }
                .filter { (type == 0 && it.type == "booking") || (type == 1 && it.type == "renting") }
                .sortedByDescending { it.timestamp }

            if (bookings.isEmpty()) showEmptyState()
            else {
                historyAdapter.updateData(bookings)
                hideEmptyState()
            }
        }.addOnFailureListener {
            showEmptyState()
            Toast.makeText(this, "Failed to load history", Toast.LENGTH_SHORT).show()
        }
    }

    private fun setupNavigationItems() {
        navigationView.setNavigationItemSelectedListener { menuItem ->
            drawerLayout.closeDrawer(Gravity.END)
            when (menuItem.itemId) {
                R.id.nav_home -> startActivity(Intent(this, MainActivity::class.java))
                R.id.nav_booking -> startActivity(Intent(this, BookRideActivity::class.java))
                R.id.nav_rent -> startActivity(Intent(this, RentVehicleActivity::class.java))
                R.id.nav_fare_calculator -> startActivity(Intent(this, FareCalculatorActivity::class.java))
                R.id.nav_terms -> startActivity(Intent(this, TermsConditionsActivity::class.java))
                R.id.nav_history -> startActivity(Intent(this, MyOrderActivity::class.java))
                R.id.nav_be_driver -> startActivity(Intent(this, BeDriverActivity::class.java))
                R.id.nav_appeal_form -> startActivity(Intent(this, ContactUsActivity::class.java))
                R.id.nav_settings -> startActivity(Intent(this, SettingsActivity::class.java))
            }
            true
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