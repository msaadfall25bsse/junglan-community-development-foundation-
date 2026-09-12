"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { FormField } from "@/components/ui/FormField";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Phone,
  MapPin,
  Heart,
  Truck,
  AlertTriangle,
  Edit2,
  Archive,
  RefreshCw,
  User,
  ShieldAlert,
} from "lucide-react";

interface PatientDetail {
  id: string;
  patientIdentifier: string;
  fullName: string;
  cnicOrBForm?: string | null;
  gender: "MALE" | "FEMALE" | "CHILD" | "OTHER";
  age: number;
  contactNumber: string;
  emergencyContactName?: string | null;
  emergencyContactPhone?: string | null;
  residenceArea: string;
  medicalConditionSummary: string;
  yearPeriodId: string;
  isFlaggedForReview: boolean;
  flagReason?: string | null;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  trips?: Array<{
    id: string;
    tripIdentifier: string;
    date: string;
    ambulanceId: string;
    pickupLocation: string;
    dropoffHospital: string;
    tripType: string;
    distanceKm: number;
    status: string;
    urgencyLevel: string;
    driverName: string;
  }>;
}

export default function PatientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  const [patient, setPatient] = useState<PatientDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    cnicOrBForm: "",
    gender: "MALE" as "MALE" | "FEMALE" | "CHILD" | "OTHER",
    age: 30,
    contactNumber: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    residenceArea: "",
    medicalConditionSummary: "",
    isUnderReview: false,
    reviewNotes: "",
  });

  const fetchPatient = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/patients/${id}`);
      const json = await res.json();
      if (json.success && json.data) {
        setPatient(json.data);
        setFormData({
          fullName: json.data.fullName,
          cnicOrBForm: json.data.cnicOrBForm || "",
          gender: json.data.gender,
          age: json.data.age,
          contactNumber: json.data.contactNumber,
          emergencyContactName: json.data.emergencyContactName || "",
          emergencyContactPhone: json.data.emergencyContactPhone || "",
          residenceArea: json.data.residenceArea,
          medicalConditionSummary: json.data.medicalConditionSummary,
          isUnderReview: json.data.isFlaggedForReview || false,
          reviewNotes: json.data.flagReason || "",
        });
      }
    } catch (err) {
      console.error("Failed to fetch patient details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatient();
  }, [id]);

  const handleUpdate = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/patients/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        setEditModalOpen(false);
        fetchPatient();
      } else {
        alert(json.error || "Failed to update record.");
      }
    } catch {
      alert("An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };

  const handleArchive = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/patients/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setArchiveModalOpen(false);
        router.push("/admin/patients");
      } else {
        alert(json.error || "Failed to archive record.");
      }
    } catch {
      alert("An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout role="ADMIN">
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
          <RefreshCw className="w-8 h-8 animate-spin text-emerald-600" />
          <p className="text-sm text-slate-500 font-medium">Loading patient record...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!patient) {
    return (
      <DashboardLayout role="ADMIN">
        <div className="max-w-4xl mx-auto py-12 px-4 text-center">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Patient Record Not Found</h2>
          <p className="text-sm text-slate-500 mt-1 mb-6">
            The requested patient identifier does not exist or may have been removed.
          </p>
          <Button variant="outline" onClick={() => router.push("/admin/patients")}>
            Back to Registry
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="ADMIN">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin/patients"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Patient Registry
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditModalOpen(true)}
              className="flex items-center gap-1.5"
            >
              <Edit2 className="w-4 h-4 text-slate-600" />
              Edit Profile
            </Button>
            {!patient.isArchived && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setArchiveModalOpen(true)}
                className="flex items-center gap-1.5 text-amber-700 border-amber-300 hover:bg-amber-50"
              >
                <Archive className="w-4 h-4" />
                Archive
              </Button>
            )}
          </div>
        </div>

        {/* Patient Profile Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 ring-1 ring-emerald-100">
                <User className="w-8 h-8" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                    {patient.fullName}
                  </h1>
                  <Badge variant="success" className="font-mono text-xs">
                    {patient.patientIdentifier}
                  </Badge>
                  {patient.isArchived ? (
                    <Badge variant="neutral">Archived</Badge>
                  ) : patient.isFlaggedForReview ? (
                    <Badge variant="warning">Under Review</Badge>
                  ) : (
                    <Badge variant="success">Active Patient</Badge>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2">
                  <span className="capitalize">{patient.gender.toLowerCase()}</span>
                  <span>•</span>
                  <span>{patient.age} years old</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {patient.residenceArea}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end text-xs text-slate-400 gap-1">
              <span>Operational Year: {patient.yearPeriodId}</span>
              <span>Registered: {new Date(patient.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            {/* Contact & Identification */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Contact & Identification
              </h3>
              <div className="bg-slate-50 rounded-xl p-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Contact Number:</span>
                  <span className="font-mono font-medium text-slate-900 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    {patient.contactNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">CNIC / B-Form:</span>
                  <span className="font-mono font-medium text-slate-900">
                    {patient.cnicOrBForm || "Not provided"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Emergency Contact:</span>
                  <span className="font-medium text-slate-900">
                    {patient.emergencyContactName || "None listed"}
                  </span>
                </div>
                {patient.emergencyContactPhone && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Emergency Phone:</span>
                    <span className="font-mono font-medium text-slate-900">
                      {patient.emergencyContactPhone}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Medical Assessment */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Medical Condition Summary
              </h3>
              <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100 text-sm">
                <div className="flex items-start gap-2 text-emerald-800">
                  <Heart className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{patient.medicalConditionSummary}</p>
                </div>
                {patient.isFlaggedForReview && (
                  <div className="mt-3 pt-3 border-t border-emerald-100 text-xs text-amber-800 flex items-center gap-1.5 font-medium">
                    <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                    Review Note: {patient.flagReason || "Flagged for administrative review."}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Associated Ambulance Trips History */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-900">
                Emergency Ambulance Transit History
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {patient.trips?.length || 0} trip(s) recorded
            </span>
          </div>

          {!patient.trips || patient.trips.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm bg-slate-50 rounded-xl border border-dashed border-slate-200">
              No emergency ambulance trips currently linked to this patient.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {patient.trips.map((trip) => (
                <div
                  key={trip.id}
                  className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-emerald-700">
                      {trip.tripIdentifier}
                    </span>
                    <span className="text-slate-600">
                      {trip.pickupLocation} ➔ {trip.dropoffHospital}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>{new Date(trip.date).toLocaleDateString()}</span>
                    <span>{trip.distanceKm} km</span>
                    <Badge
                      variant={
                        trip.urgencyLevel === "CRITICAL"
                          ? "danger"
                          : trip.urgencyLevel === "URGENT"
                          ? "warning"
                          : "success"
                      }
                    >
                      {trip.urgencyLevel}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Edit Modal */}
        <Modal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          title={`Edit Patient (${patient.patientIdentifier})`}
          size="lg"
          footer={
            <>
              <Button variant="outline" onClick={() => setEditModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleUpdate}
                disabled={saving}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {saving ? "Updating..." : "Save Changes"}
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Full Name" htmlFor="modal-name">
                <input
                  id="modal-name"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </FormField>
              <FormField label="Contact Phone" htmlFor="modal-phone">
                <input
                  id="modal-phone"
                  type="text"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </FormField>
              <FormField label="Age" htmlFor="modal-age">
                <input
                  id="modal-age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </FormField>
              <FormField label="Residence Area" htmlFor="modal-area">
                <input
                  id="modal-area"
                  type="text"
                  value={formData.residenceArea}
                  onChange={(e) => setFormData({ ...formData, residenceArea: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </FormField>
            </div>
            <FormField label="Medical Condition" htmlFor="modal-condition">
              <textarea
                id="modal-condition"
                rows={3}
                value={formData.medicalConditionSummary}
                onChange={(e) => setFormData({ ...formData, medicalConditionSummary: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </FormField>
          </div>
        </Modal>

        {/* Archive Modal */}
        <Modal
          isOpen={archiveModalOpen}
          onClose={() => setArchiveModalOpen(false)}
          title="Archive Patient Record"
          size="sm"
          footer={
            <>
              <Button variant="outline" onClick={() => setArchiveModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleArchive}
                disabled={saving}
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                {saving ? "Archiving..." : "Confirm Archive"}
              </Button>
            </>
          }
        >
          <p className="text-sm text-slate-600">
            Are you sure you want to archive <strong>{patient.fullName}</strong> ({patient.patientIdentifier})? The record and all associated emergency trips will be preserved in historical archives.
          </p>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
