import { NextRequest, NextResponse } from "next/server";
import {
  fetchGoogleSheetTrips,
  appendTripToGoogleSheet,
  updateTripInGoogleSheet,
  deleteTripFromGoogleSheet,
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
    const tripNo = body.no ? String(body.no).trim() : body.sNo ? String(body.sNo).trim() : "";

    if (!body.patientName && !tripNo) {
      return NextResponse.json(
        { success: false, error: "Patient name or No is required" },
        { status: 400 }
      );
    }

    let distance = body.distance || "";
    if (body.kmPick && body.kmDrop) {
      const drop = parseFloat(body.kmDrop);
      const pick = parseFloat(body.kmPick);
      if (!isNaN(drop) && !isNaN(pick) && drop >= pick) {
        distance = (drop - pick).toString();
      }
    }

    let day = body.day || "";
    if (!day && body.date) {
      const parsedDate = new Date(body.date);
      if (!isNaN(parsedDate.getTime())) {
        day = parsedDate.toLocaleDateString("en-US", { weekday: "long" });
      }
    }

    const tripData: GoogleSheetTrip = {
      no: tripNo,
      sNo: tripNo,
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
      remark: body.remark ? String(body.remark).trim() : body.reason ? String(body.reason).trim() : "",
      reason: body.remark ? String(body.remark).trim() : body.reason ? String(body.reason).trim() : "",
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

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const tripNo = body.no ? String(body.no).trim() : body.sNo ? String(body.sNo).trim() : "";

    if (!tripNo) {
      return NextResponse.json(
        { success: false, error: "Trip No is required to update a trip" },
        { status: 400 }
      );
    }

    let distance = body.distance || "";
    if (body.kmPick && body.kmDrop) {
      const drop = parseFloat(body.kmDrop);
      const pick = parseFloat(body.kmPick);
      if (!isNaN(drop) && !isNaN(pick) && drop >= pick) {
        distance = (drop - pick).toString();
      }
    }

    let day = body.day || "";
    if (!day && body.date) {
      const parsedDate = new Date(body.date);
      if (!isNaN(parsedDate.getTime())) {
        day = parsedDate.toLocaleDateString("en-US", { weekday: "long" });
      }
    }

    const tripData: GoogleSheetTrip = {
      no: tripNo,
      sNo: tripNo,
      date: body.date ? String(body.date).trim() : "",
      day: day || "Monday",
      time: body.time ? String(body.time).trim() : "",
      patientName: body.patientName ? String(body.patientName).trim() : "",
      pickup: body.pickup ? String(body.pickup).trim() : "",
      drop: body.drop ? String(body.drop).trim() : "",
      kmPick: body.kmPick ? String(body.kmPick).trim() : "",
      kmDrop: body.kmDrop ? String(body.kmDrop).trim() : "",
      distance: String(distance),
      petrol: body.petrol ? String(body.petrol).trim() : "",
      received: body.received ? String(body.received).trim() : "",
      remark: body.remark ? String(body.remark).trim() : body.reason ? String(body.reason).trim() : "",
      reason: body.remark ? String(body.remark).trim() : body.reason ? String(body.reason).trim() : "",
      otherExpense: body.otherExpense ? String(body.otherExpense).trim() : "",
    };

    const res = await updateTripInGoogleSheet(tripNo, tripData);
    return NextResponse.json({
      success: true,
      message: res.message,
      data: tripData,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update trip in Google Sheet" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tripNo = searchParams.get("no") || searchParams.get("sNo");

    if (!tripNo) {
      return NextResponse.json(
        { success: false, error: "Trip No is required to delete a trip" },
        { status: 400 }
      );
    }

    const res = await deleteTripFromGoogleSheet(tripNo);
    return NextResponse.json({
      success: true,
      message: res.message,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete trip from Google Sheet" },
      { status: 500 }
    );
  }
}
