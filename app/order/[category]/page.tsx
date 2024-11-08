export default async function OrderPage(
  props: {
    params: Promise<{ category: string }>;
  }
) {
  const params = await props.params;
  console.log(params.category);
  return <div>OrderPage</div>;
}
