import { rupiahFormat } from "@/lib/utils";
import { TProduct } from "@/types";
import Link from "next/link";
import React from "react";

interface CardProductProps {
  item: TProduct;
}

export default function CardProduct({ item }: CardProductProps) {
  return (
    <Link href={`/detail-product/${item.id}`} className="product-card">
      <div className="bg-white flex flex-col gap-[24px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full">
        <div className="w-full h-[90px] flex shrink-0 items-center justify-center overflow-hidden">
          <img
            src={item.image_url}
            className="w-full h-full object-contain"
            alt="thumbnail"
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-col gap-1">
            <p className="font-semibold leading-[22px]">{item.name}</p>
            <p className="text-sm text-[#616369]">{item.category_name}</p>
          </div>
          <p className="font-semibold text-[#0D5CD7] leading-[22px]">
            {rupiahFormat(Number(item.price))}
          </p>
        </div>
      </div>
    </Link>
  );
}
