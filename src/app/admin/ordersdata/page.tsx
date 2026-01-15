import Loading from '@/components/loading-ui';
import OrderList from '@/feature/orders/components/table/order-list';
import React, { Suspense } from 'react'

function page() {
  return (
    <Suspense fallback={<Loading />}>
      <OrderList />
    </Suspense>
  );
}

export default page