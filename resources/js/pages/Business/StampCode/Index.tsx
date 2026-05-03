import ModuleHeading from '@/components/module-heading';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

import Pagination from '@/components/pagination';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Paginated<T> {
    data: T[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

interface StampCode {
    id: number;
    code: string;
    customer: {
        username: string;
        email: string;
    } | null;
    used_at: string | null;
    is_expired: boolean;
    created_at: string;
    loyalty_card: {
        name: string;
    };
}

interface Props {
    stampCodes: Paginated<StampCode>;
    filters: {
        search?: string;
    };
}

export default function Index({ stampCodes, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            router.get(
                '/business/stamp-codes',
                { search },
                {
                    preserveState: true,
                    replace: true,
                },
            );
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [search]);

    const handlePageChange = (url: string | null) => {
        if (url) {
            router.get(url, {}, { preserveState: true });
        }
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusBadge = (stampCode: StampCode) => {
        if (stampCode.is_expired) {
            return <Badge className="bg-red-500 text-white">Expired</Badge>;
        }
        if (stampCode.used_at) {
            return <Badge className="bg-green-500 text-white">Used</Badge>;
        }
        return <Badge variant="default">Active</Badge>;
    };

    return (
        <AppLayout>
            <Head title="Stamp Codes" />
            <ModuleHeading
                title="Stamp Codes"
                description="Manage your issued stamp codes."
            />

            <div className="mt-4 sm:mt-6 sm:px-0">
                <div className="relative mb-4">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search stamp codes or customers..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {/* Mobile Card View */}
                <div className="block space-y-4 lg:hidden">
                    {stampCodes.data.length > 0 ? (
                        stampCodes.data.map((stampCode) => (
                            <div
                                key={stampCode.id}
                                className="rounded-lg border bg-white p-4 shadow-sm"
                            >
                                <div className="mb-3 flex items-start justify-between">
                                    <div className="pr-2 font-mono text-xs font-medium break-all">
                                        {stampCode.loyalty_card.name} |{' '}
                                        {stampCode.code}
                                    </div>
                                    {getStatusBadge(stampCode)}
                                </div>

                                <div className="space-y-2 text-sm">
                                    <div>
                                        <span className="font-medium text-gray-500">
                                            Customer:
                                        </span>
                                        {stampCode.customer ? (
                                            <div className="mt-1">
                                                <div className="font-medium">
                                                    {
                                                        stampCode.customer
                                                            .username
                                                    }
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {stampCode.customer.email}
                                                </div>
                                            </div>
                                        ) : (
                                            <span className="ml-2 text-gray-400">
                                                Unassigned
                                            </span>
                                        )}
                                    </div>

                                    <div>
                                        <span className="text-xs font-medium text-gray-500">
                                            Number of Stamps:{' '}
                                        </span>
                                        <span className="text-gray-700">
                                            {stampCode.number_of_stamps}
                                        </span>
                                    </div>

                                    <div>
                                        <span className="text-xs font-medium text-gray-500">
                                            Used At:{' '}
                                        </span>
                                        <span className="text-gray-700">
                                            {formatDate(stampCode.used_at)}
                                        </span>
                                    </div>

                                    <div>
                                        <span className="text-xs font-medium text-gray-500">
                                            Created:{' '}
                                        </span>
                                        <span className="text-gray-700">
                                            {formatDate(stampCode.created_at)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="rounded-lg border bg-white p-8 text-center text-gray-500">
                            No stamp codes found.
                        </div>
                    )}
                </div>

                {/* Desktop Table View */}
                <div className="hidden overflow-x-auto rounded-lg border lg:block">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Loyalty Card</TableHead>
                                <TableHead>Code</TableHead>
                                <TableHead>Number of Stamps</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Used At</TableHead>
                                <TableHead>Created At</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {stampCodes.data.length > 0 ? (
                                stampCodes.data.map((stampCode) => (
                                    <TableRow key={stampCode.id}>
                                        <TableCell>
                                            {stampCode.loyalty_card.name}
                                        </TableCell>
                                        <TableCell className="font-mono font-medium">
                                            {stampCode.code}
                                        </TableCell>
                                        <TableCell>
                                            {stampCode.number_of_stamps}
                                        </TableCell>
                                        <TableCell>
                                            {stampCode.customer ? (
                                                <div>
                                                    <div className="font-medium">
                                                        {
                                                            stampCode.customer
                                                                .username
                                                        }
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {
                                                            stampCode.customer
                                                                .email
                                                        }
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400">
                                                    Unassigned
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {getStatusBadge(stampCode)}
                                        </TableCell>
                                        <TableCell>
                                            {formatDate(stampCode.used_at)}
                                        </TableCell>
                                        <TableCell>
                                            {formatDate(stampCode.created_at)}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="py-8 text-center"
                                    >
                                        No stamp codes found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {stampCodes.last_page > 1 && <Pagination data={stampCodes} />}
            </div>
        </AppLayout>
    );
}
