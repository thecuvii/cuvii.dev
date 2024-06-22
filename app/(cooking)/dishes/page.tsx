import { clsxm } from "@zolplay/utils";
import { allDishes } from "~/.contentlayer/generated";
import { MDXRenderer } from "~/components/mdx-renderer";

export default function DishesPage() {
  const dishes = allDishes.filter((d) => d.published === true);

  return (
    <main className="mx-auto">
      <section>
        <ul className="grid grid-cols-4 gap-4  md:w-[960px] mx-auto">
          {dishes.map((dish) => (
            <li
              key={dish._id}
              className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs"
            >
              <header className="-mt-8 -ml-8">
                <h2 className="text-sm text-white bg-black shadow-lg px-4 py-2 rounded-lg inline-block">
                  {dish.name}
                </h2>
              </header>
              <div
                className={clsxm(
                  "mt-2",
                  "prose prose-slate prose-sm",
                  "prose-h3:text-sm prose-p:text-xs"
                )}
              >
                <MDXRenderer code={dish.body.code} />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
