"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { FormField } from "@/components/ui/FormField";
import {
  Plus,
  Edit2,
  Archive,
  Search,
  RefreshCw,
  Eye,
  AlertTriangle,
  UserCheck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Filter,
} from "lucide-react";

interface PatientItem {
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
}

export default function AdminPatientsPage() {
  const [patients, setPatients] = useState<PatientItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ACTIVE");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Modals state
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [archiveModalOpen, setArchiveModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<PatientItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [duplicateWarning, setDuplicateWarning] = useState<any[] | null>(null);

  // Form data
  const [formData, setFormData] = useState({
    fullName: "",
    cnicOrBForm: "",
    gender: "MALE" as "MALE" | "FEMALE" | "CHILD" | "OTHER",
    age: 30,
    contactNumber: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    residenceArea: "Junglan Valley",
    medicalConditionSummary: "",
    yearPeriodId: "2026",
  });

  const fetchPatients = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.set("search", search.trim());
      if (genderFilter !== "ALL") params.set("gender", genderFilter);
      if (statusFilter === "ACTIVE") params.set("isArchived", "false");
      if (statusFilter === "ARCHIVED") params.set("isArchived", "true");
      if (statusFilter === "REVIEW") params.set("isFlaggedForReview", "true");
      params.set("page", String(page));
      params.set("limit", "15");

      const res = await fetch(`/api/patients?${params.toString()}`);
      const json = await res.json();

      if (json.success && Array.isArray(json.data)) {
        setPatients(json.data);
        setTotalCount(json.pagination?.total || json.data.length);
      }
    } catch (err) {
      console.error("Failed to fetch patients:", err);
    } finally {
      setLoading(false);
    }
  }, [search, genderFilter, statusFilter, page]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  // Check duplicates in real-time when CNIC or phone changes
  const checkDuplicate = async (cnic: string, phone: string, name: string) => {
    if ((!cnic || cnic.length < 5) && (!phone || phone.length < 7) && (!name || name.length < 4)) {
      setDuplicateWarning(null);
      return;
    }

    try {
      const res = await fetch("/api/patients/check-duplicate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cnicOrBForm: cnic.trim() || undefined,
          contactNumber: phone.trim() || undefined,
          fullName: name.trim() || undefined,
        }),
      });
      const json = await res.json();
      if (json.success && json.data?.hasDuplicate && json.data.matches?.length > 0) {
        setDuplicateWarning(json.data.matches);
      } else {
        setDuplicateWarning(null);
      }
    } catch {
      // Ignore duplicate check error
    }
  };

  const handleOpenCreate = () => {
    setSelectedPatient(null);
    setDuplicateWarning(null);
    setFormData({
      fullName: "",
      cnicOrBForm: "",
      gender: "MALE",
      age: 30,
      contactNumber: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      residenceArea: "Junglan Valley",
      medicalConditionSummary: "",
      yearPeriodId: "2026",
    });
    setCreateModalOpen(true);
  };

  const handleOpenEdit = (patient: PatientItem) => {
    setSelectedPatient(patient);
    setDuplicateWarning(null);
    setFormData({
      fullName: patient.fullName,
      cnicOrBForm: patient.cnicOrBForm || "",
      gender: patient.gender,
      age: patient.age,
      contactNumber: patient.contactNumber,
      emergencyContactName: patient.emergencyContactName || "",
      emergencyContactPhone: patient.emergencyContactPhone || "",
      residenceArea: patient.residenceArea,
      medicalConditionSummary: patient.medicalConditionSummary,
      yearPeriodId: patient.yearPeriodId,
    });
    setEditModalOpen(true);
  };

  const handleOpenArchive = (patient: PatientItem) => {
    setSelectedPatient(patient);
    setArchiveModalOpen(true);
  };

  const handleSavePatient = async (isEdit: boolean) => {
    if (!formData.fullName.trim()) {
      alert("Please enter the patient's full name.");
      return;
    }
    if (!formData.contactNumber.trim()) {
      alert("Please provide a contact phone number.");
      return;
    }
    if (!formData.medicalConditionSummary.trim()) {
      alert("Please provide a summary of the medical condition.");
      return;
    }

    setSaving(true);
    setFeedback(null);

    try {
      const url = isEdit && selectedPatient ? `/api/patients/${selectedPatient.id}` : "/api/patients";
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (json.success) {
        setFeedback(isEdit ? "Patient record updated successfully!" : "New patient registered successfully!");
        setCreateModalOpen(false);
        setEditModalOpen(false);
        fetchPatients();
        setTimeout(() => setFeedback(null), 4000);
      } else {
        alert(json.error || "Failed to save patient record.");
      }
    } catch (err: any) {
      alert(err.message || "An unexpected error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  const handleArchivePatient = async () => {
    if (!selectedPatient) return;
    setSaving(true);

    try {
      const res = await fetch(`/api/patients/${selectedPatient.id}`, {
        method: "DELETE",
      });
      const json = await res.json();

      if (json.success) {
        setFeedback(`Patient ${selectedPatient.patientIdentifier} archived successfully.`);
        setArchiveModalOpen(false);
        fetchPatients();
        setTimeout(() => setFeedback(null), 4000);
      } else {
        alert(json.error || "Failed to archive patient.");
      }
    } catch (err: any) {
      alert(err.message || "Error archiving patient.");
    } finally {
      setSaving(false);
    }
  };

  // Metrics calculation
  const totalActive = patients.filter((p) => !p.isArchived).length;
  const totalUnderReview = patients.filter((p) => p.isFlaggedForReview).length;
  const totalArchived = patients.filter((p) => p.isArchived).length;

  return (
    <DashboardLayout role="ADMIN">
      <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Patient Master Registry
              </h1>
              <Badge variant="success">Operational Year 2026</Badge>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Authoritative healthcare intake records, stable unique IDs, and emergency transit tracking.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchPatients}
              disabled={loading}
              className="flex items-center gap-1.5"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleOpenCreate}
              className="flex items-center gap-1.5 shadow-sm bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="w-4 h-4" />
              Register Patient
            </Button>
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3 shadow-xs animate-in fade-in">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-medium">{feedback}</span>
          </div>
        )}

        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Active</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">{totalActive}</div>
            <span className="text-xs text-emerald-600 font-medium mt-1 inline-block">Registered in valley</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Under Review</span>
            <div className="text-2xl font-extrabold text-amber-600 mt-1">{totalUnderReview}</div>
            <span className="text-xs text-amber-600 font-medium mt-1 inline-block">Duplicate / Flagged cases</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Archived</span>
            <div className="text-2xl font-extrabold text-slate-600 mt-1">{totalArchived}</div>
            <span className="text-xs text-slate-400 font-medium mt-1 inline-block">Preserved historical</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Records</span>
            <div className="text-2xl font-extrabold text-emerald-700 mt-1">{totalCount}</div>
            <span className="text-xs text-slate-500 font-medium mt-1 inline-block">All fiscal periods</span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Patient Name, ID, CNIC, or Contact Number..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Filter className="w-3.5 h-3.5" />
              Filter:
            </div>

            <select
              value={genderFilter}
              onChange={(e) => {
                setGenderFilter(e.target.value);
                setPage(1);
              }}
              className="text-xs border border-slate-200 rounded-lg px-2.5 py-2 bg-white text-slate-700 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="ALL">All Genders</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="CHILD">Child</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="text-xs border border-slate-200 rounded-lg px-2.5 py-2 bg-white text-slate-700 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="ACTIVE">Active Records</option>
              <option value="REVIEW">Under Review</option>
              <option value="ARCHIVED">Archived Records</option>
              <option value="ALL">All Statuses</option>
            </select>
          </div>
        </div>

        {/* Patient Table */}
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient ID</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Age / Gender</TableHead>
                <TableHead>Contact & CNIC</TableHead>
                <TableHead>Residence Area</TableHead>
                <TableHead>Medical Condition</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12 text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <RefreshCw className="w-6 h-6 animate-spin text-emerald-600" />
                      <span>Loading patient registry...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : patients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12 text-slate-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <UserCheck className="w-8 h-8 text-slate-300" />
                      <span className="font-medium text-slate-700">No patient records found</span>
                      <p className="text-xs text-slate-400 max-w-sm">
                        {search ? "No matching records found for your search query." : "No patients have been registered yet for this filter criteria."}
                      </p>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={handleOpenCreate}
                        className="mt-2 text-xs bg-emerald-600 hover:bg-emerald-700"
                      >
                        Register Patient
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                patients.map((patient) => (
                  <TableRow key={patient.id} className="hover:bg-slate-50/70 transition-colors">
                    <TableCell className="font-mono text-xs font-bold text-emerald-700">
                      <Link
                        href={`/admin/patients/${patient.id}`}
                        className="hover:underline flex items-center gap-1 text-emerald-700"
                      >
                        {patient.patientIdentifier}
                      </Link>
                    </TableCell>
                    <TableCell className="font-semibold text-slate-900">
                      {patient.fullName}
                    </TableCell>
                    <TableCell className="text-xs text-slate-600">
                      <span className="capitalize">{patient.gender.toLowerCase()}</span>, {patient.age} yrs
                    </TableCell>
                    <TableCell className="text-xs text-slate-600">
                      <div className="flex items-center gap-1 font-mono">
                        <Phone className="w-3 h-3 text-slate-400" />
                        {patient.contactNumber}
                      </div>
                      {patient.cnicOrBForm && (
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                          CNIC: {patient.cnicOrBForm}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-xs text-slate-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate max-w-[140px]">{patient.residenceArea}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-slate-600">
                      <p className="truncate max-w-[180px]" title={patient.medicalConditionSummary}>
                        {patient.medicalConditionSummary}
                      </p>
                    </TableCell>
                    <TableCell>
                      {patient.isArchived ? (
                        <Badge variant="neutral">Archived</Badge>
                      ) : patient.isFlaggedForReview ? (
                        <Badge variant="warning">Under Review</Badge>
                      ) : (
                        <Badge variant="success">Active</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/admin/patients/${patient.id}`}
                          className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="View Profile & Trips"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleOpenEdit(patient)}
                          className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit Patient"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {!patient.isArchived && (
                          <button
                            onClick={() => handleOpenArchive(patient)}
                            className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                            title="Safe Archive"
                          >
                            <Archive className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Modal: Create Patient */}
        <Modal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          title="Register New Patient"
          description="Create an authoritative health record with permanent identifier and duplicate checking."
          size="lg"
          footer={
            <>
              <Button variant="outline" onClick={() => setCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => handleSavePatient(false)}
                disabled={saving}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {saving ? "Registering..." : "Register Patient"}
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            {/* Duplicate Detection Alert */}
            {duplicateWarning && duplicateWarning.length > 0 && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                <div className="flex items-center gap-2 font-bold text-amber-800 mb-1">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  Potential Duplicate Records Detected!
                </div>
                <p className="text-amber-700 mb-2">
                  Matching patient record(s) already exist in the registry with similar CNIC, phone, or name:
                </p>
                <div className="space-y-1 bg-white/70 p-2 rounded-lg border border-amber-100 font-mono text-[11px]">
                  {duplicateWarning.map((d: any) => (
                    <div key={d.id} className="flex justify-between items-center py-0.5">
                      <span>{d.patientIdentifier} — {d.fullName} ({d.contactNumber})</span>
                      <Link href={`/admin/patients/${d.id}`} className="text-emerald-700 underline font-sans ml-2">
                        View Existing
                      </Link>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-amber-600 italic">
                  Note: If this is a genuine new intake, you can still proceed to register.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Full Name *" htmlFor="fullName">
                <input
                  id="fullName"
                  type="text"
                  placeholder="e.g. Mohammad Bilal Khan"
                  value={formData.fullName}
                  onChange={(e) => {
                    const name = e.target.value;
                    setFormData({ ...formData, fullName: name });
                    checkDuplicate(formData.cnicOrBForm, formData.contactNumber, name);
                  }}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </FormField>

              <FormField label="CNIC / B-Form" htmlFor="cnicOrBForm">
                <input
                  id="cnicOrBForm"
                  type="text"
                  placeholder="e.g. 13101-1234567-1"
                  value={formData.cnicOrBForm}
                  onChange={(e) => {
                    const cnic = e.target.value;
                    setFormData({ ...formData, cnicOrBForm: cnic });
                    checkDuplicate(cnic, formData.contactNumber, formData.fullName);
                  }}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </FormField>

              <FormField label="Age *" htmlFor="age">
                <input
                  id="age"
                  type="number"
                  min="0"
                  max="120"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </FormField>

              <FormField label="Gender *" htmlFor="gender">
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="CHILD">Child</option>
                  <option value="OTHER">Other</option>
                </select>
              </FormField>

              <FormField label="Primary Contact Phone *" htmlFor="contactNumber">
                <input
                  id="contactNumber"
                  type="text"
                  placeholder="e.g. 0300-1234567"
                  value={formData.contactNumber}
                  onChange={(e) => {
                    const phone = e.target.value;
                    setFormData({ ...formData, contactNumber: phone });
                    checkDuplicate(formData.cnicOrBForm, phone, formData.fullName);
                  }}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </FormField>

              <FormField label="Residence Area / Village *" htmlFor="residenceArea">
                <input
                  id="residenceArea"
                  type="text"
                  placeholder="e.g. Birote, Oghi, Junglan Valley"
                  value={formData.residenceArea}
                  onChange={(e) => setFormData({ ...formData, residenceArea: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </FormField>

              <FormField label="Emergency Contact Name" htmlFor="emergencyContactName">
                <input
                  id="emergencyContactName"
                  type="text"
                  placeholder="e.g. Tariq Khan (Brother)"
                  value={formData.emergencyContactName}
                  onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </FormField>

              <FormField label="Emergency Contact Phone" htmlFor="emergencyContactPhone">
                <input
                  id="emergencyContactPhone"
                  type="text"
                  placeholder="e.g. 0312-9876543"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => setFormData({ ...formData, emergencyContactPhone: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </FormField>
            </div>

            <FormField label="Medical Condition Summary *" htmlFor="medicalConditionSummary">
              <textarea
                id="medicalConditionSummary"
                rows={3}
                placeholder="Detail the emergency or recurring medical diagnosis, trauma history, or clinical observation..."
                value={formData.medicalConditionSummary}
                onChange={(e) => setFormData({ ...formData, medicalConditionSummary: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </FormField>
          </div>
        </Modal>

        {/* Modal: Edit Patient */}
        <Modal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          title={`Edit Patient (${selectedPatient?.patientIdentifier})`}
          description="Update patient profile. Stable Patient Identifier is preserved."
          size="lg"
          footer={
            <>
              <Button variant="outline" onClick={() => setEditModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => handleSavePatient(true)}
                disabled={saving}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {saving ? "Saving..." : "Update Patient"}
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Full Name *" htmlFor="edit-fullName">
                <input
                  id="edit-fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </FormField>

              <FormField label="CNIC / B-Form" htmlFor="edit-cnicOrBForm">
                <input
                  id="edit-cnicOrBForm"
                  type="text"
                  value={formData.cnicOrBForm}
                  onChange={(e) => setFormData({ ...formData, cnicOrBForm: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </FormField>

              <FormField label="Age *" htmlFor="edit-age">
                <input
                  id="edit-age"
                  type="number"
                  min="0"
                  max="120"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </FormField>

              <FormField label="Gender *" htmlFor="edit-gender">
                <select
                  id="edit-gender"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="CHILD">Child</option>
                  <option value="OTHER">Other</option>
                </select>
              </FormField>

              <FormField label="Contact Phone *" htmlFor="edit-contactNumber">
                <input
                  id="edit-contactNumber"
                  type="text"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </FormField>

              <FormField label="Residence Area *" htmlFor="edit-residenceArea">
                <input
                  id="edit-residenceArea"
                  type="text"
                  value={formData.residenceArea}
                  onChange={(e) => setFormData({ ...formData, residenceArea: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </FormField>

              <FormField label="Emergency Contact Name" htmlFor="edit-emergencyContactName">
                <input
                  id="edit-emergencyContactName"
                  type="text"
                  value={formData.emergencyContactName}
                  onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </FormField>

              <FormField label="Emergency Contact Phone" htmlFor="edit-emergencyContactPhone">
                <input
                  id="edit-emergencyContactPhone"
                  type="text"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => setFormData({ ...formData, emergencyContactPhone: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </FormField>
            </div>

            <FormField label="Medical Condition Summary *" htmlFor="edit-medicalConditionSummary">
              <textarea
                id="edit-medicalConditionSummary"
                rows={3}
                value={formData.medicalConditionSummary}
                onChange={(e) => setFormData({ ...formData, medicalConditionSummary: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </FormField>
          </div>
        </Modal>

        {/* Modal: Safe Archive Confirmation */}
        <Modal
          isOpen={archiveModalOpen}
          onClose={() => setArchiveModalOpen(false)}
          title="Safe Archive Patient Record"
          description="Are you sure you want to archive this patient record?"
          size="sm"
          footer={
            <>
              <Button variant="outline" onClick={() => setArchiveModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleArchivePatient}
                disabled={saving}
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                {saving ? "Archiving..." : "Archive Record"}
              </Button>
            </>
          }
        >
          <div className="space-y-3 text-sm text-slate-600">
            <p>
              Archiving <strong className="text-slate-900">{selectedPatient?.fullName}</strong> ({selectedPatient?.patientIdentifier}) will remove them from normal operational active lists.
            </p>
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-800 text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Data Safety Rule:</strong> Historical trip records and medical audit logs linked to this patient will remain permanently preserved. No records are deleted.
              </span>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
