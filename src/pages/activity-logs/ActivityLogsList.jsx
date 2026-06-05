import { useQuery } from '@tanstack/react-query';
import { getActivityLogs } from '../../api/endpoints/activityLogs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { format } from 'date-fns';

const ActivityLogsList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['activity-logs'],
    queryFn: getActivityLogs,
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Activity Logs</h1>
          <p className="text-muted-foreground mt-1 text-sm">System-wide audit trail of actions performed.</p>
        </div>
      </div>

      <div className="bg-card border border-border/60 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-muted-foreground animate-pulse">Loading activity logs...</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Resource</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data?.map((log) => (
                  <TableRow key={log.id} className="group">
                    <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                      {format(new Date(log.when), 'MMM d, yyyy HH:mm:ss')}
                    </TableCell>
                    <TableCell className="font-semibold text-foreground whitespace-nowrap">
                      {log.done_by}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-muted/50 capitalize">
                        {log.description}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                      {log.subject_type} {log.subject_id ? `#${log.subject_id}` : ''}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs font-mono max-w-xs truncate" title={JSON.stringify(log.changes)}>
                      {log.changes ? JSON.stringify(log.changes).substring(0, 50) + (JSON.stringify(log.changes).length > 50 ? '...' : '') : '-'}
                    </TableCell>
                  </TableRow>
                ))}
                {(!data?.data || data.data.length === 0) && (
                  <TableRow>
                    <TableCell colSpan="5" className="text-center py-8 text-muted-foreground">
                      No activity logs found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityLogsList;
