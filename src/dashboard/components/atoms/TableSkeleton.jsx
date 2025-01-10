import { TableBody, TableCell, TableRow } from "@/components/ui/table";

export const TableSkeleton = () => {

    return (
        <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                    <TableCell>
                        <div className='h-4 w-8 animate-pulse rounded bg-gray-200' />
                    </TableCell>
                    <TableCell>
                        <div className='h-4 w-32 animate-pulse rounded bg-gray-200' />
                    </TableCell>
                    <TableCell>
                        <div className='h-4 w-48 animate-pulse rounded bg-gray-200' />
                    </TableCell>
                    <TableCell>
                        <div className='h-4 w-20 animate-pulse rounded bg-gray-200' />
                    </TableCell>
                    <TableCell>
                        <div className='h-4 w-16 animate-pulse rounded bg-gray-200' />
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};