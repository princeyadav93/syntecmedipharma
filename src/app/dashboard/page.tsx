import DataTable from '@/components/DataTable';
import LogOutComp from '@/components/LogOutComp';

export default async function DashboardPage() {
    return (
        <div className="p-6">
            <LogOutComp />
            <DataTable />
        </div>
    );
}
