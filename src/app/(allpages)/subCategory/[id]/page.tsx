// app/subCategory/[id]/page.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import getSubCategories from "@/apis/getSubCategory";

const SubCategory = async ({ params }: { params: { id: string } }) => {
  const data = await getSubCategories(params.id);

  return (
    <section className="px-5 mt-[450px] md:px-0 md:mt-28 w-full md:w-[90%] mx-auto">
      <h2 className="text-3xl font-extrabold text-center mb-10 text-green-600">
        Subcategories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {data.map((sub) => (
          <Card
            key={sub._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
        

            <CardContent className="text-center py-4 px-2">
              <p className="font-semibold text-lg text-green-700">{sub.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default SubCategory;
