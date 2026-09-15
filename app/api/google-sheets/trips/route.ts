import { NextRequest, NextResponse } from "next/server";
import {
  fetchGoogleSheetTrips,
  appendTripToGoogleSheet,
  searchGoogleSheetRecords,
  GoogleSheetTrip,
} from "@/lib/google-sheets";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (query && query.trim()) {
      const matches = await searchGoogleSheetRecords(query.trim());
      return NextResponse.json({ success: true, data: matches, count: matches.length });
    }

    const trips = await fetchGoogleSheetTrips();
    return NextResponse.json({ success: true, data: trips, count: trips.length });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to load Google Sheet trips" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.patientName && !body.sNo) {
      return NextResponse.json(
        { success: false, error: "Patient name or S.No is required" },
        { status: 400 }
      );
    }

    // Auto calculate distance if start and end KM provided
    let distance = body.distance || "";
    if (body.kmPick && body.kmDrop) {
      const drop = parseFloat(body.kmDrop);
      const pick = parseFloat(body.kmPick);
      if (!isNaN(drop) && !isNaN(pick) && drop >= pick) {
        distance = (drop - pick).toString();
      }
    }

    // Auto determine day of week from date if not given
    let day = body.day || "";
    if (!day && body.date) {
      const parsedDate = new Date(body.date);
      if (!isNaN(parsedDate.getTime())) {
        day = parsedDate.toLocaleDateString("en-US", { weekday: "long" });
      }
    }

    const tripData: GoogleSheetTrip = {
      sNo: body.sNo ? String(body.sNo).trim() : "",
      date: body.date ? String(body.date).trim() : new Date().toLocaleDateString("en-US"),
      day: day || "Monday",
      time: body.time ? String(body.time).trim() : "10:00 AM",
      patientName: body.patientName ? String(body.patientName).trim() : "",
      pickup: body.pickup ? String(body.pickup).trim() : "",
      drop: body.drop ? String(body.drop).trim() : "",
      kmPick: body.kmPick ? String(body.kmPick).trim() : "",
      kmDrop: body.kmDrop ? String(body.kmDrop).trim() : "",
      distance: String(distance),
      petrol: body.petrol ? String(body.petrol).trim() : "",
      received: body.received ? String(body.received).trim() : "",
      reason: body.reason ? String(body.reason).trim() : "",
      otherExpense: body.otherExpense ? String(body.otherExpense).trim() : "",
    };

    const res = await appendTripToGoogleSheet(tripData);
    return NextResponse.json({
      success: true,
      message: res.message,
      data: tripData,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to record trip in Google Sheet" },
      { status: 500 }
    );
  }
}
