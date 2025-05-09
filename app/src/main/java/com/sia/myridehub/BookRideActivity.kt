package com.sia.myridehub

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.drawerlayout.widget.DrawerLayout
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.MapView
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions
import com.google.android.material.navigation.NavigationView

class BookRideActivity : AppCompatActivity(), OnMapReadyCallback {

    private lateinit var mapView: MapView
    private lateinit var googleMap: GoogleMap
    private lateinit var drawerLayout: DrawerLayout
    private lateinit var navigationView: NavigationView

    private var pickupLocation: LatLng? = null
    private var dropOffLocation: LatLng? = null
    private var isPickupSelected = false

    private val LOCATION_PERMISSION_REQUEST_CODE = 1

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_book_ride)

        mapView = findViewById(R.id.mapView)
        drawerLayout = findViewById(R.id.drawerLayout)
        navigationView = findViewById(R.id.navigationView)

        navigationView.setNavigationItemSelectedListener { menuItem ->
            when (menuItem.itemId) {
                R.id.nav_home -> startActivity(Intent(this, MainActivity::class.java))
                R.id.nav_booking -> startActivity(Intent(this, BookRideActivity::class.java))
                R.id.nav_rent -> startActivity(Intent(this, RentVehicleActivity::class.java))
                // Add more as needed
            }
            drawerLayout.closeDrawers()
            true
        }

        mapView.onCreate(savedInstanceState)
        mapView.getMapAsync(this)
    }

    override fun onMapReady(map: GoogleMap) {
        googleMap = map

        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            googleMap.isMyLocationEnabled = true
        } else {
            ActivityCompat.requestPermissions(
                this,
                arrayOf(Manifest.permission.ACCESS_FINE_LOCATION),
                LOCATION_PERMISSION_REQUEST_CODE
            )
        }

        val defaultLocation = LatLng(14.5995, 120.9842) // Manila
        googleMap.moveCamera(CameraUpdateFactory.newLatLngZoom(defaultLocation, 12f))

        googleMap.setOnMapClickListener { latLng ->
            if (!isPickupSelected) {
                pickupLocation = latLng
                googleMap.clear()
                googleMap.addMarker(MarkerOptions().position(latLng).title("Pickup Location"))
                isPickupSelected = true
                Toast.makeText(this, "Pickup set! Now select Drop-off.", Toast.LENGTH_SHORT).show()
            } else {
                dropOffLocation = latLng
                googleMap.addMarker(MarkerOptions().position(latLng).title("Drop-off Location"))
                Toast.makeText(this, "Drop-off set! Redirecting...", Toast.LENGTH_SHORT).show()

                if (pickupLocation != null && dropOffLocation != null) {
                    val intent = Intent(this, SelectVehicleTypeActivity::class.java)
                    intent.putExtra("pickupLat", pickupLocation!!.latitude)
                    intent.putExtra("pickupLng", pickupLocation!!.longitude)
                    intent.putExtra("dropoffLat", dropOffLocation!!.latitude)
                    intent.putExtra("dropoffLng", dropOffLocation!!.longitude)
                    startActivity(intent)
                    finish()
                }
            }
        }
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == LOCATION_PERMISSION_REQUEST_CODE) {
            if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                if (::googleMap.isInitialized) {
                    googleMap.isMyLocationEnabled = true
                }
            } else {
                Toast.makeText(this, "Permission denied to access location", Toast.LENGTH_SHORT).show()
            }
        }
    }

    override fun onResume() {
        super.onResume()
        mapView.onResume()
    }

    override fun onPause() {
        super.onPause()
        mapView.onPause()
    }

    override fun onDestroy() {
        super.onDestroy()
        mapView.onDestroy()
    }

    override fun onLowMemory() {
        super.onLowMemory()
        mapView.onLowMemory()
    }
}