import ProductGrid from "../components/sections/ProductGrid";

const FeaturedPage = () => {
  return (
    <main className="min-h-screen bg-slate-50">
      <ProductGrid featuredOnly title="Featured Products" />
    </main>
  );
};

export default FeaturedPage;
