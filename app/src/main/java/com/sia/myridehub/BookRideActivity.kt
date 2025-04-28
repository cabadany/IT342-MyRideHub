package com.sia.myridehub

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.MapView
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions

class BookRideActivity : AppCompatActivity(), OnMapReadyCallback {

    private lateinit var mapView: MapView
    private lateinit var googleMap: GoogleMap
    private lateinit var confirmButton: Button

    private var pickupLocation: LatLng? = null
    private var dropOffLocation: LatLng? = null

    private val LOCATION_PERMISSION_REQUEST_CODE = 1

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_book_ride)

        mapView = findViewById(R.id.mapView)
        confirmButton = findViewById(R.id.confirmButton)

        mapView.onCreate(savedInstanceState)
        mapView.getMapAsync(this)

        confirmButton.setOnClickListener {
            if (pickupLocation != null && dropOffLocation != null) {
                // Proceed to Step 2: Select Vehicle Type
                val intent = Intent(this, SelectVehicleTypeActivity::class.java)
                intent.putExtra("pickup_lat", pickupLocation!!.latitude)
                intent.putExtra("pickup_lng", pickupLocation!!.longitude)
                intent.putExtra("dropoff_lat", dropOffLocation!!.latitude)
                intent.putExtra("dropoff_lng", dropOffLocation!!.longitude)
                startActivity(intent)
            } else {
                Toast.makeText(this, "Please select both pickup and drop-off locations!", Toast.LENGTH_SHORT).show()
            }
        }
    }

    override fun onMapReady(map: GoogleMap) {
        googleMap = map

        if (ActivityCompat.checkSelfPermission(
                this,
                Manifest.permission.ACCESS_FINE_LOCATION
            ) == PackageManager.PERMISSION_GRANTED
        ) {
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

        var isPickupSelected = false

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
                Toast.makeText(this, "Drop-off set!", Toast.LENGTH_SHORT).show()
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

    override fun onRequestPermissionsResult(
        requestCode: Int, permissions: Array<out String>, grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == LOCATION_PERMISSION_REQUEST_CODE) {
            if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                googleMap.isMyLocationEnabled = true
            } else {
                Toast.makeText(this, "Permission denied to access location", Toast.LENGTH_SHORT).show()
            }
        }
    }
}