import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetAllOrderQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/features/order/orderApi";
import { TGetOrder } from "@/types/orders.types";
import { format } from "date-fns";
import { Loader, SearchX } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const OrderList = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 10;
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const { data, isLoading } = useGetAllOrderQuery({ page, limit, search });
  const orders = data?.data || [];
  const totalPages = data?.meta?.totalPages || 1;

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setLoading(true);
    try {
      const res = await updateOrderStatus({ orderId, newStatus }).unwrap();
      if (res.success) {
        toast.error(res?.message || "Changed.");
        setLoading(false);
      }
      setLoading(false);
    } catch {
      toast.error("something went wrong!");
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-6 w-full overflow-hidden">
      <h2 className="text-2xl font-semibold">All Orders</h2>

      <div className="flex items-center justify-between flex-wrap gap-4">
        <Input
          placeholder="Search by name, email, phone..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full sm:w-64"
        />
        <div className="text-sm">
          Page {page} of {totalPages}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader className="animate-spin" />
        </div>
      ) : orders.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order: TGetOrder) => (
                <TableRow
                  key={order._id}
                  className={` ${
                    order.status === "pending"
                      ? "bg-red-100"
                      : order.status === "processing"
                      ? "bg-blue-100"
                      : order.status === "shipped"
                      ? "bg-purple-100"
                      : order.status === "delivered"
                      ? "bg-green-100"
                      : "bg-yellow-100"
                  }`}
                >
                  <TableCell>{order.name}</TableCell>
                  <TableCell>{order.email}</TableCell>
                  <TableCell>{order.phone}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {order.address}
                  </TableCell>
                  <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    {format(new Date(order.orderDate), "PPPpp")}
                  </TableCell>
                  <TableCell>
                    <select
                      disabled={loading}
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className={`border rounded px-2 py-1 text-sm capitalize
                        ${
                          order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "processing"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "shipped"
                            ? "bg-purple-100 text-purple-800"
                            : order.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center min-h-[300px] py-10">
          <SearchX className="w-16 h-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700">
            No Orders Found
          </h2>
          <p className="text-gray-500 mt-2 max-w-md">
            Sorry, we couldn't find any orders that match your search.
          </p>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span className="text-sm font-medium px-2 pt-1">Page {page}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default OrderList;
