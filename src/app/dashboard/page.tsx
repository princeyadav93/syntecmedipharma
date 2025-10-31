import DataTable from '@/components/DataTable';
import LogOutComp from '@/components/LogOutComp';

export default async function DashboardPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <LogOutComp />
            <DataTable />
        </div>
    );
}
