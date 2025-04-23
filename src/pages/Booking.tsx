import { Card } from "@/components/ui/card";
import { SidebarMenuSkeleton } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllOrderQuery } from "@/redux/features/order/orderApi";
import { TGetOrder } from "@/types/orders.types";
import { format } from "date-fns";

const Booking = () => {
  const { data, isLoading } = useGetAllOrderQuery({});
  const orders = data?.data || [];

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">Bookings</h1>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="p-4 flex flex-col gap-2">
              <SidebarMenuSkeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order: TGetOrder) => (
            <Card
              key={order?._id}
              className="flex flex-col md:flex-row md:items-start justify-between p-4 gap-4"
            >
              <div className="flex-1 space-y-2">
                <div>
                  <h2 className="text-lg font-semibold">{order?.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {order?.phone} | {order?.address}
                  </p>
                </div>

                <div className="text-sm">
                  <p className="font-medium">Order Items:</p>
                  <ul className="list-disc list-inside pl-2">
                    {order?.cartItems.map((item, idx) => (
                      <li key={idx}>
                        {item?.title} x {item?.quantity} (${item?.price})
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-sm">
                  Total: <strong>${order?.totalAmount}</strong>
                </p>
                <p className="text-sm">
                  Ordered at: {format(new Date(order?.orderDate), "PPPpp")}
                </p>
              </div>

              <div className="flex flex-col items-start md:items-end gap-2">
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-full border
                    ${
                      order?.status === "pending"
                        ? "text-yellow-600 border-yellow-600 bg-yellow-100"
                        : order?.status === "processing"
                        ? "text-blue-600 border-blue-600 bg-blue-100"
                        : order?.status === "shipped"
                        ? "text-purple-600 border-purple-600 bg-purple-100"
                        : order?.status === "delivered"
                        ? "text-green-600 border-green-600 bg-green-100"
                        : ""
                    }`}
                >
                  Status: {order?.status}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Booking;
