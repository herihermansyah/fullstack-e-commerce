import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {getCategory} from "../action/getCategory.action";

export async function CategoryList() {
  const category = await getCategory();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Category List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {category.map((item, index) => (
            <Card key={item.id}>
              <div className="flex flex-col gap-2 px-5">
                <span>No: {index + 1}</span>
                <span>Name : {item.name}</span>
                <span>Slug : {item.slug}</span>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
