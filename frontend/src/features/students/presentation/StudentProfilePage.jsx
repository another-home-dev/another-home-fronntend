import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, Building2, DoorOpen, MapPin, Calendar, Users, GraduationCap, BookOpen, IdCard } from "lucide-react";
import { Card, CardHeader, CardBody } from "@shared/components/Card";
import Badge from "@shared/components/Badge";
import Table from "@shared/components/Table";
import Spinner from "@shared/components/Spinner";
import EmptyState from "@shared/components/EmptyState";
import { getStudentByIdUseCase } from "@features/students/application/getStudentByIdUseCase";
import { PAYMENT_STATUS_TONE, PAYMENT_STATUS_LABEL } from "@shared/utils/paymentStatus";

const COMPLAINT_STATUS_TONE = { Pending: "warning", "In Progress": "info", Completed: "success" };

export default function StudentProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStudentByIdUseCase(id).then((data) => {
      setStudent(data);
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner size={32} />
      </div>
    );
  }

  if (!student) {
    return <EmptyState message="Student not found" action={<Link to="/students" className="text-sm font-medium text-primary-700 dark:text-primary-400">Back to students</Link>} />;
  }

  const paymentColumns = [
    { key: "month", header: "Month" },
    { key: "amount", header: "Amount", render: (row) => `Rs. ${row.amount.toLocaleString()}` },
    { key: "status", header: "Status", render: (row) => <Badge tone={PAYMENT_STATUS_TONE[row.status]}>{PAYMENT_STATUS_LABEL[row.status]}</Badge> },
    { key: "paidOn", header: "Paid On", render: (row) => row.paidOn ?? "—" },
  ];

  const complaintColumns = [
    { key: "title", header: "Issue" },
    { key: "category", header: "Category" },
    { key: "status", header: "Status", render: (row) => <Badge tone={COMPLAINT_STATUS_TONE[row.status]}>{row.status}</Badge> },
    { key: "date", header: "Date" },
  ];

  return (
    <div>
      <button
        type="button"
        onClick={() => navigate("/students")}
        className="mb-4 flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-primary-800 dark:text-slate-400 dark:hover:text-primary-400"
      >
        <ArrowLeft size={16} />
        Back to students
      </button>

      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-[var(--shadow-card)] sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-800 text-xl font-bold text-white">
            {student.initials}
          </span>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">{student.name}</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">{student.studentCode}</p>
          </div>
        </div>
        <Badge tone={PAYMENT_STATUS_TONE[student.paymentStatus]}>{PAYMENT_STATUS_LABEL[student.paymentStatus]}</Badge>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Personal Information" />
          <CardBody className="space-y-3">
            <InfoRow icon={Mail} label="Email" value={student.email} />
            <InfoRow icon={Phone} label="Contact" value={student.contact} />
            <InfoRow icon={Users} label="Guardian" value={`${student.guardianName} · ${student.guardianContact}`} />
            <InfoRow icon={Calendar} label="Joined" value={student.joinedDate} />
            <InfoRow icon={IdCard} label="NIC" value={student.nic ?? "Not set"} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Academic & Accommodation Details" />
          <CardBody className="space-y-3">
            <InfoRow icon={GraduationCap} label="Faculty" value={student.faculty ?? "Not set"} />
            <InfoRow icon={BookOpen} label="Degree Program" value={student.degreeProgram ?? "Not set"} />
            <InfoRow icon={Calendar} label="Academic Year" value={student.academicYear ?? "Not set"} />
            {student.roomNumber ? (
              <>
                <InfoRow icon={Building2} label="Building" value={student.buildingName} />
                <InfoRow icon={DoorOpen} label="Room Number" value={student.roomNumber} />
              </>
            ) : (
              <EmptyState icon={DoorOpen} message="Not yet assigned to a room" />
            )}
            <InfoRow icon={MapPin} label="Home Address" value={student.address} />
          </CardBody>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader title="Payment History" />
        <Table columns={paymentColumns} data={student.payments} keyField="id" />
      </Card>

      <Card className="mt-6">
        <CardHeader title="Complaints History" />
        <Table columns={complaintColumns} data={student.complaints} keyField="id" emptyMessage="No complaints filed" />
      </Card>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
        <Icon size={15} />
      </span>
      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{value}</p>
      </div>
    </div>
  );
}
